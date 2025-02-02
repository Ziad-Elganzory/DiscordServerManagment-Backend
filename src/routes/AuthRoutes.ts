import express from 'express';
import passport from 'passport';

const router = express.Router();

// Route to start the Discord OAuth2 flow
router.get('/discord', passport.authenticate('discord'));

// Callback route where authentication happens
router.get(
  '/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user;
    if (user) {
      res.json({ message: 'Authentication successful', user });
    } else {
      res.status(400).send('User authentication failed');
    }
  }
);

export default router;
