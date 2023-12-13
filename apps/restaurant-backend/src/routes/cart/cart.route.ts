import {Router} from 'express';
import { decrementQuantity, setCart, incrementQuantity, deleteCartItem ,getCart} from '../../controller/cart/cart.controller';


const router = Router();


router.route('/setCart/:userId').post(setCart);
router.route('/getCart/:userId').get(getCart);
router.route('/incrementQuantity/:userId').post(incrementQuantity);
router.route('/decrementQuantity/:userId').post(decrementQuantity);
router.route('/deleteCartItem/:userId').post(deleteCartItem);


export default router;