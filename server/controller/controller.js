var Userdb = require('../model/model');

// create and save new user

exports.create = (req,res) =>{
  if(!req.body){
    res.status(400).send({message: "Content can not be empty"});
    return;
  }

  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
  })

  //save user in the database

  user
    .save(user)
    .then(data =>{
        //res.send(data)
        res.redirect("/add-user")
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message|| "Some error occured while creating"
        })
    })
}


exports.find = (req,res) =>{

  if(req.query.id){
    const id = req.query.id;

    Userdb.findById(id)
    .then(data =>{
      if(!data){
        res.status(404).send({message:"Not found user with id"+ id})
      }else{
        res.send(data)
      }
    })
    .catch(err =>{
      res.status(500).send({message: "Error retrieving user with id"})
    })

  }else{
   Userdb.find()
   .then(user =>{
    res.send(user)
   })
   .catch(err =>{
    res.status(500).send({message: err.message || "Error occured while finding user information"})
   })
 }

} 

exports.update = (req,res) =>{
  if(!req.body){
    return res
      .status(400)
      .send({message: "Data to update cannot be empty"})
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false} )
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Cannot update the user id with ${id}`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error Update User Information"})
    })
}

exports.delete = (req,res) =>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
      .then(data =>{
      if(!data){  
        res.status(404).send({message: `Cannot Delete with id ${id}`})
      }else{
        res.send({
            message: "User was deleted succesfully"
        })
      } 
    })
    .catch(err =>{
      res.status(500).send({
        message:"Could not delete user"
      });
    });
}