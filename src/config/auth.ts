import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import dotenv from "dotenv";
import { AppDataSource } from "./database";
import { User } from "../models/User";
import { findOrCreateUser, UserToken } from "../services/userService";

dotenv.config();

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!, 
      callbackURL: process.env.REDIRECT_URI!, 
      scope: ["identify", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(profile);
        const token = await UserToken(profile, accessToken, refreshToken);
        return done(null, {user, token});
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj as any));