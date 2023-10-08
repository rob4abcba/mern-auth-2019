const { validationResult } = require("express-validator"); //MC: 12 express validator is FIRST folder where express-validator is used

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg, //MC: Grab 1st error message in error array
    });
  }
  next(); //MC: next() function is a function in the Express router that, when invoked, executes the next middleware in the middleware stack. If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging
};
