import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import { SamplePrevArrow, SampleNextArrow } from './SampleArrows'
import ProductCard from './ProductCard'

function ShopProducts({ shop, addToCart }) {
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
                <h2 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white mb-4">{shop.name}</h2>
                <Slider {...settings}>
                    {shop.items.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart}/>)}
                </Slider>
            </div>
        </div>
    )
}

ShopProducts.propTypes = {
    shop: PropTypes.object,
    addToCart: PropTypes.func,
}

export default ShopProducts