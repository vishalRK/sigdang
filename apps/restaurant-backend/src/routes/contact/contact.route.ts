import {Router} from 'express';
import { sendEmailToAdmin } from '../../controller/contact/contact.controller';

const router = Router();


router.route('/sendemail').post(sendEmailToAdmin);


export default router;