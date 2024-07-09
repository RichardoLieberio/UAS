import PropTypes from 'prop-types'
import CartProduct from "./CartProduct"

function CartItem({ shopName, products }) {
    return(
        <div className="bg-white w-full shadow-md py-4 px-8 rounded-lg dark:bg-gray-800 dark:border-gray-700 mt-4">
            <div className="card-body p-0">
                <div className="flex items-center justify-between p-0">
                    <span className="flex items-center">
                        <input type="checkbox" className="checkbox checkbox-info mr-4" />
                        <h2 className="card-title">{shopName}</h2>
                    </span>
                </div>
            </div>
            <div className="flex py-4 mt-4">
                <input type="checkbox" className="checkbox checkbox-info mr-4" />
                <figure className="mr-4">
                    {/* <img
                        src="https://via.placeholder.com/100"
                        alt="Product Image" /> */}
                    <div className="bg-slate-600 w-[100px] h-[100px]"></div>
                </figure>
                <div className='w-full'>
                    <span className="flex items-center justify-between">
                        <h2 className="text-gray-900 text-xl tracking-tight dark:text-white line-clamp-1">HAIHAIHAIAHI</h2>
                        <h2 className="text-gray-900 font-bold text-xl tracking-tight dark:text-white w-24 text-right">$19.99</h2>
                    </span>
                    <span className="flex items-center justify-between">
                        <p className="text-sm font-bold text-gray-500 dark:text-white line-clamp-1">HAIHAIHAIAHI</p>
                        <p className="text-sm font-bold text-gray-500 dark:text-white line-through w-24 text-right">$39.99</p>
                    </span>
                </div>
            </div>
            <div className="flex py-4 mt-4">
                <input type="checkbox" className="checkbox checkbox-info mr-4" />
                <figure className="mr-4">
                    {/* <img
                        src="https://via.placeholder.com/100"
                        alt="Product Image" /> */}
                    <div className="bg-slate-600 w-[100px] h-[100px]"></div>
                </figure>
                <div className='w-full'>
                    <span className="flex items-center justify-between">
                        <h2 className="text-gray-900 text-xl tracking-tight dark:text-white line-clamp-1">HAIHAIHAIAHI</h2>
                        <h2 className="text-gray-900 font-bold text-xl tracking-tight dark:text-white w-24 text-right">$19.99</h2>
                    </span>
                    <span className="flex items-center justify-between">
                        <p className="text-sm font-bold text-gray-500 dark:text-white line-clamp-1">HAIHAIHAIAHI</p>
                        <p className="text-sm font-bold text-gray-500 dark:text-white line-through w-24 text-right">$39.99</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    shopName: PropTypes.string,
    products: PropTypes.array,
}

export default CartItem