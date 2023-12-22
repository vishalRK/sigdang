import React from 'react';

const Order = () => {
  return (
    <div className='w-[100%] flex justify-center'>
        <div className='w-[80%] small:w-[100%]  bg-red-300'>
        <table className='flex flex-col justify-center'>
            <th className='border-2 border-black'>Order table</th>
            <tr className='flex justify-between border-2 border-t-0 border-black'>
              <td className='w-[20%] border-r-2 border-black text-center'>Order Id</td>
              <td className='w-[20%] border-r-2 border-black text-center'>email</td>
              <td className='w-[20%] border-r-2 border-black text-center'>Amount</td>
              <td className='w-[20%] border-r-2 border-black text-center'>paid status</td>
              <td className='w-[20%] border-r-2 border-black text-center'>Delivery status</td>
            </tr>
            <tr className='flex justify-between border-2 border-t-0 border-black'>
              <td className='w-[20%] border-r-2 border-black text-center overflow-hidden'>#123456789</td>
              <td className='w-[20%] border-r-2 border-black text-center overflow-hidden'>email@gmail.com</td>
              <td className='w-[20%] border-r-2 border-black text-center overflow-hidden'>1234</td>
              <td className='w-[20%] border-r-2 border-black text-center overflow-hidden'>paid</td>
              <td className='w-[20%] border-r-2 border-black text-center overflow-hidden'>pending</td>
            </tr>
        </table>
        </div>
    </div>
  );
};

export default Order;
