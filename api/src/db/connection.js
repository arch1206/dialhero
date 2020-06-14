const mongoose = require("mongoose");
const { uri } = require("../../environment");
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => console.log("connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
