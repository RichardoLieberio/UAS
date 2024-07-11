import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import ProductCard from './ProductCard'
import { IoMdArrowRoundBack } from 'react-icons/io'

function ShopPage({ addToCart }) {
    const { id } = useParams();
    const shops = useSelector((state) => state.shop.shops);

    return(
        <div className="my-8">
            <div className="w-[1140px] mx-auto">
                <span className="flex items-center mb-4">
                    <Link to="/" className="text-2xl mr-2"><IoMdArrowRoundBack /></Link>
                    <h2 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{shops[id].name}</h2>
                </span>
                <div className="flex flex-wrap gap-5">
                    {Object.keys(shops[id].items).map(productId => <ProductCard key={productId} product={shops[id].items[productId]} addToCart={addToCart}/>)}
                </div>
            </div>
        </div>
    )
}

ShopPage.propTypes = {
    addToCart: PropTypes.func,
}

export default ShopPage