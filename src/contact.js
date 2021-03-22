import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";
import {FormGroup, Label, Input, Col, Row, Button} from 'reactstrap';
import validate from "./validators/validator";

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = {
            text: this.englishText,
            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                name: {
                    value: "",
                    placeholder: 'Your name',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                email: {
                    value: "",
                    placeholder: 'Your email address',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                subject: {
                    value: "",
                    placeholder: 'Your subject',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                message: {
                    value: "",
                    placeholder: 'Your message',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 10,
                        isRequired: true
                    }
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    englishText = {
        "CONTACT": "Contact us",
        "ADDRESS": "45 Donath Street, Cluj-Napoca 400000",
        "FORMNAME": "Your name",
        "FORMEMAIL": "Your email",
        "FORMSUBJECT": "Your subject",
        "FORMMESSAGE": "Your message",
        "FORM": "Contact form"
    }

    romanianText = {
        "CONTACT": "Contactați-ne",
        "ADDRESS": "Strada Donath 45, Cluj-Napoca 400000",
        "FORMNAME": "Numele tău",
        "FORMEMAIL": "Email-ul tău",
        "FORMSUBJECT": "Subiectul tău",
        "FORMMESSAGE": "Mesajul tău",
        "FORM": "Formular de contact"
    }

    componentDidMount() {
        if (this.language === "RO") {
            this.setState({text: this.romanianText});
        } else {
            this.setState({text: this.englishText});
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
            formIsValid = formControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: formControls,
            formIsValid: formIsValid
        });
    };

    handleSubmit() {
        let emailForm = {
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            subject: this.state.formControls.subject.value,
            message: this.state.formControls.message.value
        };
        this.sendEmailForm(emailForm);
    }

    sendEmailForm(emailForm) {
        let request = new Request('http://localhost:5000/contactUsEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailForm)
        });

        console.log("URL: " + request.url);
        fetch(request)
            .then(function () {
                document.getElementById("nameField").value = "";
                document.getElementById("emailField").value = "";
                document.getElementById("subjectField").value = "";
                document.getElementById("messageField").value = "";
                alert("The message was sent!");
            })
            .catch(function (err) {
                alert("Invalid email address!")
            });
    }

    render() {
        return (
            <div className="page">
                <NavBar/>

                <h1>{this.state.text.CONTACT}</h1><br/>

                <h2><span role="img" aria-label="phone"> &#128383; </span> +40 769 458 123</h2>

                <h2><span role="img" aria-label="email">&#128231;</span> info@dentaweb.com</h2>

                <h2><span role="img" aria-label="pin">&#128205;</span>{this.state.text.ADDRESS}</h2>

                <iframe className="contactMap" title="maps"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.701365966514!2d23.549534115477442!3d46.77078257913818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490ef6a99a4fc5%3A0x2c8a0582a489eb!2sStr.%20Donath%2045%2C%20Cluj-Napoca%20400000!5e0!3m2!1shu!2sro!4v1615139792413!5m2!1shu!2sro"
                        width="600" height="450" allowFullScreen loading="lazy"/>


                <div className="contactForm">
                    <h2>{this.state.text.FORM}</h2>
                    <FormGroup id='name'>
                        <Label className="formLabel" for='nameField'>{this.state.text.FORMNAME}</Label>
                        <Input name="name" id='nameField' placeholder={this.state.formControls.name.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.name.value}
                               touched={this.state.formControls.name.touched ? 1 : 0}
                               valid={this.state.formControls.name.valid}
                               required
                               size={50}
                        />
                        {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                        <div className={"error-message"}> * Name must have at least 3 characters </div>}
                    </FormGroup>

                    <FormGroup id='email'>
                        <Label className="formLabel" for='emailField'>{this.state.text.FORMEMAIL}</Label>
                        <Input name="email" id='emailField' placeholder={this.state.formControls.email.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.email.value}
                               touched={this.state.formControls.email.touched ? 1 : 0}
                               valid={this.state.formControls.email.valid}
                               required
                               size={50}
                        />
                        {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                        <div className={"error-message"}> * Email address must have at least 3 characters </div>}
                    </FormGroup>

                    <FormGroup id='subject'>
                        <Label className="formLabel" for='subjectField'>{this.state.text.FORMSUBJECT}</Label>
                        <Input name="subject" id='subjectField'
                               placeholder={this.state.formControls.subject.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.subject.value}
                               touched={this.state.formControls.subject.touched ? 1 : 0}
                               valid={this.state.formControls.subject.valid}
                               required
                               size={50}
                        />
                        {this.state.formControls.subject.touched && !this.state.formControls.subject.valid &&
                        <div className={"error-message"}> * Subject must have at least 3 characters </div>}
                    </FormGroup>

                    <FormGroup id='message'>
                        <Label className="formLabel" for='messageField'>{this.state.text.FORMMESSAGE}</Label>
                        <Input name="message" id='messageField'
                               placeholder={this.state.formControls.message.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.message.value}
                               touched={this.state.formControls.message.touched ? 1 : 0}
                               valid={this.state.formControls.message.valid}
                               required
                        />
                        {this.state.formControls.message.touched && !this.state.formControls.message.valid &&
                        <div className={"error-message"}> * Request must have at least 10 characters </div>}
                    </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 5}}>
                            <Button id="formButton" type={"submit"} disabled={!this.state.formIsValid}
                                    onClick={this.handleSubmit}>Send </Button>
                        </Col>
                    </Row>

                </div>

            </div>
        )
    }
}

export default Contact