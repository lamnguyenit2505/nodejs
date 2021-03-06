const express = require('express');
const router = express.Router();
const userModel = require("./model");
router.get('/fake', (req, res) => {
  var newStudent = new userModel(
  {
    StudentId:101, 
    Name:"Lam Nguyen", Roll:1, Birthday:1997-10-03
  });

    newStudent.save(function(err, data) {
        if(err) {
          console.log(error);
        }
        else {
          res.redirect('/user')
        }
    });
})
router.get('/', (req, res) => {
  res.render('user')
})
router.get('/getUser', (req, res) => {
  userModel.find(
    function(err, data) {
        if(err){
          console.log(err);
        }
        else{
          return res.json(
            {
              data: data
            }
          )
        }
    });  
})

router.get('/edit/:id', (req, res) => {
  userModel.findOne({_id: req.params.id},
    function(err, data) {
        if(err){
          console.log(err);
        }
        else{
          res.send(data)
        }
    });  
})

router.post('/edit', async(req, res) => {
  var newStudent = new userModel();
  newStudent.Name = req.body.name;
  newStudent.Roll = req.body.roll;
  newStudent.Birthday = "01-01-97";
  if(!req.body.id) {
    await newStudent.save(function(err, data){
      if(err){
        console.log(err);
      }
      else{
        return res.json(
          {
            data: data
          }
        )
      }
   });
  } else {
    await userModel.findByIdAndUpdate(
      req.body.id, 
      {Name:req.body.name, Roll: req.body.roll},
      {useFindAndModify: false},
       function(err, data) {
          if(err){
            console.log(err);
          }
          else{
            console.log(data)
            return res.json(
              {
                data: data
              }
            ) 
          }
      });  
  }  
})

router.get('/delete/:id', (req, res) => {
  userModel.findByIdAndDelete((req.params.id), 
  function(err, data) {
    if(err){
      console.log(err);
    }
    else{
      return res.json(
        {
          data: data
        }
      ) 
    }
  });  
})
module.exports = router