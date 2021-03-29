import React, {useState, useEffect} from "react";
import './App.scss';
import './styles/reset.scss';
import {
  reName,
  reSurname,
  reEmail,
  limit,
  dateNow,
  reLogin,
  rePassword
} from "./helpers/helpers";

function App() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [nameErrorMessage, setNameErrorMessage] = useState('');
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

  useEffect(() => {
    setNameError(false);
    if (!name) {
      setNameError(true);
      setNameErrorMessage('Имя не может быть пустым!')
    } else if (!reName.test(name)) {
      setNameError(true);
      setNameErrorMessage('Некорректное имя!')
    } else {
      setNameError(false);
    }
  }, [name]);


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
        // nameHandler(e);
        // setNameError(true);
        break;
      case 'surname':
        surnameHandler(e);
        setSurnameError(true);
        break;
      case 'email':
        emailHandler(e);
        setEmailError(true);
        break;
      case 'date':
        dateHandler(e);
        setDateError(true);
        break;
      case 'login':
        loginHandler(e);
        setLoginError(true);
        break;
      case 'password':
        passwordHandler(e);
        setPasswordError(true);
        break;
      case 'repeatPassword':
        repeatPasswordHandler(e);
        setRepeatPasswordError(true);
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormValid(validName && validSurname && validEmail && (limit <= currentAge) && validLogin && validPassword && validRepeatPassword);

    if (formValid) {
      setFormValidMessage('Success!');
      setFormValidMessage('');
    } else {
      setFormValidMessage('not all field are correct!')
    }
  }

  const nameHandler = (e) => {
    setName(e.target.value || e);

    // if (!name.length) {
    //   setNameError(true);
    //   setNameErrorMessage('Имя не может быть пустым')
    // } else if (!validName) {
    //   setNameErrorMessage('Некоректное имя');
    // } else {
    //   setNameErrorMessage('');
    // }
  }

  const surnameHandler = (e) => {
    setSurname(e.target.value);

    if (!surname.length) {
      setSurnameError(true);
    } else if (!validSurname) {
      setSurnameErrorMessage('Некоректная фамилия');
    } else {
      setSurnameErrorMessage('');
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value);

    if (!email.length) {
      setEmailError(true);
    } else if (!validEmail) {
      setEmailErrorMessage('Недопустимый формат почты');
    } else {
      setEmailErrorMessage('');
    }
  }

  const dateHandler = (e) => {
    setDate(e.target.value);

    if (!date.length) {
      setDateError(true);
    } else if (currentAge < limit) {
      setDateErrorMessage('Возраст пользователя меньше 16');
    } else {
      setDateErrorMessage('');
    }
  }

  const loginHandler = (e) => {
    setLogin(e.target.value);

    if (!login.length) {
      setLoginError(true);
    } else if (!validLogin) {
      setLoginErrorMessage('Недопустимый формат логина');
    } else {
      setLoginErrorMessage('');
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);

    if (!password.length) {
      setPasswordError(true);
    } else if (!validPassword) {
      setPasswordErrorMessage('Неправильный формат пароля');
    } else if (password.length < 6) {
      setPasswordErrorMessage('Пароль не должен быть менее 6 символов');
    } else {
      setPasswordErrorMessage('');
    }
  }

  const repeatPasswordHandler = (e) => {
    setRepeatPassword(e.target.value);

    if (!repeatPassword.length) {
      setRepeatPasswordError(true);
    } else if (password !== repeatPassword) {
      setRepeatPasswordErrorMessage('Пароль введен не верно!');
    } else {
      setRepeatPasswordErrorMessage('');
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className='register-form'>

        <input
          value={name}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => nameHandler(e)}
          type="text"
          placeholder="Name"
          name="name"
          className={nameError ? 'warn' : 'test'}
          autoComplete={'off'}
        />
        {(nameError && nameErrorMessage &&
          <div className="error-message">{nameErrorMessage}</div>)}

        <input
          value={surname}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => surnameHandler(e)}
          type="text"
          placeholder="Surname"
          name="surname"
        />
        {(surnameError && surnameErrorMessage &&
          <div className="error-message">{surnameErrorMessage}</div>)}

        <input
          value={email}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => emailHandler(e)}
          type="text"
          placeholder="Email"
          name="email"
        />
        {(emailError && emailErrorMessage &&
          <div className="error-message">{emailErrorMessage}</div>)}

        <input
          value={date}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => dateHandler(e)}
          type="date"
          name="date"
        />
        {(dateError && dateErrorMessage &&
          <div className="error-message">{dateErrorMessage}</div>)}

        <input
          value={login}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => loginHandler(e)}
          type="text"
          placeholder="Login"
          name="login"
        />
        {(loginError && loginErrorMessage &&
          <div className="error-message">{loginErrorMessage}</div>)}

        <input
          value={password}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => passwordHandler(e)}
          type="password"
          placeholder="Password"
          name="password"
        />
        {(passwordError && passwordErrorMessage &&
          <div className="error-message">{passwordErrorMessage}</div>)}

        <input
          onBlur={(e) => blurHandler(e)}
          value={repeatPassword}
          onChange={(e) => repeatPasswordHandler(e)}
          type="password"
          placeholder="Repeat Password"
          name="repeatPassword"
        />
        {(repeatPasswordError && repeatPasswordErrorMessage &&
          <div className="error-message">{repeatPasswordErrorMessage}</div>)}

        <button type='submit' className="btn">Register</button>
        {formValidMessage && <div className="success-message">{formValidMessage}</div>}
      </form>
    </div>
  );
}

export default App;
