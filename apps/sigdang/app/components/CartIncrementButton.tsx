import React, { useEffect } from 'react'
import { useAuth } from '../utils/User'
import { RootState } from 'apps/sigdang/redux/store';
import { useDispatch } from 'react-redux';
import { setCart } from 'apps/sigdang/redux/cartSlice';
type Products = {
    _id: string;
    image: string;
    title: string;
    tags: [string];
    price: number;
    rating: number;
    quantity: number;
  };
type Incremnt  ={
    classname:string,
    productId:string,
    text:string,
    products:Products[],
    setProduct: React.Dispatch<React.SetStateAction<Products[]>>;
}
const CartIncrementButton = ({classname,productId,text,setProduct,products}:Incremnt) => {
    
    const {users} = useAuth();
    const dispatch = useDispatch();
    const buttonClick = () => {

        fetch(`http://localhost:3000/api/v1/cart/incrementQuantity/${users.userId}`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                productId:productId
            })
        }).then(response => {
            console.log(response);
            if(!response.ok)
            {
                throw new Error("invalid Error");
            }
            return response.json();
        }).then(data => {
            const updatedProducts = products.map((product: Products) => {
                if(data.cart)
                {
        
                  const cartItem = data.cart.items.find(
                      (item) => item.product_id.toString() === product._id.toString()
                      );
                    
              
                        return {
                          ...product,
                          quantity: cartItem?.quantity ? cartItem?.quantity : 0,
                        };
                      
                      
                    }
                    return product;
                  });
            setProduct(updatedProducts);
            dispatch(setCart(data?.updatedCart));
        }).catch(error => {console.log(error)})
    }
  
    
  return (
      <button key={productId} className={`${classname}`} onClick={() => buttonClick()}>{text}</button>
  )
}

export default CartIncrementButton;
