import {Router} from 'express';
import { lgoinUser, registerUser, sendEmailToAdmin } from '../../controller/user/user.controller';

const router = Router();

console.log("router");
router.route('/register').post(registerUser);
router.route('/login').post(lgoinUser);
router.route('/sendemail').post(sendEmailToAdmin);


export default router;