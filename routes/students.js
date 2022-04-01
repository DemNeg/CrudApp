var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const studentModel = require('../models/student.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Students route work');
});

/* POST student data. */
router.post('/add', function(req, res, next) {

  let newStudent = new studentModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    dob: req.body.dob,
    department: req.body.department
  });
  newStudent.save((err,newStudent)=>{
    if(err) {
      res.send(err);
    }else{
      res.send({status:200, message:'Student added successfully!',studentObj:newStudent});
    }
  })
});

// GET students listing
router.get('/list',(req, res,next)=>{
  studentModel.find((err,result)=>{
    if(err) {
      res.send(err);
    }else{
      res.send({status:200,resultFound:result.length, students:result})
    }
  });
});

// GET student that match a particular condition
router.get('/searchByFirstname',(req, res, next)=>{

  const firstNameQuery =req.query.firstName;

  studentModel.find({firstName:firstNameQuery},(err,result)=>{
    if(err) {
      res.send(err);
    }else{
      res.send({status:200,resultFound:result.length, students:result});
    }
  })
});

//GET student by _id
router.get('/studentBy_id',(req, res,next)=>{

  const studentIdQuery =req.query.id;

  studentModel.findById({"_id":studentIdQuery},(err,result)=>{
    if(err) {
      res.send(err);
    }else{
      res.send({status:200, students:result});
    }
  });
});

//UPDATE student department
router.put('/update',(req, res,next)=>{
  
  const department = req.query.department;

  studentModel.update({firstName:'Aminata'},{department:department},(err,result)=>{
    if(err) {
      res.send(err)
    }else{
      res.send({status:200, students:result});
    }
  });
});

//UPDATE student by _id
router.put('/update_Id',(req, res,next)=>{
  
  const id = req.query.userId;
  const fName = req.query.firstName;

  studentModel.findByIdAndUpdate({_id:id},{firstName:fName},(err,result)=>{
    if(err) {
      res.send(err)
    }else{
      res.send({status:200, students:result});
    }
  });
});

//UPDATE student document that match a particular condition
router.put('/updateFirst',(req, res,next)=>{
  
  const lastNameQuery = req.query.lastName;
  const ageQuery= req.query.age;

  studentModel.findOneAndUpdate({lastName:lastNameQuery},{age:ageQuery},(err,result)=>{
    if(err) {
      res.send(err)
    }else{
      res.send({status:200, students:result});
    }
  });
});

//DELETE student document by _id
router.delete('/deleteStudent',(req, res,next)=>{
  
  const userId= req.query.id;

  studentModel.findByIdAndDelete({_id:userId},(err,result)=>{
    if(err) {
      res.send(err)
    }else{
      res.send({status:200, students:result});
    }
  });
});

module.exports = router;
