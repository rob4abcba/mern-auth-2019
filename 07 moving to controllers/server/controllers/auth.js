exports.signup = (req, res) => {
  res.json({
    data: "you hit signup endpoint yay from controllers", //MC: Moved from server.js to here in servers/controllers/auth.js in 07_moving_to_controllers chapter
  });
};
