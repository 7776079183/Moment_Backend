import mongoose  from "mongoose";
const userSchema = new mongoose.Schema({
    image_url: {
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true,
    },
    tags:{
        type:[String],
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }
    
},{ timestamps: true })

const Moment = mongoose.model('moment',userSchema);

export = Moment;