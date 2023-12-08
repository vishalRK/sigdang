import React, { useEffect } from 'react'
import { useAuth } from '../utils/User'
type Incremnt  ={
    classname:string,
    productId:string
}
const CartIncrementButton = ({classname,productId}:Incremnt) => {
    console.log(productId);
    const {users} = useAuth();
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
            console.log(data);
        }).catch(error => {console.log(error)})
    }
  
    
  return (
      <button key={productId} className={`${classname}`} onClick={() => buttonClick()}>+</button>
  )
}

export default CartIncrementButton;
