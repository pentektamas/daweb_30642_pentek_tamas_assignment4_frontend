import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";
import {FormGroup, Label, Input, Col, Row, Button} from 'reactstrap';
import validate from "./validators/validator";
import Select from "react-select";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";

class Appointment extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = {
            text: this.englishText,
            errorStatus: 0,
            error: null,
            selectedDoctor: null,
            selectedTime: null,
            formIsValid: false,
            today: "",

            formControls: {
                date: {
                    value: "",
                    placeholder: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 10,
                        isRequired: true
                    }
                },
                doctor: {
                    value: null,
                    placeholder: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                time: {
                    value: null,
                    placeholder: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDoctor = this.handleChangeDoctor.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    doctorOptions = [
        {label: "Popescu Mihai", value: "Popescu Mihai",},
        {label: "Ionescu Andreea", value: "Ionescu Andreea"},
        {label: "Pop Cosmin", value: "Pop Cosmin"},
        {label: "Stanciu Carmen", value: "Stanciu Carmen"},
        {label: "Mureșan Ștefan", value: "Mureșan Ștefan"},
    ];

    timeOptions = [
        {label: "08:00", value: "08:00",},
        {label: "09:00", value: "09:00"},
        {label: "10:00", value: "10:00"},
        {label: "11:00", value: "11:00"},
        {label: "12:00", value: "12:00"},
        {label: "13:00", value: "13:00"},
        {label: "14:00", value: "14:00"},
        {label: "15:00", value: "15:00"},
        {label: "16:00", value: "16:00"},
    ];

    englishText = {
        "USERBTN": "User page",
        "APPOINTMENT": "Make an appointment",
        "DATE": "Date",
        "TIME": "Time",
    }

    romanianText = {
        "USERBTN": "Pagina utilizatorului",
        "APPOINTMENT": "Programare",
        "DATE": "Data",
        "TIME": "Ora",
    }

    componentDidMount() {
        if (sessionStorage.getItem("token") === null || sessionStorage.getItem("isDoctor") === "1") {
            this.props.history.push("/error");
        } else {
            if (this.language === "RO") {
                this.setState({text: this.romanianText});
            } else {
                this.setState({text: this.englishText});
            }
            let today = new Date();
            let dd = today.getDate() + 1;
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            let minimDate = yyyy + "-" + mm + "-" + dd;
            this.setState({today: minimDate});
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

    handleSubmit() {
        let appointment = {
            doctor: this.state.selectedDoctor.value,
            date: this.state.formControls.date.value,
            time: this.state.selectedTime.value,
            userID: sessionStorage.getItem("currentUserID")
        };
        this.postAppointment(appointment);
    }

    postAppointment(appointment) {
        let request = new Request('http://localhost:8000/api/auth/appointment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify(appointment)
        });

        console.log("URL: " + request.url);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                if (data.inserted === true) {
                    document.getElementById("dateField").value = "";
                    let currentFormControl = this.state.formControls;
                    currentFormControl.date.valid = false;
                    currentFormControl.time.valid = false;
                    currentFormControl.doctor.valid = false;
                    currentFormControl.date.touched = false;
                    currentFormControl.time.touched = false;
                    currentFormControl.doctor.touched = false;
                    this.setState({
                        selectedDoctor: null,
                        selectedTime: null,
                        formIsValid: false,
                        formControls: currentFormControl
                    });
                    alert("Appointment created successfully!");
                }
            })
            .catch(function (err) {
                console.log(err);
                alert("Something went wrong!");
            });
    }

    handleChangeDoctor = selectedDoctor => {
        this.setState({selectedDoctor});
        const formControls = this.state.formControls;
        const formElement = formControls.doctor;
        formElement.value = selectedDoctor.value;
        formElement.touched = true;
        formElement.valid = validate(selectedDoctor.value, formElement.validationRules);
        formControls.doctor = formElement;
        this.setState({
            formControls: formControls,
            formIsValid: this.state.formControls.doctor.valid && this.state.formControls.date.valid
                && this.state.formControls.time.valid
        });

    };

    handleChangeTime = selectedTime => {
        this.setState({selectedTime});
        const formControls = this.state.formControls;
        const formElement = formControls.time;
        formElement.value = selectedTime.value;
        formElement.touched = true;
        formElement.valid = validate(selectedTime.value, formElement.validationRules);
        formControls.time = formElement;
        this.setState({
            formControls: formControls,
            formIsValid: this.state.formControls.doctor.valid && this.state.formControls.date.valid
                && this.state.formControls.time.valid
        });
    };

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
                    <h2>{this.state.text.APPOINTMENT}</h2>

                    <FormGroup>
                        <Label className="formLabelSelect" for='doctorField'>Doctor</Label>
                        <Select placeholder="Select a doctor" isMulti={false} options={this.doctorOptions}
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeDoctor} required/>
                        {this.state.formControls.doctor.touched && !this.state.formControls.doctor.valid &&
                        <div className={"error-message"}> * Please select a doctor </div>}
                    </FormGroup>

                    <FormGroup id='date'>
                        <Label className="formLabel" for='dateField'>{this.state.text.DATE}</Label>
                        <Input name="date" id='dateField' placeholder={this.state.formControls.date.placeholder}
                               onChange={this.handleChange}
                               type="date"
                               min={this.state.today}
                               defaultValue={this.state.formControls.date.value}
                               touched={this.state.formControls.date.touched ? 1 : 0}
                               valid={this.state.formControls.date.valid}
                               required
                        />
                        {this.state.formControls.date.touched && !this.state.formControls.date.valid &&
                        <div className={"error-message"}> * Please select a date </div>}
                    </FormGroup>

                    <FormGroup>
                        <Label className="formLabelSelect" for='timeField'>{this.state.text.TIME}</Label>
                        <Select placeholder="Select the time" isMulti={false} options={this.timeOptions}
                                value={this.state.selectedTime}
                                onChange={this.handleChangeTime}/>
                        {this.state.formControls.time.touched && !this.state.formControls.time.valid &&
                        <div className={"error-message"}> * Please select a time </div>}
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

export default withRouter(Appointment)
