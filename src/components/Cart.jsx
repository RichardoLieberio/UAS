import PropTypes from 'prop-types'
import CartItem from './CartItem'
import Checkout from './Checkout'

function Cart({ cart, methods }) {
    function countTotalItems(cart) {
        let total = 0;
        Object.keys(cart).forEach(shopId => {
            if (shopId != "total") {
                Object.keys(cart[shopId].items).forEach(() => {
                    total += 1;
                });
            }
        });
        return total;
    }

    function checkAllItemSelected() {
        let allSelected = true;
        if (Object.keys(cart).length == 1) {
            return false;
        }
        Object.keys(cart).forEach(shopId => {
            if (shopId != "total") {
                Object.keys(cart[shopId].items).forEach(itemId => {
                    if (!cart[shopId].items[itemId].selected) {
                        allSelected = false;
                    }
                });
            }
        });
        return allSelected;
    }

    function checkIfItemSelected() {
        let selected = false;
        Object.keys(cart).forEach(shopId => {
            if (shopId != "total") {
                Object.keys(cart[shopId].items).forEach(itemId => {
                    if (cart[shopId].items[itemId].selected) {
                        selected = true;
                    }
                });
            }
        });
        return selected;
    }

    function checkout() {
        let totalItems = 0;
        let totalPrice = [0, 0];
        Object.keys(cart).forEach(shopId => {
            if (shopId != "total") {
                Object.keys(cart[shopId].items).forEach(itemId => {
                    if (itemId != "name" && cart[shopId].items[itemId].selected) {
                        totalItems += cart[shopId].items[itemId].count;
                        totalPrice[0] += cart[shopId].items[itemId].count * (cart[shopId].items[itemId].price * (100 - cart[shopId].items[itemId].discount_percentage) / 100).toFixed(2);
                        totalPrice[1] += (cart[shopId].items[itemId].count * cart[shopId].items[itemId].price);
                    }
                });
            }
        });
        return {totalItems: totalItems, totalPrice: [totalPrice[0].toFixed(2), totalPrice[1].toFixed(2)]};
    }

    return(
        <div className="my-8">
            <div className="w-[1140px] mx-auto">
                <h2 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white mb-4">Cart</h2>
                <div className="flex w-full flex-col lg:flex-row gap-8">
                    <div className="rounded-box grid flex-grow place-items-center w-1/2 p-0">
                        <div className="bg-white w-full shadow-md py-4 px-8 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                            <div className="card-body p-0">
                                <div className="flex items-center justify-between h-12">
                                    <span className="flex items-center">
                                        <input type="checkbox" checked={checkAllItemSelected()} onChange={methods.selectAll} className="checkbox checkbox-info mr-4" />
                                        <h2 className="card-title">Select all <span className="text-gray-500 text-base">({countTotalItems(cart)})</span></h2>
                                    </span>
                                    {checkIfItemSelected() ? <button onClick={methods.deleteSelected} className="text-blue-600 w-fit h-fit bg-transparent">Delete</button> : ""}
                                </div>
                            </div>
                        </div>
                        {Object.keys(cart).map(shopId => shopId != "total" ? <CartItem key={shopId} shopId={shopId} shopName={cart[shopId].name} items={cart[shopId].items} methods={methods} /> : "")}
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