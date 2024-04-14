const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstname:{
    type: String,
    required: [true, "first name is required"],
  },
  lastname:{
    type:String,
    required:[true,'last name is required']
  },
  email:{
    type: String,
    required: [true, "email is required"],
    validator:[validator.isEmail,"proper email is required"]
  },
  phone:{
    type: Number,
    required: [true, "phone no is required"],
    minLength:[10,"minLength of phone is 10"],
    maxLength:[10,"phone must be 10 digit"],
  },
  idProof:{
    type:Number,
    required:true,
    unique:true
  },
  gender:{
    type:String,
    enum:['Male','Female'],
    required:true,
  },
  dob:{
    type:String,
    required:true
  },
  password:{
    type: String,
    required: true,
  },
  degree:{
    type:String,
  },
  specialist:{
    type:String,
  },
  doctordepartment:{
      type:String,
  },
  role:{
    type:String,
    enum:['admin','patient','doctor']
  },
},{timestamps:true});

module.exports = mongoose.model("user", userSchema);