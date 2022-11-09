import React from 'react';
import Header from './Header';
import FormIn from './FormIn';

function Login(props) {
    const initValues = { email: '', password: '' };
    const [value, setValue] = React.useState(initValues);

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

        props.onLogin(email, password)
            .then(() => {
                setValue(initValues);
            })
    };

    return (
        <>
            <Header linkName='Регистрация' link='/sign-up' />
            <FormIn title='Вход' buttonTitle='Войти' value={value} onSubmit={handleSubmit} onChange={handleChangeValue} />
        </>
    )
}

export default Login;