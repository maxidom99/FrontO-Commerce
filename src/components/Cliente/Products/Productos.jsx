import { useState, useEffect, useContext } from "react"
import { getProductRequest } from "../../../api/product"
import { MdAddShoppingCart } from "react-icons/md";
import { useAuthStore } from "../../../auth/store";

import ProductItem from "../../Admin/Products/ProductItem";
import Cart from "../Cart/Cart";


const Productos = () => {

    const initialCart = () => {
        const storageCart = localStorage.getItem("cart")
        return storageCart ? JSON.parse(storageCart) : []
    }
    const [product, setProduct] = useState([])
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 20
    
     const getProduct = async () => {
            try {
                const res = await getProductRequest()
                setProduct(res)   
             } catch (error) {
                 (error)
             }
     }

     function addToCart(item) {
        const itemExist = cart.findIndex(product => product.id === item.id)
        if(itemExist >= 0) {
            if(cart[itemExist].quantity >= MAX_ITEMS) return

            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
          
            setCart(updatedCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }

     }

     function removeToCart(id) {
        setCart(prevCart => prevCart.filter(product => product.id !== id))
        
        console.log('eliminar', id)
     }

     function incrementCart(id){
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item, quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
     }

     function decrementCart(id){
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > 1 ){
                return {
                    ...item, quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
     }

     function clearCart(){
        setCart([])
     }

     useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
     },[cart])
  
     useEffect(() => {
         getProduct() 
     }, [])


     const profile = useAuthStore((state) => state.profile)
     const Cliente = profile?.rol === 'C';

      return (
  <>
      <div className=""> 
            <Cart cart={cart} removeFromCart={removeToCart} clearCart={clearCart} incrementCart={incrementCart} decrementCart={decrementCart}/>
        {Cliente &&
          <div className="w-9/12 m-auto mb-24">
            
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4" >
                    {
                        product.map((item) => (

                            <ProductItem key={item.id} product={item} cart={cart} addToCart={addToCart} clearCart={clearCart} />
                        ))
                    }
   
              </div>
              </div>
}
      </div>
    </>
  )
}

export default Productos