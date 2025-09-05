const express=require('express');
const router=express.Router();
const personModel=require('../models/person')
 
router.post('/',async (req, res) => {
    try{
    const data = req.body

    // const newPerson=new personModel();
    // newPerson.name=data.name;
    // newPerson.age=data.age;=
    // newPerson.work=data.work;

    const newPerson = new personModel(data);
    const savedPerson=await newPerson.save();
    console.log(savedPerson);
    res.status(200).json(savedPerson);


    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }

})

router.get('/',async (req,res)=>{
 try{
    const data=await personModel.find();
    console.log(data);
    res.status(200).json(data);
 }  
 catch(err){
    console.log('some error occured in saving data');
    res.status(500).json(err);
 } 
})

router.get('/:worktype', async(req,res)=>{
    try{
        let workType=req.params.worktype;
        if(workType=='chef'|| workType=='manager' || workType=='waiter'){
            let data=await personModel.find({work:workType});
            console.log(data);
            res.status(200).json(data);
        }
        else{
            res.status(400).json({error:'invalid erro'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;

        const updatedData=req.body;

        const result=await personModel.findByIdAndUpdate(personId,updatedData,{
            new:true,
            runValidators:true
        })
        //if id is not valid
        if(!result){
            return res.status(404).json({erro:"person not found"});
        }

        console.log('data updated');
        res.status(200).json(result);

    }

    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;

       const result= await personModel.findByIdAndDelete(personId);
       if(!result){
        return res.status(404).json({erro:"person not found"})
       }
       console.log('data deleted');
       res.status(200).json({message:'person deleted success'})

    }

    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports=router;