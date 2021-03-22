import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";

class Doctors extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = this.englishText;
    }

    englishText = {
        "TITLE": "Dentists",
        "NAME": "Last Name",
        "FNAME": "First Name",
        "SPEC": "Specialization",
        "PHOTO": "Profile picture",
        "SPEC1": "Dental Implantology Specialist",
        "SPEC2": "Orthodontic Specialist",
        "SPEC3": "Specialist in endodontics and dental aesthetics",
        "SPEC4": "Laser therapy specialist",
        "SPEC5": "Endodontic specialist"
    }

    romanianText = {
        "TITLE": "Medici stomatologi",
        "NAME": "Nume",
        "FNAME": "Prenume",
        "SPEC": "Specializare",
        "PHOTO": "Poză profil",
        "SPEC1": "Specialist Implantologie Dentară",
        "SPEC2": "Specialist Ortodonție",
        "SPEC3": "Specialist endodonție și estetică dentară",
        "SPEC4": "Specialist laser terapie",
        "SPEC5": "Specialist endodonție"
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

                <h1>{this.state.TITLE}</h1><br/>

                <table className="medicTable">
                    <tr>
                        <th>{this.state.NAME}</th>
                        <th>{this.state.FNAME}</th>
                        <th>{this.state.SPEC}</th>
                        <th>{this.state.PHOTO}</th>
                    </tr>
                    <tr>
                        <td>Popescu</td>
                        <td>Mihai</td>
                        <td>{this.state.SPEC1}</td>
                        <td><img className="medicImg" src={require("./images/dentist1.jpg")} alt="Denta logo"/></td>
                    </tr>
                    <tr>
                        <td>Ionescu</td>
                        <td>Andreea</td>
                        <td>{this.state.SPEC2}</td>
                        <td><img className="medicImg" src={require("./images/dentist2.jpg")} alt="Denta logo"/></td>
                    </tr>
                    <tr>
                        <td>Pop</td>
                        <td>Cosmin</td>
                        <td>{this.state.SPEC3}</td>
                        <td><img className="medicImg" src={require("./images/dentist3.jpg")} alt="Denta logo"/></td>
                    </tr>
                    <tr>
                        <td>Stanciu</td>
                        <td>Carmen</td>
                        <td>{this.state.SPEC4}</td>
                        <td><img className="medicImg" src={require("./images/dentist4.jpg")} alt="Denta logo"/></td>
                    </tr>
                    <tr>
                        <td>Mureșan</td>
                        <td>Ștefan</td>
                        <td>{this.state.SPEC5}</td>
                        <td><img className="medicImg" src={require("./images/dentist5.jpg")} alt="Denta logo"/></td>
                    </tr>
                </table>


            </div>
        )
    }
}

export default Doctors
