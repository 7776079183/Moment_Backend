import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    full_name: {
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
    
},{ timestamps: true })

const User = mongoose.model('user',userSchema);

export = User;