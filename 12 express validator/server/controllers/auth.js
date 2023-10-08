exports.signup = (req, res) => {
  console.log("REQ BODY ON SIGNUP", req.body); //MC: This line added in 12 express validator chapter
  res.json({
    data: "you hit signup endpoint yay from controllers",
  });
};
