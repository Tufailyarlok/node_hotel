const mongoose=require('mongoose');

const menuItem=new mongoose.Schema({
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
        required:true,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    }
})


const menuModel=new mongoose.model('MenuItem',menuItem);
module.exports=menuModel;