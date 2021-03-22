import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";

class AboutUs extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = this.englishText;
    }

    englishText = {
        "TITLE": "About us",
        "TEXT1": "Dr. Ionescu Andreea and Dr. Popescu Mihai, the founders of DentaWEB, have dreamed for more than a decade to develop an integrative concept that would represent more than a dental clinic. During the hundreds of hours spent in the office, as well as in specialized trainings, always trying to improve, they turned their time into a friend.",
        "TEXT2": "They managed to change the lives of the millions of patients who crossed their threshold, giving them the chance to smile again. The large number of patients, but also their desire to benefit from other services of the highest quality, guaranteed by the founders, led to the expansion of the initial structure, setting up inside the clinic its own dental laboratory, the DentaWEB LAB concept.",
        "PHOTO": "Photo gallery"
    }

    romanianText = {
        "TITLE": "Despre noi",
        "TEXT1": "Dr. Ionescu Andreea și Dr. Popescu Mihai, fondatorii DentaWEB au visat mai bine de un deceniu să dezvolte un concept integrativ care să reprezinte mai mult decât o clinică de stomatologie. În timpul sutelor de ore petrecute în cabinet, precum și la trainning-uri de specializare, încercând mereu să se perfecționeze, și-au transformat timpul într-un prieten.",
        "TEXT2": "Au reușit să schimbe viața milioanelor de pacienți care le-au trecut pragul, oferindu-le șansa de a zâmbi din nou. Numărul mare de pacienți, dar și dorința acestora de a beneficia și de alte servicii de cea mai bună calitate, garantate de fondatori, au dus la extinderea structurii inițiale, înființând chiar în interiorul clinicii propriul laborator de tehnică dentară, conceptul DentaWEB LAB.",
        "PHOTO": "Galerie foto"
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

                <div>
                    <div className="column"><h3>{this.state.TEXT1}</h3></div>
                    <div className="column"><h3>{this.state.TEXT2}</h3></div>
                </div>

                <iframe id="despreVideo" width="900" height="600" title="videoAbout"
                        src="https://www.youtube.com/embed/AezDcQE5JOU"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>

                <h2>{this.state.PHOTO}</h2>

                <div className="gallery">
                    <img src={require("./images/despre1.jpg")} alt="Despre 1"/>
                </div>

                <div className="gallery">
                    <img src={require("./images/despre2.jpg")} alt="Despre 2"/>
                </div>

                <div className="gallery">
                    <img src={require("./images/despre3.jpg")} alt="Despre 3"/>
                </div>

                <div className="gallery">
                    <img src={require("./images/despre4.jpg")} alt="Despre 4"/>
                </div>

                <div className="gallery">
                    <img src={require("./images/despre5.jpg")} alt="Despre 5"/>
                </div>

                <div className="gallery">
                    <img src={require("./images/despre6.jpg")} alt="Despre 6"/>
                </div>

            </div>
        )
    }
}

export default AboutUs
