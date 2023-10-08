const express = require("express");
const router = express.Router();

// import controller
const { signup } = require("../controllers/auth");

// import validators
const { userSignupValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

router.post("/signup", userSignupValidator, runValidation, signup); //MC: Change router.get to router.post in 12 express validator chapter

module.exports = router;
