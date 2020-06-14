module.exports = function (app) {
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const express = require('express');
  const path = require('path');

  // support parsing of application/json type post data
  app.use(bodyParser.json());
  //support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.get(/^((?!api).)*$/, (req, res) => {
    res.sendFile(path.join(__dirname , '../../public/index.html'));
  });
  app.use("/api", require("./collections/hero"));
  app.use("/api", require("./collections/user"));
  app.use("/api", require("./utility/auth"));
  // Catch all
  app.use("*", function (req, res, next) {
    res.status(404).json({ err: "Path" + req.originalUrl + " does not exist" });
  });
};
