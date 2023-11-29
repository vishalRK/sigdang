import { User } from "../../models/user/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//Register Section
const registerUser = async(req,res) => {
    const {userName,email,password} = req.body;

    const user = await User.findOne({email:email});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    if(!user){

        await User.create({
            userName:userName,
            email:email,
            password:hashPassword
        })
    }
    else{
        return res.status(201).json("user is already Exist");
    }
 

return res.status(201).json("user register successfully");
}


//Login section
const lgoinUser = async(req,res) => {
    const {email,password} = req.body;
    
    const user = await User.findOne({email:email});

    if(!user){
        return res.status(401).json({message:"user not Found"});
    }
    const isPassword = await bcrypt.compare(password, user.password);
   console.log(isPassword);
    if(isPassword)
    {
        const usertokem = await jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data:{
                username:user.userName,
                email:user.email,
                password:user.password,
                avtar:user.avtar
            }
          }, process.env.JSON_WEB_TOKEN_SECRETE); 
         
        res.cookie("userid",usertokem,{
            httpOnly: true,
            secure: true,
             sameSite: 'none'
        });
        return res.status(201).json({message:"Login successfull"});
    }
    else{
        return res.status(401).json("login failed please check email and password")
    }
    


}

export {registerUser,lgoinUser};