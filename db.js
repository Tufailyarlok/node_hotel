const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL="mongodb://localhost:27017/person"
// const mongoURL=process.env.MONGODB_URL;


 


mongoose.connect(mongoURL).then(()=>console.log("connected by tufail"))
.catch((err)=>console.error("conection err",err));

const db=mongoose.connection;

db.on('disconnected',()=>{
    console.log('its disconnected');

})


module.exports=db;

//this is db.js and i test it via github