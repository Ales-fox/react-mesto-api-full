import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header(props) {
    const { linkName, link, email, onClick } = props;
    return (
        <header className="header">
            <img className="header__logo " src={logo} alt="Лого" />
            <Switch>
                <Route path='/sign-up'>
                    <Link className="header__link link" to={link}>{linkName}</Link>
                </Route>

                <Route path='/sign-in'>
                    <Link className="header__link link" to={link}>{linkName}</Link>
                </Route>

                <Route path='/'>
                    <p className="header__email">{email}</p>
                    <Link className="header__link link" to={link} onClick={onClick}>{linkName}</Link>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;