import React from 'react'
import AuthController from '../../controllers/auth.controller'

import './profile.scss'

const ProfilePage = ({history}: {history: any}) => {
    const clickHandler = () => {
        AuthController.logout()

        history.push('/')
    }

    return (
        <button className='submit-btn' onClick={clickHandler}>Logout</button>
    )
}

export default ProfilePage