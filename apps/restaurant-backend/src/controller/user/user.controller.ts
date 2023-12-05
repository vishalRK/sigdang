import { User } from '../../models/user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
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
    });
  } else {
    return res.status(201).json({message:'user is already Exist'});
  }

  return res.status(201).json({message:'user register successfully'});
};

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
          username: user.userName,
          email: user.email,
          password: user.password,
          avtar: user.avtar,
        },
      },
      process.env.JSON_WEB_TOKEN_SECRETE
    );

    
    return res
      .status(201)
      .cookie("user",usertokem)
      .json({ message: 'Login successfull', userToken: usertokem });
  } else {
    return res.status(401).json('login failed please check email and password');
  }
};


export { registerUser, lgoinUser };
