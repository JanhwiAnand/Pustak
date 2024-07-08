//here, in this module, the different users will come and will login
//we create schemas for the user, go to mongoose->read the docs->schemas->copy code->update the code for your user
const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  // Name: String, // String is shorthand for {type: String}
  name: {
    type: String,
    // required:true
  },
  email: {
    type: "String",
    required: true,
    unique: "true",
    // the field which u want to be unique
  },
  password: {
    type: "String",
    required: true,
  },
  date: {
    type: "Date",
    // required:true
    default: Date.now
  },
});
module.exports = mongoose.model("user", UserSchema); //mongoose.model method takes the name of the model as the 1st arg and the schema name as the 2nd arg
//This Schema will be used in out routes
