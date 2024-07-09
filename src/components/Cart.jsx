// import { useSelector } from "react-redux"
import PropTypes from 'prop-types'
import CartItem from './CartItem'

function Cart({ cart }) {
    function countTotalItems(cart) {
        console.log(cart);
        let total = 0;
        Object.keys(cart).forEach(shopId => {
            if (shopId != "total") {
                Object.keys(cart[shopId].items).forEach(itemId => {
                    if (itemId != "name") {
                        total += 1;
                    }
                });
            }
        });
        return total;
    }

    return(
        <div className="my-8">
            <div className="w-[1140px] mx-auto">
            <h2 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white mb-4">Cart</h2>
            <div className="flex w-full flex-col lg:flex-row gap-8">
                <div className="rounded-box grid flex-grow place-items-center w-1/3 p-0">
                    <div className="bg-white w-full shadow-md py-4 px-8 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="card-body p-0">
                            <div className="flex items-center justify-between p-0">
                                <span className="flex items-center">
                                    <input type="checkbox" className="checkbox checkbox-info mr-4" />
                                    <h2 className="card-title">Select all <span className="text-gray-500 text-base">({countTotalItems(cart)})</span></h2>
                                </span>
                                <button className="text-blue-600 w-fit h-fit bg-transparent">Delete</button>
                            </div>
                        </div>
                    </div>
                    {Object.keys(cart).map(shopId => shopId != "total" ? <CartItem key={shopId} shopName={cart[shopId].name} items={cart[shopId].items} /> : "")}
                </div>
                <div className="card bg-base-300 rounded-box grid flex-grow place-items-center">content</div>
            </div>
            </div>
        </div>
    )
}

Cart.propTypes = {
    cart: PropTypes.object,
}

export default Cart