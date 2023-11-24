import express from 'express';
import mongoose from 'mongoose';

const app = express();


mongoose.connect(`mongodb+srv://vishal:${process.env.MONGO_DB_PASS}@cluster0.y1iwedf.mongodb.net/?retryWrites=true&w=majority`,{
    dbName:"restaurant"
}).then(() => {
    console.log("Database Connected");
})
app.listen('3000',() => {
    console.log('server is listining');
});



