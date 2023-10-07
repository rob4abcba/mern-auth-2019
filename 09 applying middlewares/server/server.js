const express = require("express"); //MC: 09 applying middlewares/server/server.js is FIRST folder with server.js
const morgan = require("morgan"); //MG: Morgan is a Node. js and Express middleware to log HTTP requests and errors. Winston is a logger for just about everything
const cors = require("cors"); //MC: cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts
const bodyParser = require("body-parser"); //MG: Originally, there was only body-parser , not express. json() , which is why many older tutorials recommend installing body-parser . More recently, Express added the . json() function to the core Express package, so there's no longer any need to install and use body-parser directly.Jun 10, 2022
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// import routes
const authRoutes = require("./routes/auth");

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json()); //MG: Parse stringified JSON back to JSON object
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` })); //MC: Allow React app running on port 3000 to connect with our backend at port 8000
}

// middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 8000; //MC: Convention is to write env variable in all CAP letters
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
