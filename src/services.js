import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";

class Services extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = this.englishText;
    }

    englishText = {
        "TITLE": "Services and rates",
        "SERVICE": "Name of service",
        "PRICE": "Price",
        "CHANNEL": "channel",
        "PRESENTATION": "Presentation of services",
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
        "PRESENTATION1": "Teeth whitening",
        "PRESENTATION2": "Total prosthesis",
        "PRESENTATION3": "Bacterial plaque",
        "PRESENTATION4": "Dental implant",
        "PRESENTATION5": "Metal crown"
    }

    romanianText = {
        "TITLE": "Servicii și tarife",
        "SERVICE": "Denumire serviciu",
        "PRICE": "Preț",
        "CHANNEL": "canal",
        "PRESENTATION": "Prezentare servicii",
        "SERVICE1": "Consultație",
        "SERVICE2": "Detartraj ultrasunete",
        "SERVICE3": "Obturații 1 față",
        "SERVICE4": "Albire dentară",
        "SERVICE5": "Dezobturarea canalelor",
        "SERVICE6": "Extracție pluriradiculari",
        "SERVICE7": "Coroană metalică Cr-Ni",
        "SERVICE8": "Proteză totală / partială acrilică",
        "SERVICE9": "Adăugare dinte pe proteză acrilică",
        "SERVICE10": "Implant dentar cu coroană zirconiu-ceramică",
        "PRESENTATION1": "Albirea dinților",
        "PRESENTATION2": "Proteză totală",
        "PRESENTATION3": "Placă bacteriană",
        "PRESENTATION4": "Implant dentar",
        "PRESENTATION5": "Coroană metalică"
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

                <h1>{this.state.TITLE}</h1>

                <table className="serviceTable">
                    <tr>
                        <th></th>
                        <th>{this.state.SERVICE}</th>
                        <th>{this.state.PRICE}</th>
                    </tr>
                    <tr>
                        <td>1.</td>
                        <td>{this.state.SERVICE1}</td>
                        <td>70 lei</td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>{this.state.SERVICE2}</td>
                        <td>150 lei</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>{this.state.SERVICE3}</td>
                        <td>150 lei</td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>{this.state.SERVICE4}</td>
                        <td>600 lei</td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>{this.state.SERVICE5}</td>
                        <td>200 lei/{this.state.CHANNEL}</td>
                    </tr>
                    <tr>
                        <td>6.</td>
                        <td>{this.state.SERVICE6}</td>
                        <td>180 lei</td>
                    </tr>
                    <tr>
                        <td>7.</td>
                        <td>{this.state.SERVICE7}</td>
                        <td>250 lei</td>
                    </tr>
                    <tr>
                        <td>8.</td>
                        <td>{this.state.SERVICE8}</td>
                        <td>900 lei</td>
                    </tr>
                    <tr>
                        <td>9.</td>
                        <td>{this.state.SERVICE9}</td>
                        <td>200 lei</td>
                    </tr>
                    <tr>
                        <td>10.</td>
                        <td>{this.state.SERVICE10}</td>
                        <td>4000 lei</td>
                    </tr>
                </table>
                <br/>

                <h2>{this.state.PRESENTATION}</h2>

                <div className="services">
                    <h3>{this.state.PRESENTATION1}</h3>
                    <iframe className="serviciiVideo" title="video1" src="https://www.youtube.com/embed/m8_MHiw8mcc"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>

                <div className="services">
                    <h3>{this.state.PRESENTATION2}</h3>
                    <iframe className="serviciiVideo" title="video1" src="https://www.youtube.com/embed/50fAc8nspjA"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>

                <div className="services">
                    <h3>{this.state.PRESENTATION3}</h3>
                    <iframe className="serviciiVideo" title="video1" src="https://www.youtube.com/embed/OKsF-UcQYus"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>

                <div className="services">
                    <h3>{this.state.PRESENTATION4}</h3>
                    <iframe className="serviciiVideo" title="video1" src="https://www.youtube.com/embed/_oLqHXf2XgE"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>

                <div className="services">
                    <h3>{this.state.PRESENTATION5}</h3>
                    <iframe className="serviciiVideo" title="video1" src="https://www.youtube.com/embed/9Ia_wD5XfmM"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>


            </div>
        )
    }
}

export default Services
