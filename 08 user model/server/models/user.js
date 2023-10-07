const mongoose = require("mongoose"); //MC: 08 user model is FIRST version of server/models/user.js
const crypto = require("crypto"); //MC: crypto is a core module.  No need to npm install it.
// user schema
const userScheama = new mongoose.Schema( //MG: Intentionally misspelled Schema in variable name userScheama to allow different string for universal search
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      //MC: Saved hashed password not the original password provided by user
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "subscriber",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true } //MC: Willl automatically create "Created at ..." timestamps fields
);

// virtual
userScheama
  .virtual("password")
  .set(function (password) {
    //MC: Use old school regular function not arrow function bec want regular use of 'this' keyword
    this._password = password; //MC: Underscore denotes to programmes that _password is a temp variable to only be used in this function
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userScheama.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; //MC: plainText is the newly entered password. hashed_password is the hashed version of password the user originally created.
  },

  encryptPassword: function (password) {
    //MC: Again use regular old school function, not arrow function
    if (!password) return "";
    try {
      return crypto //MC: See Node.js Crypto Documentation
        .createHmac("sha1", this.salt) //MC: Change sha256 to sha1 to match Ud earlier vid
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userScheama);
