import PropTypes from 'prop-types'

function AddedFlush({ enable }) {
    return(
        <div role="alert" className={"alert alert-success w-3/4 fixed left-1/2 -translate-x-1/2 transition-all " + enable}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Item added to cart!</span>
        </div>
    )
}

AddedFlush.propTypes = {
    enable: PropTypes.string,
}

export default AddedFlush