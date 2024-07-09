import PropTypes from 'prop-types'

function CartProduct({ product }) {
    return(
        <div className="card-body p-0">
            <h2 className="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Watch</button>
            </div>
        </div>
    )
}

CartProduct.propTypes = {
    product: PropTypes.object,
}

export default CartProduct

// Product masih tidak terdeteksi