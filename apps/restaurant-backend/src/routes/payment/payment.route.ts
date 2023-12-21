import {Router} from 'express';
import { paymentCheckout } from '../../controller/payment/payment.controller';


const router = Router();


router.route('/create-checkout-session/:userId').post(paymentCheckout);


export default router;