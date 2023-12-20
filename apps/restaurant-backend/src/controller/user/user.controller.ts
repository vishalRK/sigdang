import { User } from '../../models/user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { Cart } from '../../models/cart/cart.model';
//Register Section
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  const user = await User.findOne({ email: email });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  if (!user) {
    await User.create({
      userName: userName,
      email: email,
      password: hashPassword,
      address: {
        pinCode: '',
        street: '',
        country:'',
        city: '',
        contact:'',
        state: '',
      },
    });
  } else {
    return res.status(201).json({message:'user is already Exist'});
  }

  return res.status(201).json({message:'user register successfully'});
};

//update profile

const upDateProfileData = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if(user?.userName.toString() === req.body.username && user?.email.toString() === req.body.email)
  {
    // res.status(401).json({message:"username and email is already exist"})
    console.log(req.body);
    if(req.body)
    {
      user.address.pinCode = req.body.pinCode;
      user.address.city = req.body.city;
      user.address.street = req.body.street;
      user.address.state = req.body.state;
      user.address.country = req.body.country;
      user.address.contact = req.body.contact;
      await user.save();
      console.log(user);
      console.log("HI");
      return res.status(201).json({message:"address and contact is updated successfully",username:user.userName,email:user.email,avtar:user.avtar,userId:user._id,data:user?.address});
    }
  }
  
  else
  {
    user.userName = req.body.username || "";
    user.email = req.body.email || "";
    user.address.pinCode = req.body.pinCode || "";
    user.address.city = req.body.city || "";
    user.address.street = req.body.street || "";
    user.address.state = req.body.state || "";
    user.address.country = req.body.country || "";
    user.address.contact = req.body.contact || "";
    await user.save();
    const userOne  = await User.findById(req.params.userId);
    return res.status(201).json({message:"address and contact is updated successfully",username:user.userName,email:user.email,data:userOne.address});
    }
    
  

}


//Login section
const lgoinUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({ message: 'user not Found' });
  }
  const isPassword = await bcrypt.compare(password, user.password);
  console.log(isPassword);
  if (isPassword) {
    const usertokem = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          userId:user._id,
          username: user.userName,
          email: user.email,
          password: user.password,
          avtar: user.avtar,
          address:user.address  
        },
      },
      process.env.JSON_WEB_TOKEN_SECRETE
    );

    // const cart = await Cart.aggregate([
    //   {
    //     $match: { user_id: user._id}
    //   },
    //   {
    //     $unwind: "$items"
    //   },
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "items.product_id",
    //       foreignField: "_id",
    //       as: "items.product"
    //     }
    //   },
    //   {
    //     $unwind: "$items.product"
    //   },
    //   {
    //     $project: {
    //       "user_id": 1,
    //       "product_id": "$items.product._id",
    //       "product_name": "$items.product.title",
    //       "product_image": "$items.product.image",
    //       "product_price": "$items.product.price",
    //       "quantity": "$items.quantity"
    //       // Add more fields as needed
    //     }
    //   }
    // ]).exec();
    const cart = await Cart.findOne({user_id:user._id});
    console.log(cart);
    if(!cart)
    {

      return res
        .status(201)
        .cookie("user",usertokem)
        .json({ message: 'Login successfull', userToken: usertokem });
      }
      else{
      return res
        .status(201)
        .cookie("user",usertokem)
        .json({ message: 'Login successfull', userToken: usertokem ,cart:cart});

    }
  } else {
    return res.status(401).json('login failed please check email and password');
  }
};


export { registerUser, lgoinUser,upDateProfileData };
