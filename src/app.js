import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ErrorPage from './error-page';
import Home from "./home";
import AboutUs from "./aboutUs";
import News from "./news";
import Doctors from "./doctors";
import Services from "./services";
import Contact from "./contact";
import UserPage from "./userPage";
import Appointment from "./appointment";
import DoctorCalendar from "./doctorCalendar";
import DoctorStatistics from "./doctorStatistics";

class App extends React.Component {


    render() {

        return (
            <div>
                <Router>
                    <div>
                        <Switch>

                            <Route
                                exact
                                path='/'
                                render={() => <Home/>}
                            />

                            <Route
                                exact
                                path='/aboutUs'
                                render={() => <AboutUs/>}
                            />

                            <Route
                                exact
                                path='/news'
                                render={() => <News/>}
                            />

                            <Route
                                exact
                                path='/doctors'
                                render={() => <Doctors/>}
                            />

                            <Route
                                exact
                                path='/services'
                                render={() => <Services/>}
                            />

                            <Route
                                exact
                                path='/contactUs'
                                render={() => <Contact/>}
                            />

                            <Route
                                exact
                                path='/userPage'
                                render={() => <UserPage/>}
                            />

                            <Route
                                exact
                                path='/appointment'
                                render={() => <Appointment/>}
                            />

                            <Route
                                exact
                                path='/doctorCalendar'
                                render={() => <DoctorCalendar/>}
                            />

                            <Route
                                exact
                                path='/doctorStatistics'
                                render={() => <DoctorStatistics/>}
                            />

                            {/*Error*/}
                            <Route
                                exact
                                path='/error'
                                render={() => <ErrorPage/>}
                            />

                            <Route render={() => <ErrorPage/>}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    };
}

export default App
