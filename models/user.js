const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
//passport handles adding username and password to the document
//passport hashes and salts the password
const userSchema = new Schema({
  firstname: {
    type: String,
    default: ''
  },

  facebookId: String,
  
  lastname: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: true,
  },
  
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
