"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import menu from '../utils/menu.json';
import Image from 'next/image';
import CartIncrementButton from './CartIncrementButton';
import CartDecrementButton from './CartDecrementButton';
import { useAuth } from '../utils/User';
import { useDispatch ,useSelector} from 'react-redux';
import { RootState } from 'apps/sigdang/redux/store';
import { fetchProducts } from 'apps/sigdang/redux/productSlice';

// import { useDispatch,useSelector } from 'react-redux';
// import { incrementQuantity,selectCartItems } from 'apps/sigdang/features/cart/cart';
type Products = {
  _id: string;
  image: string;
  title: string;
  tags: [string];
  price: number;
  rating: number;
  quantity: number;
};
const Menu = () => {
  const { cart, users } = useAuth();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  // const dispatch = useDispatch();
  // const cartItems = useSelector(selectCartItems);
  // const [products, setProducts] = useState<Products[]>([]);
  let products:Products[];
  // const [qunatity, setQunatity] = useState<number>(0);
  useEffect(() => {
    dispatch(fetchProducts());
    // fetch('http://localhost:3000/api/v1/product/getproduct')
    //   .then((response) => {
    //     if (!response.ok) {
    //       console.log('hellow');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (cart.length > 0) {
    //       console.log(cart);
    //     }
    //     const updatedProducts = data.products.map((product: Products) => {
    //       const cartItem = cart.find((item) => item.product_id === product._id);
    //       console.log(cartItem);
    //       return {
    //         ...product,
    //         quantity: cartItem?.quantity ? cartItem?.quantity : 0,
    //       };
    //     });

    //     // setProducts(updatedProducts);
    //     products = updatedProducts

    //     // if( data.products)
    //     // {

    //     //   cart.forEach((p) => {

    //     // data.product.filter(p => p._id === p. )
    //     //     console.log(p);
    //     // Assuming you want to set the product quantity to the state

    //     // setProducts((products:Products[]) => [... data.product.filter((p) => p._id === p.product_id ), {quantity:p.quantity}]);

    //     // });
    //     // }
    //   });
  }, [dispatch]);
  // console.log(products);
  const addCart = (productId: string) => {
    console.log(productId);
    // if(productId && users.userId)
    // {
    //   dispatch(incrementQuantity(productId,users.userId));
    // }

    // fetch(`http://localhost:3000/api/v1/cart/setCart/${users.userId}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     productId: productId,
    //   }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.text().then((text) => {
    //         throw new Error(text);
    //       });
    //       // return response;
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     alert(data.message);
    //   })
    //   .catch((err) => {
    //     alert(JSON.parse(err.message).message);
    //   });
  };
  return (
    <div className="w-[100%]  flex mt-2  justify-center">
      <div className="w-[90%] small:w-[100%] h-[60vh]  grid grid-rows-5">
        <div className=" row-span-1 self-center bg-yellow-300">
          <div className="  grid grid-flow-col text-center">
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              BreakFast
            </h1>
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              Lunch
            </h1>
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              Dinner
            </h1>
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              Chinese
            </h1>
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              Juices
            </h1>
          </div>
        </div>
        <div className="row-span-4 h-[100%] self-center">
          <div className="grid h-[100vh] small:h-[100%] small:grid-cols-2  medium:grid-cols-3 large:grid-cols-4 p-2 gap-4 small:gap-2">
            {data?.map((m) => (
              <div
                key={+m._id}
                className="w-34 small:h-[95%] medium:h-[95%] large:h-[100%] smd:h-[70%] small:gap-x-0 rounded-2xl gird grid-flow-row p-2 bg-white shadow-2xl"
              >
                <div className="rounded-2xl w-[100%] h-64 small:h-36 flex justify-center">
                  <Image
                    src={m?.image}
                    width={500}
                    height={500}
                    alt={m.title + '_' + 'image'}
                    className="rounded-2xl"
                  />
                </div>
                <div>
                  <div>
                    <h1 className="text-center small:text-[6vw] text-[2vw] font-[500] font-lobster">
                      {m.title}
                    </h1>
                  </div>
                  <div className="flex justify-between">
                    {m.tags.map((ftag) => (
                      <div
                        key={''}
                        className="w-[30%]  overflow-hidden rounded-lg text-center p-1 bg-green-200 text-gray-300 small:text-[3vw] font-lobster"
                      >
                        {Object.values(ftag)[0]}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between p-2">
                    <h3 className="bg-blue-200 small:w-14 rounded-lg w-[30%] font-lobster text-[2vw] small:text-[5vw] p-1 flex justify-evenly">
                      <span>{m.price}</span>
                      <span>₹</span>
                    </h3>
                    <h3 className="bg-blue-200 small:w-14 rounded-lg w-[30%] font-lobster text-[2vw] small:text-[5vw] p-1 flex justify-evenly">
                      <span>4.1</span>
                      <img
                        src="/icons/star.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                    </h3>
                  </div>
                  <div className="p-3 ">
                    {m?.quantity > 0 ? (
                      <div className="flex justify-between">
                        <CartIncrementButton
                          classname="w-[30%] h-10 bg-purple-300 rounded-xl text-white text-[3vw] font-lobster"
                          productId={m._id}
                        />
                        {/* <button className="w-[30%] h-10 bg-purple-300 rounded-xl text-white font-lobster">+</button> */}
                        <h1 className="w-12 bg-purple-300 rounded-lg  text-[25px] text-white text-center font-bold">
                          {+m?.quantity}
                        </h1>
                        <CartDecrementButton classname="w-[30%] h-10 bg-purple-300 rounded-xl text-white font-lobster" />
                        {/* <button className="w-[30%] h-10 bg-purple-300 rounded-xl text-white font-lobster">-</button> */}
                      </div>
                    ) : (
                      <button
                        className="w-[100%] h-10 bg-purple-300 rounded-xl text-white font-lobster"
                        onClick={() => addCart(m._id)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
