var Userdb=require('../model/model');

//create and save new user
exports.create=(req,res)=>{
//validate request

if(!req.body){
    res.status(400).send({message:"Content can nt be empty"});
    return;
}


//new user
const user=new Userdb({
    name:req.body.name,
    number:req.body.number,
    address:req.body.address
    
})

//save user in the database
user
  .save(user)
  .then(data=>{
    res.redirect('/add-user')
  })

  .catch(err=>{
    res.status(500).send({
        message:err.message || "Some error occured while doing a create operation"
    });;
  })
}

//retrieve and return all/ single user

exports.find=(req,res)=>{
if(req.query.id){
const id=req.query.id;
Userdb.findById(id)
.then(data=>{
    if(!data){
        res.status(404).send({message:"not found the specified user"})
    }else{
        res.send(data)
    }
})
.catch(err=>{
    res.status(500).send({message:"Error in retrieval"})
})

}else{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Error occured while retrieveing"})
    })
    } 
}



//updaye a new user by user id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }
  
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: `Cannot update user with id ${id}. User not found.` });
        } else {
          res.json(data);
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message || "Error occurred while updating the user." });
      });
  };
//Delete a user with specified user id in request
exports.delete=(req,res)=>{
const id=req.params.id;

Userdb.findByIdAndDelete(id)
.then(data=>{
    if(!data){
        res.status(404).send({message:`cannot delete ${id}`})
    }else{
        res.send({message:"successful delete"})
    }
})
.catch(err=>{
res.status(500).send({message:"could not delete"});
});
}
