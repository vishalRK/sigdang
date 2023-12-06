import {Router} from 'express';
import { getProduct, setProduct } from '../../controller/product/product.controller';


const router = Router();


router.route('/getproduct').get(getProduct);
router.route('/setproduct').post(setProduct);


export default router;