const express = require('express');
const app = express();
const db = require('./db');

const menuModel=require('./models/menu')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);




app.post('/menu', async (req,res)=>{
    try{
        let data=req.body;
        let savedData=await menuModel.insertMany(data);
        console.log(savedData);
        res.status(200).json(savedData);
    }
    catch(err){
        console.log("some error occured",err);
        res.status(400).json(err);
    }
})




app.listen(3000);  