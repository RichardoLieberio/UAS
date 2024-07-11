import PropTypes from 'prop-types'
import CartItem from './CartItem'
import Checkout from './Checkout'

function Cart({ cart, methods }) {
    function checkIsAllItemSelected() {
        if (Object.keys(cart).length != 1) {
            for (let shopId in cart) {
                if (shopId != "total") {
                    for (let productId in cart[shopId].items) {
                        if (!cart[shopId].items[productId].selected) {
                            return false;
                        }
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

    function countTotalItems() {
        let total = 0;
        for (let shopId in cart) {
            if (shopId != "total") {
                Object.keys(cart[shopId].items).forEach(() => {
                    total += 1;
                });
            }
        }
        return total;
    }

    function checkout() {
        let totalItems = 0;
        const prices = {
            before: 0,
            discount: 0
        };
        for (let shopId in cart) {
            if (shopId != "total") {
                for (let productId in cart[shopId].items) {
                    if (cart[shopId].items[productId].selected) {
                        totalItems += cart[shopId].items[productId].count;
                        prices.before += cart[shopId].items[productId].count * cart[shopId].items[productId].price;
                        prices.discount += cart[shopId].items[productId].count * (cart[shopId].items[productId].price * (100 - cart[shopId].items[productId].discount_percentage) / 100).toFixed(2);
                    }
                }
            }
        }
        return {totalItems: totalItems, prices};
    }

    return(
        <div className="my-8">
            <div className="w-[1140px] mx-auto">
                <h2 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white mb-4">Cart</h2>
                <div className="flex w-full flex-col lg:flex-row gap-8">
                    <div className="rounded-box grid flex-grow place-items-center w-1/2 h-fit p-0">
                        <div className="bg-white w-full shadow-md py-4 px-8 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                            <div className="card-body p-0">
                                <div className="flex items-center justify-between h-12">
                                    <span className="flex items-center">
                                        <input type="checkbox" checked={checkIsAllItemSelected()} onChange={methods.selectAll} className="checkbox checkbox-info mr-4" />
                                        <h2 className="card-title">Select all <span className="text-gray-500 text-base">({countTotalItems()})</span></h2>
                                    </span>
                                    <button onClick={methods.deleteAll} className="text-blue-600 w-fit h-fit bg-transparent">Delete All</button>
                                </div>
                            </div>
                        </div>
                        {Object.keys(cart).map(shopId => shopId != "total" && <CartItem key={shopId} shopId={shopId} shopName={cart[shopId].name} items={cart[shopId].items} methods={methods} />)}
                    </div>
                    <Checkout checkout={checkout()} />
                </div>
            </div>
        </div>
    )
}

Cart.propTypes = {
    cart: PropTypes.object,
    methods: PropTypes.object,
}

export default Cart