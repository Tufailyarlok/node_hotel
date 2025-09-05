const mongoose=require('mongoose');

const menuItem= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    ingredients:{
        type:[String],
        default:[]
    }
})


const menuModel=new mongoose.model('MenuItem',menuItem);
module.exports=menuModel;