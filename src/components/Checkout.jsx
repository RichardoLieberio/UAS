import PropTypes from 'prop-types'

function Checkout({ checkout }) {
    return(
        <div className="rounded-box flex flex-col flex-grow place-items-center w-1/4 p-0 relative">
            <div className="bg-white w-full shadow-md py-4 px-8 rounded-lg dark:bg-gray-800 dark:border-gray-700 sticky top-[7.744rem]">
                <div className="card-body p-0">
                    <h2 className="card-title flex items-center justify-between h-12">Shopping Summary</h2>
                    <span className="flex justify-end">
                        <h2 className="text-gray-500 line-through text-base font-semibold tracking-tight dark:text-white">${checkout.totalPrice[1]}</h2>
                    </span>
                    <span className="flex justify-between">
                        <h2 className="text-gray-900 text-xl tracking-tight dark:text-white">Total</h2>
                        <h2 className="text-gray-900 text-xl font-semibold tracking-tight dark:text-white">${checkout.totalPrice[0]}</h2>
                    </span>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mt-2 px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Checkout ({checkout.totalItems})</button>
                </div>
            </div>
        </div>
    )
}

Checkout.propTypes = {
    checkout: PropTypes.object,
}

export default Checkout