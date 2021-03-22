import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = this.englishText;
    }

    englishText = {
        "WELCOME": "Welcome to Denta WEB !",
        "WELCOMETEXT": "The Denta WEB dental office in the Grigorescu neighborhood, Cluj-Napoca, offers you complete and modern dental services: from simple fillings to dental implants, dental aesthetics and orthodontic appliances."
    }

    romanianText = {
        "WELCOME": "Bine ați venit la Denta WEB !",
        "WELCOMETEXT": "Cabinetul stomatologic Denta WEB din cartierul Grigorescu, Cluj-Napoca, vă pune la dispoziție servicii complete și moderne de stomatologie: de la simple plombe până la implanturi dentare, estetică dentară și aparate ortodontice."
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
            <div className="page">
                <NavBar/>

                <h1>{this.state.WELCOME}</h1><br/>

                <h3 className="fullText">{this.state.WELCOMETEXT}</h3>

                <br/>

                <img id="cabinetImg" src={require("./images/cabinet.jpg")} alt="Cabinet"/>

            </div>
        )
    }
}

export default Home
