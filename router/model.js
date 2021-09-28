const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var StudentSchema = new mongoose.Schema({
  StudentId:Number,
  Name:String,
  Roll:Number,
  Birthday:Date,
  Address:String
});

module.exports = mongoose.model(
  'student', StudentSchema, 'Students');