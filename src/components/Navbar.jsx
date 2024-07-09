import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import shopIcon from '/icon.png'

function Navbar({ cartLength }) {
    return(
        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-screen z-[1]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={shopIcon} className="h-8" alt="OurShop Icon" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-green">OurShop</span>
                </Link>
                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
                </div>
                <Link to="/cart" className="p-0.5 flex items-center justify-center cursor-pointer hover:bg-slate-200">
                    <div className="relative scale-75">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        {cartLength ? <span className="absolute -top-2 left-4 rounded-full bg-red-500 px-2 text-base text-red-50">{cartLength}</span> : ""}
                    </div>
                </Link>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    cartLength: PropTypes.number,
}

export default Navbar;