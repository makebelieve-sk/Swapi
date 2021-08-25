import React from 'react'
import { Link } from 'react-router-dom'

import {User} from '../../types/auth.types'

import './header.scss'

const Header = ({isAuth}: {isAuth: User}) => {
    let authBlock: JSX.Element = <ul className="d-flex">
        <li><Link to="/sign-in">Sign In</Link></li>

        <li><Link to="/sign-up">Sign Up</Link></li>
    </ul>

    if (isAuth) {
        authBlock = <Link to="/profile"><p className='username'>{isAuth.name}</p></Link>
    }

    return (
        <div className="header">
            <h3><Link to="/">StarDB</Link></h3>

            <ul className="d-flex">
                <li><Link to="/people">People</Link></li>

                <li><Link to="/planets">Planets</Link></li>

                <li><Link to="/starships">Starships</Link></li>
            </ul>

            {authBlock}
        </div>
    )
}

export default Header