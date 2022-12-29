const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

//Jwt constructor
const JwtStrategy = require("passport-jwt").Strategy;

//this is an object that will provide us with helper methods
const ExtractJwt = require("passport-jwt").ExtractJwt;

//json web token node module. we use this to create, sign & verify tokens
const jwt = require("jsonwebtoken");

const config = require("./config.js");

exports.local = passport.use(new LocalStrategy(User.authenticate())); //from mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//user is an object that will contain an id for a user document
exports.getToken = (user) => {
  return jwt.sign(user, config.secretKey, { expiresIn: 86400 });
};

//configure json web token strategy for passport
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  /* (jwt_payload, done) is the verify function */
  /* done is a passport, error first callback
  accepting arguments error, user and info */
  /* passport uses the done callback to access the
  user document so it can load info from it to the
  req object*/
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin) {
    return next();
  }
  err = new Error("You are not authorized to perform this operation!");
  err.status = 403;
  return next(err);
};
