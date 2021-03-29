import React, {useState, useEffect} from "react";
import {
    reName,
    reSurname,
    reEmail,
    limit,
    dateNow,
    reLogin,
    rePassword
} from '../../helpers/helpers';

export const Form = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [surnameErrorMessage, setSurnameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [dateErrorMessage, setDateErrorMessage] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState('');

    const [formValid, setFormValid] = useState(false);
    const [formValidMessage, setFormValidMessage] = useState('');

    const validName = reName.test(name);
    const validSurname = reSurname.test(surname);
    const validEmail = reEmail.test(email);
    let currentAge = (new Date(dateNow).getTime() - new Date(date).getTime()) / 1000 / 60 / 60 / 24;
    currentAge = Math.round(currentAge / 365);
    const validLogin = reLogin.test(login);
    const validPassword = rePassword.test(password);
    const validRepeatPassword = password === repeatPassword;

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                nameHandler(e);
                break;
            case 'surname':
                surnameHandler(e);
                break;
            case 'email':
                emailHandler(e);
                break;
            case 'date':
                dateHandler(e);
                break;
            case 'login':
                loginHandler(e);
                break;
            case 'password':
                passwordHandler(e);
                break;
            case 'repeatPassword':
                repeatPasswordHandler(e);
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        nameHandler();
        surnameHandler();
        emailHandler();
        dateHandler();
        loginHandler();
        passwordHandler();
        repeatPasswordHandler();

        setFormValid(validName && validSurname && validEmail && (limit <= currentAge) && validLogin && validPassword && validRepeatPassword);

        if (formValid) {
            setFormValidMessage('Регистрация прошла успешно!');
        } else {
            setFormValidMessage('Не все поля заполнены верно!')
        }
    }

    const nameHandler = () => {
        if (!name.length) {
            setNameErrorMessage('Имя не может быть пустым');
        } else if (!validName) {
            setNameErrorMessage('Некоректное имя');
        } else {
            setNameErrorMessage('');
        }
    }

    useEffect(() => {
        if (name) {
            nameHandler();
        }
    }, [name, nameHandler]);

    const surnameHandler = () => {
        if (!surname.length) {
            setSurnameErrorMessage('Фамилия не может быть пустой');
        } else if (!validSurname) {
            setSurnameErrorMessage('Некоректная фамилия');
        } else {
            setSurnameErrorMessage('');
        }
    }

    useEffect(() => {
        if (surname) {
            surnameHandler();
        }
    }, [surname, surnameHandler]);

    const emailHandler = () => {
        if (!email.length) {
            setEmailErrorMessage('Почта не может быть пустой!');
        } else if (!validEmail) {
            setEmailErrorMessage('Недопустимый формат почты');
        } else {
            setEmailErrorMessage('');
        }
    }

    useEffect(() => {
        if (email) {
            emailHandler();
        }
    }, [email, emailHandler]);

    const dateHandler = () => {
        if (!date.length) {
            setDateErrorMessage('Дата не может быть пустой!');
        } else if (currentAge < limit) {
            setDateErrorMessage('Возраст пользователя меньше 16');
        } else {
            setDateErrorMessage('');
        }
    }

    useEffect(() => {
        if (date) {
            dateHandler();
        }
    }, [date, dateHandler]);

    const loginHandler = () => {
        if (!login.length) {
            setLoginErrorMessage('Логин не может быть пустым!');
        } else if (!validLogin) {
            setLoginErrorMessage('Недопустимый формат логина');
        } else {
            setLoginErrorMessage('');
        }
    }

    useEffect(() => {
        if (login) {
            loginHandler();
        }
    }, [login, loginHandler]);

    const passwordHandler = () => {
        if (!password.length) {
            setPasswordErrorMessage('Пароль не может быть пустым!');
        } else if (!validPassword) {
            setPasswordErrorMessage('Неправильный формат пароля');
        } else if (password.length < 6) {
            setPasswordErrorMessage('Пароль не должен быть менее 6 символов');
        } else {
            setPasswordErrorMessage('');
        }
    }

    useEffect(() => {
        if (password) {
            passwordHandler();
        }
    }, [password, passwordHandler]);

    const repeatPasswordHandler = () => {
        if (!repeatPassword.length) {
            setRepeatPasswordErrorMessage('Повторите пароль!');
        } else if (password !== repeatPassword) {
            setRepeatPasswordErrorMessage('Пароль введен не верно!');
        } else {
            setRepeatPasswordErrorMessage('');
        }
    }

    useEffect(() => {
        if (repeatPassword) {
            repeatPasswordHandler();
        }
    }, [repeatPassword, repeatPasswordHandler]);

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className='register-form'>
                <label htmlFor='firstName'>First Name</label>
                    <input
                        value={name}
                        onBlur={(e) => blurHandler(e)}
                        onChange={(e) => {
                            setName(e.target.value);
                            nameHandler();
                        }}
                        type="text"
                        placeholder="John"
                        name="name"
                        id="firstName"
                        className={`input ${nameErrorMessage ? 'input-error' : ''}`}
                        // autoComplete='off'
                    />
                {nameErrorMessage && <div className="error-message">{nameErrorMessage}</div>}

                <label htmlFor="lastName">Last Name</label>
                    <input
                        value={surname}
                        onBlur={(e) => blurHandler(e)}
                        onChange={(e) => {
                            setSurname(e.target.value);
                            surnameHandler();
                        }}
                        className={`input ${surnameErrorMessage ? 'input-error' : ''}`}
                        type="text"
                        id="lastName"
                        placeholder="Doe"
                        name="surname"
                    />
                {surnameErrorMessage && <div className="error-message">{surnameErrorMessage}</div>}

                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        emailHandler();
                    }}
                    type="text"
                    placeholder="john.doe@gmail.com"
                    name="email"
                    id="email"
                    className={`input ${emailErrorMessage ? 'input-error' : ''}`}
                />
                {emailErrorMessage && <div className="error-message">{emailErrorMessage}</div>}

                <label htmlFor="dateBirth">Date of birth</label>
                <input
                    value={date}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => {
                        setDate(e.target.value);
                        dateHandler();
                    }}
                    type="date"
                    name="date"
                    id='dateBirth'
                    className={`input ${dateErrorMessage ? 'input-error' : ''}`}
                />
                {dateErrorMessage && <div className="error-message">{dateErrorMessage}</div>}

                <label htmlFor="login">Login</label>
                <input
                    value={login}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => {
                        setLogin(e.target.value);
                        loginHandler();
                    }}
                    type="text"
                    placeholder="Login"
                    name="login"
                    id='login'
                    className={`input ${loginErrorMessage ? 'input-error' : ''}`}
                />
                {loginErrorMessage && <div className="error-message">{loginErrorMessage}</div>}

                <label htmlFor="pass">Password</label>
                <input
                    value={password}
                    onBlur={(e) => blurHandler(e)}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        passwordHandler();
                    }}
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="pass"
                    className={`input ${passwordErrorMessage ? 'input-error' : ''}`}
                />
                {passwordErrorMessage && <div className="error-message">{passwordErrorMessage}</div>}

                <label htmlFor="repeatPass">Repeat password</label>
                <input
                    onBlur={(e) => blurHandler(e)}
                    value={repeatPassword}
                    onChange={(e) => {
                        setRepeatPassword(e.target.value);
                        repeatPasswordHandler();
                    }}
                    type="password"
                    placeholder="Repeat password"
                    name="repeatPassword"
                    id="repeatPass"
                    className={`input ${repeatPasswordErrorMessage ? 'input-error' : 'input'}`}
                />
                {repeatPasswordErrorMessage && <div className="error-message">{repeatPasswordErrorMessage}</div>}

                <button type='submit' className="btn">Register</button>
                {formValidMessage && (
                    <div
                        className={`${formValid ? 'success-form' : 'error-form'}`}
                    >
                        {formValidMessage}
                    </div>
                )}
            </form>
        </div>
    );
}
