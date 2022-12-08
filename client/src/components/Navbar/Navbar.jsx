import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import './Navbar.scss'
import {AuthContext} from "../../context/AuthContext";
function Navbar() {
    const {logout, isLogin} = useContext(AuthContext)
    return (
        <nav>
            <div className="nav-wrapper navbar green">
                <a className="brand-logo">TODO</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {
                        isLogin
                        ? <li><a onClick={logout}>Выйти</a></li>
                        : <li><Link to="/login">Войти</Link></li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;