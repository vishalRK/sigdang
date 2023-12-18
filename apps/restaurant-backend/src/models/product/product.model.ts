import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    image:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    tags:[{
        country:{
            type:String,
            require:true
        },
        dishtype:{
            type:String,
            require:true
        },
        category:{
            type:String,
            require:true
        }}
    ]
},{timestamps:true})
export const Product = mongoose.model('Product',productSchema); 