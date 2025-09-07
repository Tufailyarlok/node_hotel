const mongoose =require('mongoose');
const bcrypt=require('bcrypt')

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','manager','waiter'],
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String
    }

});

personSchema.pre('save',async function(next){
    const person=this;

    //Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try{
        const salt= await bcrypt.genSalt(10);

        //hash password
        const hashedPassword= await bcrypt.hash(person.password,salt);
        person.password=hashedPassword;


        next();
    }
    catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword=async function(candidatepassword){
    try{
        const isMatch=await bcrypt.compare(candidatepassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

const personModel=mongoose.model('person',personSchema);
module.exports=personModel;
//some changes to track git and github