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

const sendEmailToAdmin = async (req, res) => {
  const {first_name,last_name,email,phone_number,message} = req.body;

  console.log("Sedn email from user to Admin");
  if(email)
  {

    const transporter = nodemailer.createTransport({
      host: "https://webmail.techturbine.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user:"vkerlekar@techturbine.com",
        pass:"tech1mini",
      },
    })
    console.log(transporter);
    console.log("Hello");
    const info = await transporter.sendMail({
      from: "Vishal Kerlekar <vkerlekar@techturbine.com>", // sender address
      to: "vishalkerlekar5@gmail.com", // list of receivers
      subject: "Contact", // Subject line
      text: message, // plain text body
      html: "<b>Hello India?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    return res.status(201).json(info);
  }
  return res.status(500).json("please enter email id")
  
  

}
export { registerUser, lgoinUser, sendEmailToAdmin };
