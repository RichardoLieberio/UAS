import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { SamplePrevArrow, SampleNextArrow } from './SampleArrows'
import ProductCard from './ProductCard'

function ShopProducts({ shopId, shop, addToCart }) {
    const settings = {
        speed: 600,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    return(
        <div className="my-8">
            <div className="w-[1140px] mx-auto">
                <Link to={"/shop/" + shopId} className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{shop.name}</Link>
                <Slider {...settings} className="mt-4">
                    {shop.items.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart}/>)}
                </Slider>
            </div>
        </div>
    )
}

ShopProducts.propTypes = {
    shopId: PropTypes.number,
    shop: PropTypes.object,
    addToCart: PropTypes.func,
}

export default ShopProducts