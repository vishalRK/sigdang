import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/auth/user.route';
import contactRouter from './routes/contact/contact.route';
import cartRouter from './routes/cart/cart.route';
import productRouter from './routes/product/product.route';
const app = express();
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
  );
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/product', productRouter);

// mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.y1iwedf.mongodb.net/?retryWrites=true&w=majority`,{
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.nl1tgvo.mongodb.net/?retryWrites=true&w=majority`,{
    dbName:"restaurant"
}).then(() => {
    console.log("Database Connected");
})
app.listen('3000',() => {
    console.log('server is listining');
});



