const express = require("express");
const app = express();

// make cors to handle global request
const cors = require("cors");
app.use(cors());
app.use(express.json())

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
app.use("/test123", (req, res) => {
  res.send("Hello world!");
});

const countryRoutes = require('./routes/country-routes'); // Import products routes
const stateRoutes = require('./routes/state-routes'); // Import products routes
const cityRoutes = require('./routes/city-routes'); // Import products routes
app.use("/api/v2/country", countryRoutes);
app.use("/api/v2/state", stateRoutes);
app.use("/api/v2/city", cityRoutes);

// it's for ErrorHandling
const ErrorHandler = require("./middleware/error");
app.use(ErrorHandler);

// Export the app
module.exports = app;
