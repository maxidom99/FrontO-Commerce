export default function ProductItem({product, addToCart}){

    const {id, descripcion, nombres, precios, img_product} = product


    return(
        <div>
            <div className="col-4" key={id}>
            <img src={img_product} alt="img_product" className="img-fluid object-cover" />
            </div>
            <div>
                    <h3>{nombres}</h3>
                <p>{descripcion}</p>
                <p>{precios}</p>
                <button type="button" className="px-3 py-2 rounded-md shadow-xl font-semibold bg-gray-50" onClick={() => addToCart(product)}>
                    Agregar al Carrito
                </button>
            </div>
        </div>
    )
}