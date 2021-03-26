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
    const [formValidMessage, setFormValidMessage] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // validation for name
        const reName = /^[a-zA-Z\u00C0-\u00ff]+$/;
        const validName = reName.test(name);

        if (name.length === 0) {
            setNameError(true);
        } else if (!validName) {
            setNameErrorMessage('Некоректное имя');
        } else {
            setNameErrorMessage('');
        }

        // validation for surname
        const reSurname = /^[a-zA-Z\u00C0-\u00ff]+$/;
        const validSurname = reSurname.test(surname);

        if (surname.length === 0) {
            setSurnameError(true);
        } else if (!validSurname) {
            setSurnameErrorMessage('Некоректная фамилия');
        } else {
            setSurnameErrorMessage('');
        }

        // validation for email
        const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validEmail = reEmail.test(email);

        if (email.length === 0) {
            setEmailError(true);
        } else if (!validEmail) {
            setEmailErrorMessage('Недопустимый формат почты');
        } else {
            setEmailErrorMessage('');
        }

        // validation for date
        const limit = 16;

        const dateNow = new Date().toISOString().split('T')[0];
        let currentAge = (new Date(dateNow).getTime() - new Date(date).getTime()) / 1000 / 60 / 60 / 24;
        currentAge = Math.round(currentAge / 365);

        if (date.length === 0) {
            setDateError(true);
        } else if (currentAge < limit) {
            setDateErrorMessage('Возраст пользователя меньше 16');
        } else {
            setDateErrorMessage('');
        }

        // validation for login
        const reLogin = /^[0-9a-zA-Z]+$/;
        const validLogin = reLogin.test(login);

        if (login.length === 0) {
            setLoginError(true);
        } else if (!validLogin) {
            setLoginErrorMessage('Недопустимый формат логина');
        } else {
            setLoginErrorMessage('');
        }

        // validation for password
        const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
        const validPassword = rePassword.test(password);

        if (password.length === 0) {
            setPasswordError(true);
        } else if (!validPassword) {
            setPasswordErrorMessage('Неправильный формат пароля');
        } else if (password.length < 6) {
            setPasswordErrorMessage('Пароль не должен быть менее 6 символов');
        } else {
            setPasswordErrorMessage('');
        }

        // validation for repeat password
        const validRepeatPassword = password === repeatPassword;
        if (repeatPassword.length === 0) {
            setRepeatPasswordError(true);
        } else if (password !== repeatPassword) {
            setRepeatPasswordErrorMessage('Пароль введен не верно!');
        } else {
            setRepeatPasswordErrorMessage('');
        }

        if (validName && validSurname && validEmail && (limit === currentAge) && validLogin && validPassword && validRepeatPassword) {
            setFormValid(true);
            setFormValidMessage('Success!');
            console.log('Success');
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className='register-form'>

                <input
                    value={name}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    name="name"
                    className={nameError ? 'warn' : 'test'}
                />
                {(nameError && nameErrorMessage &&
                    <div className="error-message">{nameErrorMessage}</div>)}

                <input
                    value={surname}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => setSurname(e.target.value)}
                    type="text"
                    placeholder="Surname"
                    name="surname"
                />
                {(surnameError && surnameErrorMessage &&
                    <div className="error-message">{surnameErrorMessage}</div>)}

                <input
                    value={email}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                {(emailError && emailErrorMessage &&
                    <div className="error-message">{emailErrorMessage}</div>)}

                <input
                    value={date}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    name="date"
                />
                {(dateError && dateErrorMessage &&
                    <div className="error-message">{dateErrorMessage}</div>)}

                <input
                    value={login}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => setLogin(e.target.value)}
                    type="text"
                    placeholder="Login"
                    name="login"
                />
                {(loginError && loginErrorMessage &&
                    <div className="error-message">{loginErrorMessage}</div>)}

                <input
                    value={password}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    name="password"
                />
                {(passwordError && passwordErrorMessage &&
                    <div className="error-message">{passwordErrorMessage}</div>)}

                <input
                    onBlur={(e) => blurHandler(e)}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    type="password"
                    placeholder="Repeat Password"
                    name="repeatPassword"
                />
                {(repeatPasswordError && repeatPasswordErrorMessage &&
                    <div className="error-message">{repeatPasswordErrorMessage}</div>)}

                <button type='submit' className="btn">Register</button>
                {formValid && <div className="success-message">{formValidMessage}</div>}
            </form>
        </div>
    );
}

export default App;
