import mongoose,{Schema} from "mongoose";

const contactSchema = new Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phonenumber:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },

},{timestamps:true})
export const Contact = mongoose.model('contact',contactSchema); 