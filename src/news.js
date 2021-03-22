import React from 'react';
import "./styles/styles.css"
import NavBar from "./navBar";
import XMLData from "./XMLFiles/news.xml";

function readXMLFile(xml, currentLanguage) {
    let xmlDoc = xml.responseXML;
    let textSelector = xmlDoc.getElementsByTagName(currentLanguage).item(0);
    document.getElementById("title").innerHTML = textSelector.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    document.getElementById("text1").innerHTML = textSelector.getElementsByTagName("text1")[0].childNodes[0].nodeValue;
    document.getElementById("text2").innerHTML = textSelector.getElementsByTagName("text2")[0].childNodes[0].nodeValue;
    document.getElementById("text3").innerHTML = textSelector.getElementsByTagName("text3")[0].childNodes[0].nodeValue;
}

function openXMLFile(currentLanguage) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            readXMLFile(this, currentLanguage);
        }
    };
    xmlHttpRequest.open("GET", XMLData, true);
    xmlHttpRequest.send();
}

class News extends React.Component {

    constructor(props) {
        super(props);
        this.language = localStorage.getItem("language");
        this.state = this.englishText;
    }

    componentDidMount() {
        openXMLFile(this.language);
    }

    render() {
        return (
            <div className="page">
                <NavBar/>

                <h1 id="title">""</h1>
                <div>
                    <div className="column"><h4 id="text1">""</h4></div>
                    <div className="column"><h4 id="text2">""</h4></div>
                </div>

                <h3 className="fullText" id="text3">""</h3>
                <br/>

                <iframe id="noutatiVideo" width="900" height="600" title="videoNews"
                        src="https://www.youtube.com/embed/If1xVN502VA"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </div>
        )
    }
}

export default News
