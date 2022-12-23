const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

//User.authenticate() will verify our username and password against the locally stored info
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//whenever we use sessions with passport we need to do 2 operations on the user: serialization & deserialization
/* when a user has been verified the user data has to be grabbed from the session and added to the req
object. Deserialization is necessary in order for that to be possible*/