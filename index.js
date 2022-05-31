const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const locationController = require("./controllers/chargers");

const cookieParser = require("cookie-parser");
const userController = require("./controllers/user");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(locationController);

app.use(cookieParser());
app.use(userController);

// create a test router
app.get("/", (req, res) => {
  res.send("hello world!");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
