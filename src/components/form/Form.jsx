import React from 'react';

export const Form = ({name, setName}) => {
    return (
        <form action="" className='register-form'>
            <input
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    console.log(name);
                }}
                type="text"
                placeholder="Name"
            />
            <input
                type="text"
                placeholder="Surname"
            />
            <input
                type="email"
                placeholder="Email"
            />
            <input
                type="date"
            />
            <input
                type="text"
                placeholder="Login"
            />
            <input
                type="password"
                placeholder="Password"
            />
            <input
                type="password"
                placeholder="Repeat Password"
            />
            <button
                className="btn"
                type='submit'
            >
                Register
            </button>
        </form>
    );
};
