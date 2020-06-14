require("dotenv").config();

module.exports = {
  uri: process.env.CONNECTION_STRING,
  port: process.env.PORT,
};
