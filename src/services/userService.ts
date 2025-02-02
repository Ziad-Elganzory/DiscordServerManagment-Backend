import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const findOrCreateUser = async (profile: any) => {
  const userRepo = AppDataSource.getRepository(User);
  let user = await userRepo.findOne({ where: { discordId: profile.id } });

  if (user) {
    const hasChanges =
      user.username !== profile.username ||
      user.globalName !== profile.global_name ||
      user.avatar !== profile.avatar ||
      user.banner !== profile.banner ||
      user.email !== profile.email ||
      user.verified !== profile.verified;

    if (hasChanges) {
      user.username = profile.username;
      user.globalName = profile.global_name;
      user.avatar = profile.avatar;
      user.banner = profile.banner;
      user.email = profile.email || "";
      user.verified = profile.verified;

      await userRepo.save(user);
    }
    return user;
  } else {
    user = userRepo.create({
      discordId: profile.id,
      username: profile.username,
      globalName: profile.global_name,
      avatar: profile.avatar ?? undefined,
      banner: profile.banner ?? undefined,
      email: profile.email,
      verified: profile.verified,
    });

    await userRepo.save(user);
    return user;
  }
};

export const UserToken = async (profile: any, accessToken: string , refreshToken: String) => {
    const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';
  
    // Create user payload that you want to encode in the token
    const userPayload = {
      id: profile.id,
      username: profile.username,
      globalName: profile.global_name,
      avatar: profile.avatar,
      banner: profile.banner,
      email: profile.email,
      verified: profile.verified,
    };
  
    // Create access token (with a shorter expiry, e.g., 15 minutes)
    const accessJwt = jwt.sign(userPayload, jwtSecret, { expiresIn: '15m' });
  
    // Create refresh token (with a longer expiry, e.g., 7 days)
    const refreshJwt = jwt.sign(userPayload, jwtSecret, { expiresIn: '7d' });
  
    return {
      user: userPayload,
      accessToken: accessJwt,
      refreshToken: refreshJwt
    };
};