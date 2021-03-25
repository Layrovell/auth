import React, {useState, useEffect} from "react";
import './App.scss';
import './styles/reset.scss';

function App() {
    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        date: '',
        login: '',
        password: '',
        repeatPassword: '',
    });
    const [errors, setErrors] = useState({
        errName: '',
        errSurname: '',
        errEmail: '',
        errDate: '',
        errLogin: '',
        errPassword: '',
        errRepeatPassword: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, surname, email, date, login, password, repeatPassword} = values;

        if (!name) {
            setErrors({
                ...errors,
                errName: 'name is empty',
            });
        }

        if (!surname) {
            setErrors({
                ...errors,
                errSurname: 'surname is empty',
            });
        }

        console.log(values);
        console.log(errors);
    }

    return (
        <div className="App">
            <form
                onSubmit={handleSubmit}
                className='register-form'
            >

                <input
                    value={values.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    name="name"
                />
                <span className="error-text">{errors.errName}</span>

                <input
                    value={values.surname}
                    onChange={handleChange}
                    type="text"
                    placeholder="Surname"
                    name="surname"
                />
                <span className="error-text">{errors.errSurname}</span>

                <input
                    value={values.email}
                    onChange={handleChange}
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                <input
                    value={values.date}
                    onChange={handleChange}
                    type="date"
                    name="date"
                />
                <input
                    value={values.login}
                    onChange={handleChange}
                    type="text"
                    placeholder="Login"
                    name="login"
                />
                <input
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                />
                <input
                    value={values.repeatPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="Repeat Password"
                    name="repeatPassword"
                />
                <button
                    className="btn"
                    type='submit'
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default App;
