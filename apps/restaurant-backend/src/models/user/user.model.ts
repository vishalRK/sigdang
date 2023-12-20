import mongoose,{ Schema } from "mongoose";


const userSchema = new Schema({
    avtar:{
        type:String,
        default:"https://shorturl.at/axX09"
    },
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    address: {
          pinCode: { type: String },
          street: { type: String },
          country: { type: String },
          city: { type: String },
          state: { type: String },
          contact:{ type: String },
        }
      

},{timestamps:true})

export const User = mongoose.model(
    'users',
    userSchema
  );