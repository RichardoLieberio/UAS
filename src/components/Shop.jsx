import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ShopProducts from './ShopProducts'

function Shop({ addToCart }) {
    const shops = useSelector((state) => state.shop.shops);

    return(
        <>
            {Object.keys(shops).map(shopId => <ShopProducts key={shopId} shop={shops[shopId]} addToCart={addToCart} />)}
        </>
    )
}

Shop.propTypes = {
    addToCart: PropTypes.func,
}

export default Shop