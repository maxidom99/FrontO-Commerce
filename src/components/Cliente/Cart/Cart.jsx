import { useContext } from "react"
import cartContext from "../../../context/cartContext"

const Cart = () => {

    const CartContext = useContext(cartContext)
    const {cartItems, addToCart,cartCount,  removeFromCart, total} = CartContext;

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

  return (
    <div>
        {cartItems > 0 && <span className="px-3 py-1 text-xl font-semibold">{cartCount}</span>}

    </div>
  )
}

export default Cart