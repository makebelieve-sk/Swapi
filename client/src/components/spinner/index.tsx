import React from 'react'
import './spinner.scss'

const Spinner = () => {
    return (
        <div className='wrapper-spinner'>
            <div className="spinner">
                <span className="spinner-inner-1"></span>
                <span className="spinner-inner-2"></span>
                <span className="spinner-inner-3"></span>
            </div>
        </div>
    )
}

export default Spinner