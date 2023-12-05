import {Router} from 'express';
import { lgoinUser, registerUser } from '../../controller/user/user.controller';

const router = Router();

console.log("router");
router.route('/register').post(registerUser);
router.route('/login').post(lgoinUser);



export default router;