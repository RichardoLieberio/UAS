import PropTypes from 'prop-types'
import CartProduct from "./CartProduct"

function CartItem({ products }) {
    return(
        <div className="card card-side bg-base-100 shadow-xl w-full h-fit py-4 mt-4">
            <figure className="mr-4">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Product Image" />
            </figure>
            {products.map(product => <CartProduct key={product.id} product={product} />)}
        </div>
    )
}

CartItem.propTypes = {
    products: PropTypes.array,
}

export default CartItem