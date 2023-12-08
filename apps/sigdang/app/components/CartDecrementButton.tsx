import React from 'react'
type Decrement = {
    classname:string
}
const CartDecrementButton = ({classname}:Decrement) => {
  return (
    <button className={`${classname}`}>-</button>
  )
}

export default CartDecrementButton
