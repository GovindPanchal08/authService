const passport = require("passport");
const userModel = require("../models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await userModel.findOne({ googleId: profile.id });
        if (!user) {
          user = await userModel.findOne({ email });
          if (user) {
            user.googleId = profile.id;
            user.provider = "google";
            user.avatar = profile.photos[0].value;
            await user.save();
          } else {
            user = await userModel.create({
              googleId: profile.id,
              provider: "google",
              email,
              username: profile.displayName.split(" ")[0].toLowerCase(),
              avatar: profile.photos[0].value,
              isVerified: true,
            });
          }
        }
        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
