const express = require('express');
const router = express.Router();
const personModel = require('../models/person')

const {hellojwt,generateToken}=require('../jwt')


const passport = require('../auth');
router.use(passport.initialize());
const hello = passport.authenticate('local', { session: false });


//login route
router.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;

        const user=await personModel.findOne({username:username});
        if(!user || !(await user.comparePassword(password)))
            return res.status(401).json({erro:"invlaued username or password"});

        //generate token
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);

        //return token as response
        res.json({token});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server"});

    }
})

//profile route
router.get('/profile',hellojwt, async (req,res)=>{
    try{
        const userData=req.userPayloadd;
        console.log("user Data",userData)

        const userId=userData.id;
        const user=await personModel.findById(userId);
        res.status(200).json({user});
        console.log({user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"internal server error"});
    }
})


router.get('/', (req, res, next) => {
    req.body = {};
    req.body.username = req.query.username;
    req.body.password = req.query.password;
    next();
}, hello, async (req, res) => {
    let USER=req.query.username;
    try {
        const data = await personModel.find({username: USER});
        console.log(data);
        res.status(200).json(data);
    }
    catch (err) {
        console.log('some error occured in saving data');
        res.status(500).json(err);
        }
})

router.get('/:worktype', async (req, res) => {
    try {
        let workType = req.params.worktype;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            let data = await personModel.find({ work: workType });
            console.log(data);
            res.status(200).json(data);
        }
        else {
            res.status(400).json({ error: 'invalid erro' })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/signup', async (req, res) => {
    try {
        const data = req.body

        // const newPerson=new personModel();
        // newPerson.name=data.name;
        // newPerson.age=data.age;
        // newPerson.work=data.work;

        const newPerson = new personModel(data);
        const savedPerson = await newPerson.save();
        console.log(savedPerson);

        const payload={
            id:savedPerson.id,
            username:savedPerson.username
        }

        const token=generateToken(payload);
        console.log("token is :" , token);

        res.status(200).json({response:savedPerson, token:token});


    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})


router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const updatedData = req.body;

        const result = await personModel.findByIdAndUpdate(personId, updatedData, {
            new: true,
            runValidators: true
        })
        //if id is not valid
        if (!result) {
            return res.status(404).json({ erro: "person not found" });
        }

        console.log('data updated');
        res.status(200).json(result);

    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const result = await personModel.findByIdAndDelete(personId);
        if (!result) {
            return res.status(404).json({ erro: "person not found" })
        }
        console.log('data deleted');
        res.status(200).json({ message: 'person deleted success' })

    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;