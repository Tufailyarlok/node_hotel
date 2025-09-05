const express = require('express');
const app = express();
const db = require('./db');

require('dotenv').config();

const menuModel=require('./models/menu')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT=process.env.PORT || 3000;


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


app.get('/menu', async(req,res)=>{
    try{
        let data=menuModel.find();
        console.log(data);
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


app.listen(PORT);  