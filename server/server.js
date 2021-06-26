/**
 * Created by Shreedhar Acharya
 *
 *
 */

require("dotenv").config();
const express = require("express");
// const jwt = require('jsonwebtoken');
// var token = require('crypto').randomBytes(50).toString('hex');
// // 'e6fb380f0a95ffc1d84d09ceb7a5bb2b1283394e356478268c4ac94db6a15a444254369ee1f57eb348d6a8b95e0b763a9800'

const db = require("./app/db");
var cors = require("cors");
bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const usersRoutes = require("./app/routes/usersRoutes");
const noticesRoutes = require("./app/routes/noticesRoutes")
const publicationsRoutes = require("./app/routes/publicationsRoutes");
const staffsRoutes = require("./app/routes/staffsRoutes");
const eventsRoutes = require("./app/routes/eventsRoutes");

const pressReleaseRoutes = require("./app/routes/pressReleaseRoutes");
const booksRoutes = require("./app/routes/booksRoutes");
const downloadsRoutes = require("./app/routes/downloadsRoutes");
const nirdeshikaKaryabidhiRoutes = require("./app/routes/nirdishikaKaryabidhiRoutes");


app.use("/api/v1", publicationsRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", noticesRoutes);
app.use("/api/v1", staffsRoutes);
app.use("/api/v1", eventsRoutes);
app.use("/api/v1", pressReleaseRoutes);
app.use("/api/v1", booksRoutes);
app.use("/api/v1", downloadsRoutes);
app.use("/api/v1", nirdeshikaKaryabidhiRoutes);



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
