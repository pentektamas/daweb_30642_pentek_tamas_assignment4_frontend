import React from 'react';
import "./styles/styles.css"
import {Button, Modal, ModalBody, ModalHeader, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import validate from "./validators/validator";
import {withRouter} from "react-router-dom";

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = {
            text: this.englishText,
            isLogin: false,
            isSignup: false,
            formIsValid: false,

            loginFormControls: {
                username: {
                    value: "",
                    placeholder: 'Username',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                },
                password: {
                    value: "",
                    placeholder: 'Password',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                },
            },
            signupFormControls: {
                SUusername: {
                    value: "",
                    placeholder: 'Username',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                },
                SUpassword: {
                    value: "",
                    placeholder: 'Password',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                },
                SUname: {
                    value: "",
                    placeholder: 'Name',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                },
                SUemail: {
                    value: "",
                    placeholder: 'Email address',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                },
            },
        };
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.loginHandleChange = this.loginHandleChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    englishText = {
        "HOME": "Home",
        "NEWS": "News",
        "ABOUT": "About Us",
        "DOCTORS": "Doctors",
        "SERVICES": "Services & Rates",
        "CONTACT": "Contact Us",
        "LOGIN": "Login",
        "SIGNUP": "Sign up",
        "USERNAME": "Username",
        "PASSWORD": "Password",
        "NAME": "Name",
    }

    romanianText = {
        "HOME": "Acasă",
        "NEWS": "Noutăți",
        "ABOUT": "Despre Noi",
        "DOCTORS": "Medici",
        "SERVICES": "Servicii & Tarife",
        "CONTACT": "Contact",
        "LOGIN": "Autentificare",
        "SIGNUP": "Înregistrare",
        "USERNAME": "Username",
        "PASSWORD": "Password",
        "NAME": "Name",
    }

    componentDidMount() {
        if (this.language === "RO") {
            this.setState({text: this.romanianText});
        } else {
            this.setState({text: this.englishText});
        }
    }

    changeToEnglish() {
        localStorage.setItem("language", "EN")
        this.setState({text: this.englishText});
        window.location.reload();
    }

    changeToRomanian() {
        localStorage.setItem("language", "RO");
        this.setState({text: this.romanianText});
        window.location.reload();
    }

    toggleLogin() {
        this.setState({isLogin: !this.state.isLogin});
    }

    toggleSignup() {
        this.setState({isSignup: !this.state.isSignup});
    }

    loginHandleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const formControls = this.state.loginFormControls;
        const formElement = formControls[name];
        formElement.value = value;
        formElement.touched = true;
        formElement.valid = validate(value, formElement.validationRules);
        formControls[name] = formElement;

        let formIsValid = true;
        for (let updatedFormElementName in formControls) {
            formIsValid = formControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: formControls,
            formIsValid: formIsValid
        });
    };

    signupHandleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const formControls = this.state.signupFormControls;
        const formElement = formControls[name];
        formElement.value = value;
        formElement.touched = true;
        formElement.valid = validate(value, formElement.validationRules);
        formControls[name] = formElement;

        let formIsValid = true;
        for (let updatedFormElementName in formControls) {
            formIsValid = formControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: formControls,
            formIsValid: formIsValid
        });
    };

    handleSignup() {
        let signupForm = {
            name: this.state.formControls.SUname.value,
            email: this.state.formControls.SUemail.value,
            username: this.state.formControls.SUusername.value,
            password: this.state.formControls.SUpassword.value,
            password_confirmation: this.state.formControls.SUpassword.value
        };
        console.log(signupForm);
        this.doPostRequest(signupForm, 'http://localhost:8000/api/auth/signup', false);

    }

    handleLogin() {
        let loginForm = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
        };
        this.doPostRequest(loginForm, 'http://localhost:8000/api/auth/login', true);
    }

    doPostRequest(form, hostURL, isLogin) {
        let request = new Request(hostURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        });

        console.log("URL: " + request.url);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                if (isLogin) {
                    if (data.message === "Authorized") {
                        sessionStorage.setItem("token", data.access_token);
                        sessionStorage.setItem("isDoctor", data.isDoctor);
                        if (data.isDoctor === 0)
                            this.props.history.push("/userPage");
                        if (data.isDoctor === 1)
                            this.props.history.push("/doctorCalendar");
                    }
                    if (data.message === "Unauthorized") {
                        alert("Invalid username or password!");
                    }
                } else {
                    if (data.message === "Successfully created user!") {
                        alert("User account was created!");
                        window.location.reload();
                    } else {
                        alert("Something went wrong!");
                    }
                }
            })
            .catch(function (err) {
                console.log(err);
                alert("Something went wrong!");
            });
    }

    render() {
        return (
            <div className="nav-bar">
                <ul>
                    <li className="nav-bar-item" id="nav-bar-logo">
                        <a href="/">
                            <img src={require("./images/dentalLogo.jpg")} alt="Denta logo"
                            />
                        </a>
                    </li>
                    <li className="nav-bar-item" id="nav-bar-home">
                        Denta WEB
                    </li>
                    <li className="nav-bar-item">
                        <img className="language" src={require("./images/romanian.jpg")} alt="romanian"
                             onClick={() => this.changeToRomanian()}/>
                    </li>
                    <li className="nav-bar-item">
                        <img className="language" src={require("./images/english.jpg")} alt="english"
                             onClick={() => this.changeToEnglish()}/>
                    </li>
                    <li className="nav-bar-item">
                        <Button onClick={this.toggleLogin}>{this.state.text.LOGIN}</Button>
                    </li>
                    <li className="nav-bar-item">
                        <Button onClick={this.toggleSignup}>{this.state.text.SIGNUP}</Button>
                    </li>
                    <li className="nav-bar-item">
                        <a href="/contactUs">{this.state.text.CONTACT}</a>
                    </li>
                    <li className="nav-bar-item">
                        <a href="/services">{this.state.text.SERVICES}</a>
                    </li>
                    <li className="nav-bar-item">
                        <a href="/doctors">{this.state.text.DOCTORS}</a>
                    </li>
                    <li className="nav-bar-item">
                        <a href="/aboutUs">{this.state.text.ABOUT}</a>
                    </li>
                    <li className="nav-bar-item">
                        <a href="/news">{this.state.text.NEWS}</a>
                    </li>
                    <li className="nav-bar-item">
                        <a href="/">{this.state.text.HOME}</a>
                    </li>
                </ul>

                <Modal isOpen={this.state.isLogin} toggle={this.toggleLogin}
                       className={this.props.className} size="lg">
                    <ModalHeader className="modalHeader" toggle={this.toggleLogin}>Login Page</ModalHeader>
                    <ModalBody className="modalBody">

                        <div className="contactForm">
                            <FormGroup id='username'>
                                <Label className="formLabel" for='usernameField'>{this.state.text.USERNAME}</Label>
                                <Input name="username" id='usernameField'
                                       placeholder={this.state.loginFormControls.username.placeholder}
                                       onChange={this.loginHandleChange}
                                       defaultValue={this.state.loginFormControls.username.value}
                                       touched={this.state.loginFormControls.username.touched ? 1 : 0}
                                       valid={this.state.loginFormControls.username.valid}
                                       required
                                       size={50}
                                />
                                {this.state.loginFormControls.username.touched && !this.state.loginFormControls.username.valid &&
                                <div className={"error-message"}> * Username must have at least 4 characters </div>}
                            </FormGroup>

                            <FormGroup id='password'>
                                <Label className="formLabel" for='passwordField'>{this.state.text.PASSWORD}</Label>
                                <Input name="password" id='passwordField'
                                       type="password"
                                       placeholder={this.state.loginFormControls.password.placeholder}
                                       onChange={this.loginHandleChange}
                                       defaultValue={this.state.loginFormControls.password.value}
                                       touched={this.state.loginFormControls.password.touched ? 1 : 0}
                                       valid={this.state.loginFormControls.password.valid}
                                       required
                                       size={50}
                                />
                                {this.state.loginFormControls.password.touched && !this.state.loginFormControls.password.valid &&
                                <div className={"error-message"}> * Password must have at least 4 characters </div>}
                            </FormGroup>

                            <Row>
                                <Col sm={{size: '4', offset: 5}}>
                                    <Button id="formButton" type={"submit"} disabled={!this.state.formIsValid}
                                            onClick={this.handleLogin}>Login</Button>
                                </Col>
                            </Row>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isSignup} toggle={this.toggleSignup}
                       className={this.props.className} size="lg">
                    <ModalHeader className="modalHeader" toggle={this.toggleSignup}>Signup Page</ModalHeader>
                    <ModalBody className="modalBody">

                        <div className="contactForm">
                            <FormGroup id='SUname'>
                                <Label className="formLabel" for='SUnameField'>{this.state.text.NAME}</Label>
                                <Input name="SUname" id='SUnameField'
                                       placeholder={this.state.signupFormControls.SUname.placeholder}
                                       onChange={this.signupHandleChange}
                                       defaultValue={this.state.signupFormControls.SUname.value}
                                       touched={this.state.signupFormControls.SUname.touched ? 1 : 0}
                                       valid={this.state.signupFormControls.SUname.valid}
                                       required
                                       size={50}
                                />
                                {this.state.signupFormControls.SUname.touched && !this.state.signupFormControls.SUname.valid &&
                                <div className={"error-message"}> * Name must have at least 4 characters </div>}
                            </FormGroup>

                            <FormGroup id='SUemail'>
                                <Label className="formLabel" for='SUemailField'>Email</Label>
                                <Input name="SUemail" id='SUemailField'
                                       placeholder={this.state.signupFormControls.SUemail.placeholder}
                                       onChange={this.signupHandleChange}
                                       defaultValue={this.state.signupFormControls.SUemail.value}
                                       touched={this.state.signupFormControls.SUemail.touched ? 1 : 0}
                                       valid={this.state.signupFormControls.SUemail.valid}
                                       required
                                       size={50}
                                />
                                {this.state.signupFormControls.SUemail.touched && !this.state.signupFormControls.SUemail.valid &&
                                <div className={"error-message"}> * Email must have at least 4 characters </div>}
                            </FormGroup>

                            <FormGroup id='SUusername'>
                                <Label className="formLabel" for='SUusernameField'>{this.state.text.USERNAME}</Label>
                                <Input name="SUusername" id='SUusernameField'
                                       placeholder={this.state.signupFormControls.SUusername.placeholder}
                                       onChange={this.signupHandleChange}
                                       defaultValue={this.state.signupFormControls.SUusername.value}
                                       touched={this.state.signupFormControls.SUusername.touched ? 1 : 0}
                                       valid={this.state.signupFormControls.SUusername.valid}
                                       required
                                       size={50}
                                />
                                {this.state.signupFormControls.SUusername.touched && !this.state.signupFormControls.SUusername.valid &&
                                <div className={"error-message"}> * Username must have at least 4 characters </div>}
                            </FormGroup>

                            <FormGroup id='SUpassword'>
                                <Label className="formLabel" for='SUpasswordField'>{this.state.text.PASSWORD}</Label>
                                <Input name="SUpassword" id='SUpasswordField'
                                       type="password"
                                       placeholder={this.state.signupFormControls.SUpassword.placeholder}
                                       onChange={this.signupHandleChange}
                                       defaultValue={this.state.signupFormControls.SUpassword.value}
                                       touched={this.state.signupFormControls.SUpassword.touched ? 1 : 0}
                                       valid={this.state.signupFormControls.SUpassword.valid}
                                       required
                                       size={50}
                                />
                                {this.state.signupFormControls.SUpassword.touched && !this.state.signupFormControls.SUpassword.valid &&
                                <div className={"error-message"}> * Password must have at least 4 characters </div>}
                            </FormGroup>

                            <Row>
                                <Col sm={{size: '4', offset: 5}}>
                                    <Button id="formButton" type={"submit"} disabled={!this.state.formIsValid}
                                            onClick={this.handleSignup}>Sign up</Button>
                                </Col>
                            </Row>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default withRouter(NavBar)
