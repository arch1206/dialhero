const path = require("path");
const mongoose = require("./src/db/connection");
const express = require("express");
const app = express();
const { port } = require("./environment");
const router = require("./src/routes/router")(app);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
