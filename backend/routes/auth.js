const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile, accessToken );
}))

// Google Oauth2
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google Oauth2 callback url
router.get('/google/callback', passport.authenticate('google'), (req, res, next) => {
  res.redirect("http://localhost:3000/users?id=" + req.user.id);
});
module.exports = router;