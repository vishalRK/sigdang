import stripe from 'stripe';
import { User } from '../../models/user/user.model';
import { Cart } from '../../models/cart/cart.model';

const newStripe = new stripe(
  'sk_test_51NGgJySE2X0xZxAimZGwVKqBpDXBfMTbZOC9pQbU1QENdV09zKJoCAdqapvj8DEhmCHnJxz7Mo48TzIWc1AwTtUy00ITMC6nK3'
);

const paymentCheckout = async (req, res) => {
  const userId = req.params.userId;
  const { items, totalPrice } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(401).json({ message: 'user not found' });
  }

  const lineItems = items?.items.map((item) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.product_id.title,
        images: [item.product_id.image],
      },
      unit_amount: Math.round(item.product_id.price * 100),
    },
    quantity: item.quantity,
  }));
  const YOUR_DOMAIN = 'http://localhost:4200/';
  const session = await newStripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  
const result = await Cart.updateOne(
    { _id: items._id }, // Assuming you identify the cart by its _id field
    { $set: { items: [] } }
  );

if(result)
{
      res.status(201).json({ id: session.id });
}

  // res.status(201).json({userId:userId,clientSecret: paymentIntent.client_secret});
};

export { paymentCheckout };
