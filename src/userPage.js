import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";
import {FormGroup, Label, Input, Col, Row, Button} from 'reactstrap';
import validate from "./validators/validator";
import Select from "react-select";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = {
            text: this.englishText,
            errorStatus: 0,
            error: null,
            selectedOption: null,

            formIsValid: true,

            currentUser: null,

            formControls: {
                name: {
                    value: "",
                    placeholder: 'Your name',
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                },
                email: {
                    value: "",
                    placeholder: 'Your email address',
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                },
                username: {
                    value: "",
                    placeholder: 'Your username',
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                },
                password: {
                    value: "",
                    placeholder: 'Enter the new password if you want to change',
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        isRequired: true
                    }
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSel = this.handleChangeSel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    options = [];


    englishText = {
        "USERBTN": "User page",
        "APPOINTMENT": "Make an appointment",
        "INFO": "User information",
        "NAME": "Name",
        "USERNAME": "Username",
        "PASSWORD": "Password",
        "SERVICES": "Medical services",
        "SERVICE1": "Consultation",
        "SERVICE2": "Ultrasonic descaling",
        "SERVICE3": "One-sided fillings",
        "SERVICE4": "Tooth whitening",
        "SERVICE5": "Unclogging the channels",
        "SERVICE6": "Pluriradicular extraction",
        "SERVICE7": "Cr-Ni metal crown",
        "SERVICE8": "Total / partial acrylic prosthesis",
        "SERVICE9": "Addition of tooth on acrylic prosthesis",
        "SERVICE10": "Dental implant with zirconium-ceramic crown",
    }

    romanianText = {
        "USERBTN": "Pagina utilizatorului",
        "APPOINTMENT": "Programare",
        "INFO": "Informații despre utilizator",
        "NAME": "Nume",
        "USERNAME": "Nume de utilizator",
        "PASSWORD": "Parola",
        "SERVICES": "Servicii medicale"
    }

    componentDidMount() {
        if (sessionStorage.getItem("token") === null || sessionStorage.getItem("isDoctor") === "1") {
            this.props.history.push("/error");
        } else {
            this.fetchUserInfo();
            if (this.language === "RO") {
                this.setState({text: this.romanianText});
            } else {
                this.setState({text: this.englishText});
            }
            this.options = [
                {label: this.state.text.SERVICE1, value: this.state.text.SERVICE1},
                {label: this.state.text.SERVICE2, value: this.state.text.SERVICE2},
                {label: this.state.text.SERVICE3, value: this.state.text.SERVICE3},
                {label: this.state.text.SERVICE4, value: this.state.text.SERVICE4},
                {label: this.state.text.SERVICE5, value: this.state.text.SERVICE5},
                {label: this.state.text.SERVICE6, value: this.state.text.SERVICE6},
                {label: this.state.text.SERVICE7, value: this.state.text.SERVICE7},
                {label: this.state.text.SERVICE8, value: this.state.text.SERVICE8},
                {label: this.state.text.SERVICE9, value: this.state.text.SERVICE9},
                {label: this.state.text.SERVICE10, value: this.state.text.SERVICE10},
            ];
        }
    }

    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const formControls = this.state.formControls;
        const formElement = formControls[name];
        formElement.value = value;
        formElement.touched = true;
        formElement.valid = validate(value, formElement.validationRules);
        formControls[name] = formElement;

        let formIsValid = true;
        for (let updatedFormElementName in formControls) {
            if (updatedFormElementName !== "password")
                formIsValid = formControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: formControls,
            formIsValid: formIsValid
        });
    };

    handleSubmit() {
        let userInfo = this.state.currentUser;
        userInfo.name = document.getElementById("nameField").value;
        userInfo.email = document.getElementById("emailField").value;
        userInfo.username = document.getElementById("usernameField").value;
        if (document.getElementById("uploadedFile").files[0] !== undefined) {
            const formData = new FormData();
            formData.append('gdpr File', document.getElementById("uploadedFile").files[0]);
            userInfo.gdpr = formData;
        }

        if (this.state.formControls.password.value !== "") {
            userInfo.password = document.getElementById("passwordField").value;
        } else {
            userInfo.password = null;
        }

        userInfo.medicalServices = "";
        for (let i = 0; i < this.state.selectedOption.length; i++) {
            userInfo.medicalServices += this.state.selectedOption[i].label + ","
        }
        document.getElementById("passwordField").value = "";
        this.updateUserInfo(userInfo);
    }

    handleChangeSel = selectedOption => {
        this.setState(
            {selectedOption},
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    updateUserInfo(userInfo) {
        let request = new Request('http://localhost:8000/api/auth/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify(userInfo)
        });

        console.log("URL: " + request.url);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                alert("User information updated successfully!");
            })
            .catch(function (err) {
                console.log(err);
                alert("Something went wrong!");
            });
    }

    handleLogout() {
        let request = new Request("http://localhost:8000/api/auth/logout", {
            method: 'GET',
            headers: new Headers({'Authorization': 'Bearer ' + sessionStorage.getItem('token')})
        });

        console.log("URL: " + request.url);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                sessionStorage.clear();
                this.props.history.push("/");
            })
            .catch(function (err) {
                console.log(err);
                alert("Something went wrong!");
            });
    }

    fetchUserInfo() {
        let request = new Request("http://localhost:8000/api/auth/user", {
            method: 'GET',
            headers: new Headers({'Authorization': 'Bearer ' + sessionStorage.getItem('token')})
        });

        console.log("URL: " + request.url);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                this.setState({currentUser: data});
                sessionStorage.setItem("currentUserID", this.state.currentUser.id);
                document.getElementById("nameField").value = data.name;
                document.getElementById("emailField").value = data.email;
                document.getElementById("usernameField").value = data.username;
                document.getElementById("uploadedFile").value = "";


                if (data.medicalServices !== null) {
                    const chars = data.medicalServices.split(",");
                    let options = [];
                    for (let i = 0; i < chars.length - 1; i++) {
                        options.push({label: chars[i], value: chars[i]});
                    }
                    this.setState({selectedOption: options});
                }
            })
            .catch(function (err) {
                console.log(err);
                alert("Something went wrong!");
            });
    }

    render() {
        return (
            <div className="page">
                <NavBar/>
                <Row>
                    <Col>
                        <Button className="userButton" type={"submit"} disabled={false}>
                            <Link className="link" to="/userPage">{this.state.text.USERBTN}</Link></Button>

                        <Button className="userButton" type={"submit"} disabled={false}>
                            <Link className="link" to="/appointment">{this.state.text.APPOINTMENT}</Link></Button>

                        <Button className="userButton"
                                type={"submit"}
                                disabled={false}
                                onClick={this.handleLogout}>Logout</Button>
                    </Col>
                </Row>

                <div className="contactForm">
                    <h2>{this.state.text.INFO}</h2>
                    <FormGroup id='name'>
                        <Label className="formLabel" for='nameField'>{this.state.text.NAME}</Label>
                        <Input name="name" id='nameField' placeholder={this.state.formControls.name.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.name.value}
                               touched={this.state.formControls.name.touched ? 1 : 0}
                               valid={this.state.formControls.name.valid}
                               required
                               size={50}
                        />
                        {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                        <div className={"error-message"}> * Name must have at least 4 characters </div>}
                    </FormGroup>

                    <FormGroup id='email'>
                        <Label className="formLabel" for='emailField'>Email</Label>
                        <Input name="email" id='emailField' placeholder={this.state.formControls.email.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.email.value}
                               touched={this.state.formControls.email.touched ? 1 : 0}
                               valid={this.state.formControls.email.valid}
                               required
                               size={50}
                        />
                        {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                        <div className={"error-message"}> * Email address must have at least 4 characters </div>}
                    </FormGroup>

                    <FormGroup id='username'>
                        <Label className="formLabel" for='usernameField'>{this.state.text.USERNAME}</Label>
                        <Input name="username" id='usernameField'
                               placeholder={this.state.formControls.username.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.username.value}
                               touched={this.state.formControls.username.touched ? 1 : 0}
                               valid={this.state.formControls.username.valid}
                               required
                               size={50}
                        />
                        {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                        <div className={"error-message"}> * Subject must have at least 4 characters </div>}
                    </FormGroup>

                    <FormGroup id='password'>
                        <Label className="formLabel" for='passwordField'>{this.state.text.PASSWORD}</Label>
                        <Input name="password" id='passwordField'
                               type="password"
                               placeholder={this.state.formControls.password.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.password.value}
                               touched={this.state.formControls.password.touched ? 1 : 0}
                               valid={this.state.formControls.password.valid}
                               required
                        />
                        {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                        <div className={"error-message"}> * Request must have at least 4 characters </div>}
                    </FormGroup>


                    <FormGroup>
                        <Label className="formLabelSelect" for='medicalField'>{this.state.text.SERVICES}</Label>
                        <Select placeholder="Medical services" isMulti={true} options={this.options}
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSel}/>
                    </FormGroup>

                    <FormGroup>
                        <Label className="formLabel" for='GDPRField'>GDPR document</Label>
                        <Input type="file" id="uploadedFile" accept=".pdf,.html"/>
                    </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 5}}>
                            <Button id="formButton" type={"submit"} disabled={!this.state.formIsValid}
                                    onClick={this.handleSubmit}>Save</Button>
                        </Col>
                    </Row>

                </div>

            </div>
        )
    }
}

export default withRouter(UserPage)