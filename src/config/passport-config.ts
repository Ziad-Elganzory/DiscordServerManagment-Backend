import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!, 
      callbackURL: process.env.REDIRECT_URI!, 
      scope: ["identify", "email"]
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Discord User Profile:", profile);
      return done(null, { profile, accessToken , refreshToken }); 
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj as any));
