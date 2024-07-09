import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ShopProducts from './ShopProducts'

function Shop({ addToCart }) {
    const shops = useSelector((state) => state.shop.shops);

    return(
        <>
            {Object.keys(shops).map(id => <ShopProducts key={id} shop={shops[id]} addToCart={addToCart} />)}
        </>
    )
}

Shop.propTypes = {
    addToCart: PropTypes.func,
}

export default Shop