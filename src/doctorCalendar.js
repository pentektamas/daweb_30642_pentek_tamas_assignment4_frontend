import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";
import {Col, Row, Button} from 'reactstrap';
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

class DoctorCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = {
            text: this.englishText,
            currentDoctorName: null,
            events: [{
                title: null,
                start: null,
                end: null
            }]
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    englishText = {
        "CALENDAR": "Calendar",
        "STATISTICS": "Statistics",
        "INFO": "User information",
        "NAME": "Name",
        "USERNAME": "Username",
        "PASSWORD": "Password",
    }

    romanianText = {
        "CALENDAR": "Calendar",
        "STATISTICS": "Statistici",
        "INFO": "Informații despre utilizator",
        "NAME": "Nume",
        "USERNAME": "Nume de utilizator",
        "PASSWORD": "Parola",
        "SERVICES": "Servicii medicale"
    }

    localizer = momentLocalizer(moment);


    componentDidMount() {
        if (sessionStorage.getItem("token") === null || sessionStorage.getItem("isDoctor") === "0") {
            this.props.history.push("/error");
        } else {
            this.fillCalendar();
            if (this.language === "RO") {
                this.setState({text: this.romanianText});
            } else {
                this.setState({text: this.englishText});
            }
        }
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

    fillCalendar() {
        let request = new Request("http://localhost:8000/api/auth/user", {
            method: 'GET',
            headers: new Headers({'Authorization': 'Bearer ' + sessionStorage.getItem('token')}),
        });

        console.log("URL: " + request.url);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                if (data.isDoctor === 0) {
                    this.props.history.push("/error");
                } else {
                    this.setState({currentDoctorName: data.name});
                    this.getDoctorAppointments();
                }
            })
            .catch(function (err) {
                console.log(err);
                alert("Something went wrong!");
            });
    }

    getDoctorAppointments() {
        let doctor = {
            name: this.state.currentDoctorName
        };
        let request = new Request("http://localhost:8000/api/auth/doctorAppointments", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctor)
        });

        console.log("URL: " + request.url);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                let events = [];
                for (let i = 0; i < data.dates.length; i++) {
                    let appointment = Date.parse(data.dates[i].date + " " + data.dates[i].time);
                    let event = {
                        title: data.patients[i][0].name,
                        start: appointment,
                        end: appointment
                    };
                    events.push(event);
                }
                this.setState({events: events});
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
                            <Link className="link" to="/doctorCalendar">{this.state.text.CALENDAR}</Link></Button>

                        <Button className="userButton" type={"submit"} disabled={false}>
                            <Link className="link" to="/doctorStatistics">{this.state.text.STATISTICS}</Link></Button>

                        <Button className="userButton"
                                type={"submit"}
                                disabled={false}
                                onClick={this.handleLogout}>Logout</Button>
                    </Col>
                </Row>

                <div className="calendarDiv">
                    <h2>{this.state.text.CALENDAR}</h2>

                    <Calendar className="rbc-calendar"
                              localizer={this.localizer}
                              events={this.state.events}
                              startAccessor="start"
                              endAccessor="end"
                              style={{height: 500}}
                    />

                </div>

            </div>
        )
    }
}

export default withRouter(DoctorCalendar)