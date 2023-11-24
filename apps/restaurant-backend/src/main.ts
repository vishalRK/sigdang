import express from 'express';
import mongoose from 'mongoose';
// import bodyparser from 'body-parser';
import userRouter from './routes/auth/user.route';
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use('/api/v1/user', userRouter);

mongoose.connect(`mongodb+srv://vishal:${process.env.MONGO_DB_PASS}@cluster0.y1iwedf.mongodb.net/?retryWrites=true&w=majority`,{
    dbName:"restaurant"
}).then(() => {
    console.log("Database Connected");
})
app.listen('3000',() => {
    console.log('server is listining');
});



