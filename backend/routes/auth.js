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
  clientID: "", // Add your clientID
  clientSecret: "", // Add the secret here
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile, accessToken );
}))

// Google Oauth2
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google Oauth2 callback url
router.get('/callback', passport.authenticate('google'), (req, res, next) => {
  res.redirect("msrm42app://msrm42app.io?id=" + req.user.id);
});
module.exports = router;