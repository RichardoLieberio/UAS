import { useSelector } from "react-redux"
import PropTypes from 'prop-types'
import CartItem from './CartItem'

function Cart({ cart }) {
    const shops = useSelector((state) => state.product.shops);

    return(
        <>
            <h2 className="text-gray-900 font-semibold text-2xl tracking-tight dark:text-white mb-4">Cart</h2>
            <div className="flex w-full flex-col lg:flex-row gap-8">
                <div className="card rounded-box grid flex-grow place-items-center w-1/3 p-0">
                    <div className="card bg-base-100 w-full shadow-xl py-4">
                        <div className="card-body p-0">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center">
                                    <input type="checkbox" defaultChecked className="checkbox checkbox-info mr-4" />
                                    <h2 className="card-title">Select all <span className="text-gray-500 text-base">({Object.keys(cart).length - 1})</span></h2>
                                </span>
                                <button className="text-blue-600 w-fit h-fit bg-transparent">Delete</button>
                            </div>
                        </div>
                    </div>
                    {Object.keys(shops).map(id => {
                        if (cart[id]) {
                            return <CartItem key={id} products={cart[id]} />
                        }
                    })}
                </div>
                <div className="card bg-base-300 rounded-box grid flex-grow place-items-center">content</div>
            </div>
        </>
    )
}

Cart.propTypes = {
    cart: PropTypes.object,
}

export default Cart