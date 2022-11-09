import React, { useState } from 'react';
import Header from './Header';
import FormIn from './FormIn';
import { Link } from 'react-router-dom';

function Register(props) {
    const [value, setValue] = useState({ email: '', password: '' });

    // Управление инпутами
    function handleChangeValue(e) {
        setValue(old => ({
            ...old,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = value;
        props.onRegister(email, password)
    };

    return (
        <>
            <Header linkName='Войти' link='/sign-in' />
            <FormIn title='Регистрация' buttonTitle='Зарегистрироваться' value={value} onSubmit={handleSubmit} onChange={handleChangeValue} />
            <div className="link_registrate"><Link className="link" to='/sign-in'>Уже зарегестрированы? Войти</Link></div>
        </>
    )
}

export default Register;