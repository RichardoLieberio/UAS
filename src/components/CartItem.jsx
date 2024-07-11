import PropTypes from 'prop-types'
import CartProduct from "./CartProduct"

function CartItem({ shopId, shopName, items, methods }) {
    function selectAll(e) {
        e.target.checked ? methods.shopSelectAll(shopId) : methods.shopDeselectAll(shopId);
    }

    function checkAllItemSelected() {
        for (let productId in items) {
            if (items[productId].selected == false) {
                return false;
            }
        }
        return true;
    }

    return(
        <div className="bg-white w-full shadow-md py-4 px-8 rounded-lg dark:bg-gray-800 dark:border-gray-700 mt-4">
            <div className="card-body p-0">
                <div className="flex items-center justify-between p-0">
                    <span className="flex items-center">
                        <input onChange={selectAll} checked={checkAllItemSelected()} type="checkbox" className="checkbox checkbox-info mr-4" />
                        <h2 className="card-title">{shopName}</h2>
                    </span>
                    <button onClick={() => {methods.deleteShopItems(shopId)}} className="text-blue-600 w-fit h-fit bg-transparent">Delete Items</button>
                </div>
            </div>
            {Object.keys(items).map(itemId => <CartProduct key={itemId} item={items[itemId]} methods={methods} />)}
        </div>
    )
}

CartItem.propTypes = {
    shopId: PropTypes.string,
    shopName: PropTypes.string,
    items: PropTypes.object,
    methods: PropTypes.object,
}

export default CartItem