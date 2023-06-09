const mongoose=require('mongoose');

var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    address:String,
    
});
schema.index({ number: 1 }, { unique: true });


const Userdb=mongoose.model('User',schema);

module.exports=Userdb;