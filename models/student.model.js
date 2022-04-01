const mongoose = require('mongoose');  // Required

//This is the schema <=> equivalent at entity with JPA
var studentSchema= mongoose.Schema({
    studentId: Number,
    firstName: String,
    lastName: String,
    age: Number,
    dob: String,
    department: String
  });
  
  // This is the model <=> equivalent at instance of the schema
  var studentModel = mongoose.model("Student", studentSchema);
  
module.exports = studentModel;