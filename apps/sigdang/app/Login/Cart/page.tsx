"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/User';
import { useSelector } from 'react-redux';
import { RootState } from 'apps/sigdang/redux/store';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


import Link from 'next/link';
import CartIncrementButton from '../../components/CartIncrementButton';
import CartDecrementButton from '../../components/CartDecrementButton';
import { Session } from 'inspector';

interface Tag {
  country: string;
  _id: string;
}

interface Product {
  _id: string;
  image: string;
  title: string;
  price: number;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CartItem {
  _id: string;
  user_id: string;
  items: {
    _id:string;
    product_id: Product;
    quantity:number;
  }[];
}

interface Address {
  street: string,
  pinCode: string,
  city: string,
  state: string,
  country: string,
  contact: string,
}

const Cart = () => {
  const {users} = useAuth();
  const [carts,setCart] = useState<CartItem>() 
  const [address,setAddress] = useState<Address>()
  const cart = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/cart/getCart/${users.userId}`).then(response => {
      if(!response.ok)
      {
        throw new Error("get Cart server side error");
      }
      return response.json();
    }).then(data => {
      setCart(data.cart);
      const localstorageData = localStorage.getItem('user') ;
      if(localstorageData)
      {

        const address = JSON.parse(localstorageData);
        setAddress(address.address);
      }
    })
    
  },[cart])

  const totalPrice = carts?.items.reduce((total, item) => {
    // Assuming item.product_id.price is a number
    return total + item.product_id.price * item.quantity;
  }, 0) || 0;
  

  const handlePayment = () => {
    const stripePromise = loadStripe("pk_test_51NGgJySE2X0xZxAiZnPhtKgnJzVs4SfT8evGsQSKymhEEF2Wmj9araDFIuiYr9JIrMrkZ991acsUq4kKjOZMH7G900O6bIG7qD");
    fetch(`http://localhost:3000/api/v1/payment/create-checkout-session/${users.userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items:carts, totalPrice: totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        stripePromise.then(s => s?.redirectToCheckout({sessionId:data.id}))
       
      });
  }
 
 

  return (<div className="flex justify-center mt-10">
      {carts?.items.length != 0?
      (<div className="w-[90vw] small:w-[100vw]  shadow-2xl grid large:grid-cols-2 small:grid-rows-1 p-4">
        <div className=" p-2 small:rounded-t-xl large:rounded-tl-xl large:rounded-bl-xl bg-red-400 flex flex-col justify-center">
         {carts?.items.map((item) => (
          <div key={item._id} className="w-[40vw] mt-4 rounded-xl p-5  small:w-[85vw]  grid grid-cols-4  small:h-[100%] h-[40%] bg-yellow-200">
          <div className="p-1  flex justify-center  ">
            <img
              className="object-contain w-44"
              src={item?.product_id?.image}
              alt=""
            />
          </div>
          <div className="p-1 col-span-2">
            <h2 className="font-lobster text-center  text-ellipsis h-16 overflow-hidden text-[2vw] flex-nowrap small:text-[6vw]">
              {item.product_id?.title}
            </h2>
            <div className="flex justify-between p-2">
              <CartIncrementButton classname="w-[30%] shadow-xl" text='+' productId={`${item.product_id._id}`}/>
              <h3 className="w-[20%] text-center">{item?.quantity}</h3>
              <CartDecrementButton classname="w-[30%] shadow-xl" text='-' productId={`${item.product_id._id}`}/>
            </div>
          </div>
          <div className="p-1 flex flex-col justify-between  ">
            <img
              className="object-contain self-end w-10"
              src="/images/gallery/cartClost.png"
              alt=""
            />
            <h2 className="text-right">${item?.product_id?.price}</h2>
          </div>
        </div>
         ))}
          
        </div>
        <div className="grid grid-rows-2 h-[50%] p-4">
          <div className="grid grid-rows-5 h-52 p-4">
            <div className="grid h-10 grid-cols-2">
              <p>Item Total</p>
              <p className="text-right">${totalPrice}</p>
            </div>
            <div className="grid h-10 grid-cols-2">
              <p>Delivery Charge</p>
              <p className="text-right">$10</p>
            </div>
            <div className="grid h-10 grid-cols-2">
              <p>SGST</p>
              <p className="text-right">18%</p>
            </div>
            <div className="grid h-10 grid-cols-2">
              <p>CGST</p>
              <p className="text-right">18%</p>
            </div>
            <div className="grid h-10 grid-cols-2">
              <p className="text-black font-[600]">Grand Total</p>
              <p className="text-right">${totalPrice+(totalPrice*0.36)+10}</p>
            </div>
          </div>
          <div className="grid grid-rows-3 h-56 mt-20 p-4">
            <div className="row-span-2 h-[50%]">
              <div className="h-[100%] flex justify-center">
                <button className="w-[100%] bg-red-300 rounded-xl text-center">
                  Apply Cupon
                </button>
              </div>
              <div className="h-[100%]">
                <input
                  type="text"
                  className="w-[100%] border-b-2 border-b-black outline-none text-left h-[80%] "
                />
              </div>
            </div>

            <div className='row-span-1 '>
          
              <button className='w-[100%] bg-green-300 h-[100%] rounded-xl' onClick={() => handlePayment()}>Proceed To CheckOut</button>
       
              <div className='w-[100%] mt-5 bg-red-300 break-words p-2 rounded-xl'>
                <p className='text-[2vw] small:text-[4vw] '>
                  {`${address?.street},${address?.city},${address?.state},${address?.country},${address?.pinCode}`}
                </p>
                <Link href="/Login/Profile" className='text-blue-600 underline p-2'> Change address </Link>
              </div>
            </div>
          </div>
        </div>
      </div>):(<div className='mt-20'>Empty cart</div>)}
    </div>
    
)};

export default Cart;
