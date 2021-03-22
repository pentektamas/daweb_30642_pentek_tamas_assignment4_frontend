import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";
import {Col, Row, Button} from 'reactstrap';
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import Chart from 'react-apexcharts';

class DoctorStatistics extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = {
            text: this.englishText,
            currentDoctorName: null,
            days: [],
            appointments: [],
            options: {},
            series: []
        }

        /* kuldom a Date.now() es a Date.now() - 1 year -> ebben az idoszakban megkeresem az osszes appointmentet a
         backend-en es returnolok ugy ahogy a Calendar-nal csinaltam
         aztan csinalok 2 arrayt: egy a datumnak-> ezt megkreamlom mindenkepp
         egy az appointmentnek -> ezt is megkrealom es init az osszes poziciot 0-val
         aztan egy for-ral vegigmegyek az egesz datumon es ahol van match a backendes datumokkal
         ott incrementalom az appointment-es arrayt
         ezt lehet hogy a legjobb lenne a backenden megcsinalni es csak siman return-olni a ket arrayt (datumArray, appointmentValueArray)
 */
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

    setStatisticsChart() {
        this.setState({
            options: {
                chart: {
                    id: 'apexchart-example',
                    toolbar: {show: false},
                },
                xaxis: {
                    categories: this.state.days,
                    labels: {
                        style: {
                            colors: "#ffffff",
                            fontSize: '14px',
                        },
                    }

                },
                yaxis: {
                    labels: {
                        style: {
                            colors: "#ffffff",
                            fontSize: '14px',
                        },
                    }

                },
                tooltip: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                    enabled: false,
                },

                colors: ["#267257"],
            }, series: [{
                name: 'series',
                data: this.state.appointments,
            }]
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
                    this.getAppointmentsFromPeriod();
                }
            })
            .catch(function (err) {
                console.log(err);
                alert("Something went wrong!");
            });
    }

    getAppointmentsFromPeriod() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let mm2 = today.getMonth();
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
            mm2 = '0' + mm2;
        }
        let minimDate = yyyy + "-" + mm2 + "-" + dd;
        let maximDate = yyyy + "-" + mm + "-" + dd;
        let period = {
            minim: minimDate,
            maxim: maximDate,
            doctor: this.state.currentDoctorName,
        }

        let request = new Request("http://localhost:8000/api/auth/appointmentsPeriod", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(period)
        });
        console.log("URL: " + request.url);

        fetch(request)
            .then(response => response.json())
            .then(data => {
                this.setState({days: data.dates, appointments: data.appointments});
                this.setStatisticsChart();
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
                    <h2>{this.state.text.STATISTICS}</h2>

                    <Chart className="chart"
                           options={this.state.options}
                           series={this.state.series}
                           type="bar"
                    />

                </div>

            </div>
        )
    }
}

export default withRouter(DoctorStatistics)