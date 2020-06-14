const mongoose = require("../connection");
const Schema = mongoose.Schema;


const heroSchema = new Schema({

  code: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: [String],
    required: true,
  },
},{
  versionKey: false
});

const hero = mongoose.model("hero", heroSchema);
module.exports = hero;
