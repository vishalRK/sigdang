import mongoose, { Schema } from 'mongoose';
import { Cart } from '../../models/cart/cart.model';
import { User } from '../../models/user/user.model';
import { Product } from '../../models/product/product.model';

const setCart = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(500).json({ message: 'user not found' });
  }

  let cart = await Cart.findOne({ user_id: user._id });

  if (!cart) {
    cart = await Cart.create({
      user_id: user._id,
      items: [{ product_id: productId }],
    });
    return res.status(201).json({ message: 'Item add in cart Successfully' });
  } else {
    const product = await Product.findById(productId);
    if(!product){
      return res.status(500).json({message:"product is not found in product database please add valid product"})
    }
    const cartproduct = cart.items.find(
      (item) => item.product_id.toString() === productId
    );

    if (!cartproduct) {
      cart.items.push({ product_id: productId });
      await cart.save();
      return res.status(201).json({ message: 'Item add in cart Successfully' });
    } else {
      return res
        .status(201)
        .json({ message: 'This item already added in cart' });
    }
  }

  // return res.status(201).json(user);
};
const getCart = async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(500).json({ message: 'user not found' });
  }

  const cart = await Cart.findOne({user_id:user});

  if(!cart){
    return res.status(500).json({message:"please add some product"})
  }

  return res.status(200).json({message:"cart fetch successfully",cart:cart});

}

const incrementQuantity = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(500).json({ message: 'user not found' });
  }
  let crt = await Cart.findOne({ user_id: user._id });
  console.log(crt);
  if (!crt) {
    crt = await Cart.create({
      user_id: user._id,
      items: [{ product_id: productId }],
    });
    if(crt.user_id.toString() === user._id.toString()) 
    {

      return res.status(201).json({ message: 'Item add in cart Successfully' });
    }
  }
  

  const product = await crt.items.find(
    (item) => item.product_id.toString() === productId
  );
  if (!product) {
    await crt.items.push({ product_id: productId });
    crt.save();
    return res.status(500).json({ message: 'product is added in cart successfully' ,updatedCart:crt});
  } else {
    const cart = await Cart.updateOne(
      {
        user_id: new mongoose.Types.ObjectId(req.params.userId),
        'items.product_id': new mongoose.Types.ObjectId(productId),
      },
      {
        $inc: { 'items.$.quantity': 1 },
      }
    );
   
    if (!cart) {
      return res.status(500).json({ message: 'cart not found' });
    }
  }
  const updatedCart = await Cart.findOne({user_id: user._id});

  return res.status(201).json({ message: 'quantity is update',updatedCart:updatedCart });
};
const decrementQuantity = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(500).json({ message: 'user not found' });
  }
  const crt = await Cart.findOne({ user_id: user._id });

  const product = await crt.items.find(
    (item) => item.product_id.toString() === productId
  );
  if (!product) {
    return res.status(500).json({ message: 'product is not found' });
  } else {
    if(product.quantity >= 2)
    {

    
    const cart = await Cart.updateOne(
      {
        user_id: new mongoose.Types.ObjectId(req.params.userId),
        'items.product_id': new mongoose.Types.ObjectId(productId),
      },
      {
        $inc: { 'items.$.quantity': -1 },
      }
    );
    if (!cart) {
      return res.status(500).json({ message: 'cart not found' });
    }
    const updatedCart = await Cart.findOne({user_id:user});
    if(!updatedCart)
    {
      return res.status(500).json({ message: 'cart not found' });
    }
    return res.status(201).json({ message: 'quantity is update',updatedCart:updatedCart});
  }
  else if(product.quantity == 1)
  {
    const product = await crt.items.filter(item => item.product_id.toString() !== productId);
    return res.status(201).json({ message: 'quantity is update',updatedCart:product});

  }
}
};
const deleteCartItem = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(500).json({ message: 'user not founnd' });
  }

  const cart = await Cart.findOne({ user_id: user._id });

  if (!cart) {
    return res.status(500).json({ message: 'carts not found' });
  }
  const product = cart.items.find(item => item.product_id.toString() === productId);
  if(!product)
  {
    return res.status(500).json({message:"product not found"});
  }
  await Cart.updateOne(
    {
      user_id: new mongoose.Types.ObjectId(user._id),
    },
    {
      $pull: {
        items: { product_id: new mongoose.Types.ObjectId(productId) },
      },
    }

  )
  return res.status(201).json({message:"item remove from cart suceessfully"});
  ;


};
export { setCart, incrementQuantity, decrementQuantity, deleteCartItem,getCart };
