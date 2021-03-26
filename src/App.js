import React, {useState, useEffect} from "react";
import './App.scss';
import './styles/reset.scss';

function App() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [nameErrorMessage, setNameErrorMessage] = useState('Имя не может быть пустым!');
    const [surnameErrorMessage, setSurnameErrorMessage] = useState('Фамилия не может быть пустой!');
    const [emailErrorMessage, setEmailErrorMessage] = useState('Почта не может быть пустой!');
    const [dateErrorMessage, setDateErrorMessage] = useState('Дата не может быть пустой!');
    const [loginErrorMessage, setLoginErrorMessage] = useState('Логин не может быть пустым!');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('Пароль не может быть пустым!');
    const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState('Повторите пароль!');

    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);

    const [formValid, setFormValid] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameError(true);
                break;
            case 'surname':
                setSurnameError(true);
                break;
            case 'email':
                setEmailError(true);
                break;
            case 'date':
                setDateError(true);
                break;
            case 'login':
                setLoginError(true);
                break;
            case 'password':
                setPasswordError(true);
                break;
            case 'repeatPassword':
                setRepeatPasswordError(true);
                break;
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value);
        const regexp = /^[a-zA-Z\u00C0-\u00ff]+$/;

        if (!regexp.test(String(e.target.value).toLowerCase())) {
            setNameErrorMessage('Некоректное имя');
        } else {
            setNameErrorMessage('');
        }
    }

    const surnameHandler = (e) => {
        setSurname(e.target.value);
        const regexp = /^[a-zA-Z\u00C0-\u00ff]+$/;

        if (!regexp.test(String(e.target.value).toLowerCase())) {
            setSurnameErrorMessage('Некоректная фамилия');
        } else {
            setSurnameErrorMessage('');
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regexp.test(String(e.target.value).toLowerCase())) {
            setEmailErrorMessage('Недопустимый формат почты');
        } else {
            setEmailErrorMessage('');
        }

        if (e.target.value.length === 0) {
            setPasswordErrorMessage('Почта не может быть пустой');
        }
    }

    const dateHandler = (e) => {
        setDate(e.target.value);
        const limit = 16;

        const dateNow = new Date().toISOString().split('T')[0];
        let currentAge = (new Date(dateNow).getTime() - new Date(e.target.value).getTime()) / 1000 / 60 / 60 / 24;
        currentAge = Math.round(currentAge / 365);

        if (currentAge < limit) {
            setDateErrorMessage('Возраст пользователя меньше 16');
        } else {
            setDateErrorMessage('');
        }
    }

    const loginHandler = (e) => {
        setLogin(e.target.value);
        const regexp = /^[0-9a-zA-Z]+$/;

        if (!regexp.test(String(e.target.value))) {
            setLoginErrorMessage('Недопустимый формат логина');
        } else {
            setLoginErrorMessage('');
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

        if (!regexp.test(String(e.target.value))) {
            setPasswordErrorMessage('Неправильный формат пароля');
        } else if (e.target.value.length < 6) {
            setPasswordErrorMessage('Пароль не должен быть менее 6 символов');
        } else {
            setPasswordErrorMessage('');
        }

        if (e.target.value.length === 0) {
            setPasswordErrorMessage('Пароль не может быть пустым');
        }
    }

    const repeatPasswordHandler = (e) => {
        setRepeatPassword(e.target.value);

        if (password !== repeatPassword) {
            setRepeatPasswordErrorMessage('password do not match!');
        }
        console.log(password === repeatPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nameError && !surnameError && !emailError && !dateError && loginError && passwordError) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }

    return (
        <div className="App">
            <form
                onSubmit={handleSubmit}
                className='register-form'
            >

                <input
                    value={name}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => nameHandler(e)}
                    type="text"
                    placeholder="Name"
                    name="name"
                />
                {(nameError && nameErrorMessage && <div className="error-message">{nameErrorMessage}</div>)}

                <input
                    value={surname}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => surnameHandler(e)}
                    type="text"
                    placeholder="Surname"
                    name="surname"
                />
                {(surnameError && surnameErrorMessage && <div className="error-message">{surnameErrorMessage}</div>)}

                <input
                    value={email}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => emailHandler(e)}
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                {(emailError && emailErrorMessage && <div className="error-message">{emailErrorMessage}</div>)}

                <input
                    value={date}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => dateHandler(e)}
                    type="date"
                    name="date"
                />
                {(dateError && dateErrorMessage && <div className="error-message">{dateErrorMessage}</div>)}

                <input
                    value={login}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => loginHandler(e)}
                    type="text"
                    placeholder="Login"
                    name="login"
                />
                {(loginError && loginErrorMessage && <div className="error-message">{loginErrorMessage}</div>)}

                <input
                    value={password}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => passwordHandler(e)}
                    type="password"
                    placeholder="Password"
                    name="password"
                />
                {(passwordError && passwordErrorMessage && <div className="error-message">{passwordErrorMessage}</div>)}

                <input
                    onBlur={(e) => blurHandler(e)}
                    value={repeatPassword}
                    onChange={(e) => repeatPasswordHandler(e)}
                    type="password"
                    placeholder="Repeat Password"
                    name="repeatPassword"
                />
                {(repeatPasswordError && repeatPasswordErrorMessage && <div className="error-message">{repeatPasswordErrorMessage}</div>)}

                <button
                    // disabled={!formValid}
                    onClick={(e) => setShowCongrats(true)}
                    type='submit'
                    className="btn"
                >
                    Register
                </button>

                {formValid && <div className="success-message">Регистрация прошла успешно!</div>}
            </form>
        </div>
    );
}

export default App;
