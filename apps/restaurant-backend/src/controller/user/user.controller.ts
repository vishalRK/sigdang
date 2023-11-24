import { User } from "../../models/user/user.model";
import bcrypt from 'bcrypt';
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
        return res.redirect('/login');
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if(isPassword)
    {
        return res.status(200).json({
            message:"login successfully",
            data:{
                username:user.userName,
                email:user.email,
                password:user.password,
                avtar:user.avtar
            }
        });
    }
    else{
        return res.status(401).json("login failed please check email and password")
    }
    


}

export {registerUser,lgoinUser};