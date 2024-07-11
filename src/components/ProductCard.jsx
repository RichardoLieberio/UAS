import PropTypes from 'prop-types'

function ProductCard({ product, addToCart }) {
    return(
        <div className="w-52 mx-auto hover:brightness-95">
            <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg object-center mx-auto" src={product.images[1]} alt="Product Image"/>
                <div className="p-2.5">
                    <div className="h-24">
                        <h3 className="text-gray-900 font-semibold text-base tracking-tight dark:text-white line-clamp-2">{product.title}</h3>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">${(product.price * (100 - product.discount_percentage) / 100).toFixed(2)}</span>
                        <div className="flex items-center">
                            <span className="text-sm font-bold text-gray-500 dark:text-white line-through">${product.price}</span>
                            <span className="text-xs font-bold text-red-500 bg-red-50 ml-1">{product.discount_percentage}%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-1">
                        <button onClick={() => {addToCart(product)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object,
    addToCart: PropTypes.func,
}

export default ProductCard