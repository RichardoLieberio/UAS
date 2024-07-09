import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import ProductCard from './ProductCard'
import { SamplePrevArrow, SampleNextArrow } from './SampleArrows'

function ShopProducts({ shop, addToCart }) {
    const settings = {
        speed: 600,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />
    };

    return(
        <div className="my-8">
            <div className="w-[1280px] mx-auto">
                <h2 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white mb-4">{shop.name}</h2>
                <Slider {...settings}>
                    {shop.items.map(product => <ProductCard key={product.id} product={product} clickHandler={addToCart}/>)}
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