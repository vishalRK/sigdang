import React, { useEffect } from 'react'
import { useAuth } from '../utils/User'
import { RootState } from 'apps/sigdang/redux/store';
import { useDispatch } from 'react-redux';
import { setCart } from 'apps/sigdang/redux/cartSlice';
type Incremnt  ={
    classname:string,
    productId:string,
    text:string
}
const CartIncrementButton = ({classname,productId,text}:Incremnt) => {
    
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
            dispatch(setCart(data?.updatedCart));
        }).catch(error => {console.log(error)})
    }
  
    
  return (
      <button key={productId} className={`${classname}`} onClick={() => buttonClick()}>{text}</button>
  )
}

export default CartIncrementButton;
