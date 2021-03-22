import React from 'react'
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router-dom";
import "./styles/styles.css"
import {Row, Col} from "react-bootstrap";

class ErrorPage extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = this.englishText;
    }

    englishText = {
        "HOME": "Home",
    }

    romanianText = {
        "HOME": "Acasă",
    }

    componentDidMount() {
        if (this.language === "RO") {
            this.setState(this.romanianText);
        } else {
            this.setState(this.englishText);
        }
    }

    render() {
        return (

            <div className="errorPage" align="center">
                <Row>
                    <Col>
                        <Button id="errorButton"
                                onClick={() => this.props.history.push({
                                    pathname: '/'
                                })}>
                            {this.state.HOME}
                        </Button>
                    </Col>
                    <Col><img
                        src={require("./images/accessDenied.jpg")}
                        alt="Garfield Access Denied"/></Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(ErrorPage)
