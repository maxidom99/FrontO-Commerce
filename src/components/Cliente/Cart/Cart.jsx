import { useMemo } from "react"

const Cart = ({cart, removeFromCart, incrementCart, decrementCart, clearCart}) => {

const isEmpty = useMemo(() => cart.length === 0, [cart])
const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.precios), 0), [cart])

  return (
    <div className='absolute top-3 right-10 px-3 py-1 border text-black'>
      {isEmpty ? (
        <p>Carrito vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <img src={item.img_product} className='w-10 h-10' alt="" />
              <p>{item.nombres}</p>
              <p>{item.precios}</p>
              <div className="flex">
                <button type="button" onClick={() => decrementCart(item.id)}>-</button>
                <p className="p-3">{item.quantity}</p>
                <button type="button" onClick={() => incrementCart(item.id)}>+</button>
                <button type="button" onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            </div>
          ))} 
          
           <div>
                <p>Total a pagar ${cartTotal}</p>
                <button type="button" onClick={clearCart} className="px-3 py-2 rounded-md shadow-md bg-gray-50">Limpiar carrito</button>
              </div>
        </>
      )}
    </div>
        )
      }
    

export default Cart;