import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"UserName in required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    blogs:[
    {
        type:mongoose.Types.ObjectId,
        ref:'Blogs',
        
    }]
},{timestamps:true})

export default mongoose.model('Users',userSchema)