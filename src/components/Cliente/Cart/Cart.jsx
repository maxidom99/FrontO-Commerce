import { 
  Button, 
  Drawer, 
  DrawerOverlay, 
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody

 } from "@chakra-ui/react"
 import { FaCartPlus } from "react-icons/fa";
import { useMemo } from "react"

const Cart = ({cart, removeFromCart, incrementCart, decrementCart, clearCart}) => {

const isEmpty = useMemo(() => cart.length === 0, [cart])
const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.precios), 0), [cart])
const { isOpen, onOpen, onClose } = useDisclosure()


const handleClick = () => {
  onOpen()
}

  return (
<div className="absolute top-0 right-2">
      <Button onClick={() => handleClick()} key={'md'} m={4} className="shadow-xl ">
        <span className="text-center text-2xl">
          {
            !isEmpty ?
           <>  <div className="flex gap-2"> 
            <FaCartPlus />
           
            <p className="text-sm "></p>
            </div>
           </>
            : 
             <FaCartPlus />
          }
         
          
          
          </span>
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="text-center ">Carrito de compras</DrawerHeader>
          <DrawerBody>
          {isEmpty ? (
        <p className="text-center mt-5 text-md ">Carrito vacío</p>
      ) : (
        <>
        <div className="flex flex-col justify-center items-center">

      
          {cart.map((item) => (
            <div key={item.id} className="flex  gap-5 items-center w-full mt-2 font-semibold text-md">
              <img src={item.img_product} className='w-24 h-24 object-cover rounded-md' alt="img_product" />
              <p className="">{item.nombres}</p>
              <p className="text-xl">${item.precios}</p>
              <div className="flex items-center text-xl">
                <button type="button" className="text-3xl mb-2" onClick={() => decrementCart(item.id)}>-</button>
                <p className="h-auto px-3 rounded-md m-auto bg-zinc-200 ">{item.quantity}</p>
                <button type="button" className="text-3xl mb-2" onClick={() => incrementCart(item.id)}>+</button>
                <button type="button" className="ml-2  bg-red-700 rounded-md px-3 h-8 text-white font-semibold" onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            </div>
          ))} 
            </div>
           <div>
                <p className="text-center mt-5 font-semibold text-xl">Total a pagar ${cartTotal}</p>
                <button type="button" onClick={clearCart} className="px-3 py-2 w-full font-semibold mt-5 rounded-md shadow-md bg-gray-50">Limpiar carrito</button>
              </div>
        </>
      )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
     </div> 
  
        )
      }
    

export default Cart;