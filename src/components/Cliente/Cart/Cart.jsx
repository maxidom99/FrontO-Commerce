import { useContext, useEffect, useState } from "react"
import { cartContext } from "../../../context/cartState";


const Cart = () => {

  
    const {cartItems} = useContext(cartContext);


    
  return (
    <div>
       <div>
        
      { cartItems.map((item) => (
        <div key={item.id} className="p-4 text-black flex-1  ">
          <p>{item.nombres}</p>
          
        </div>
        
      ))}
    </div>


    </div>
  )
}

export default Cart