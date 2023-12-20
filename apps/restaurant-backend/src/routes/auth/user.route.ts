import {Router} from 'express';
import { lgoinUser, registerUser, upDateProfileData } from '../../controller/user/user.controller';

const router = Router();

console.log("router");
router.route('/register').post(registerUser);
router.route('/login').post(lgoinUser);
router.route('/updateProfile/:userId').post(upDateProfileData);



export default router;