import express, { Request, Response } from "express";
import axios from "axios";
import url from 'url';
import session from "express-session";
import passport from "passport";
import {AppDataSource} from "./config/database";
import authRoutes from './routes/AuthRoutes';
import './config/auth';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Hello, Discord Management App!");
});



AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    });
  })
  .catch(err => console.error("Database connection failed ❌", err));