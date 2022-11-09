import React from 'react';

export default function FormIn(props) {
    const { title, buttonTitle, onSubmit, onChange, value } = props;

    return (
        <form className='formIn' onSubmit={onSubmit}>
            <h1 className='formIn__title'>{title}</h1>
            <input type="email" className='input_formIn input' placeholder='Email' onChange={onChange} name='email' value={value.email} required></input>
            <span className="input-error input-error_***"></span>
            <input type="password" className='input_formIn input' placeholder='Пароль' name='password' value={value.password} onChange={onChange} required></input>
            <span className="input-error input-error_***"></span>
            <button className="button button-in" type="submit" >{buttonTitle}</button>
        </form>
    )
}