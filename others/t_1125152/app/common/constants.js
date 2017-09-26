var applicationSettingsModule = require("application-settings");
var app = require("application");

var configObject = {
    //apiUrl: "https://uhnow.uhhospitals.org/Service/api/", // Ext Prod
    apiUrl: "http://uhnowtest.uhhospitals.org/Service/api/", // Ext Test
    //apiUrl: "http://10.85.57.110/Services/UHNow/api/", // Eth0
    //apiUrl: "http://10.85.246.68/Services/UHNow/api/", // wifi
    //apiUrl: "http://10.85.244.121/Services/UHNow/api/", // Marconi
    //apiUrl: "http://10.85.248.237/Services/UHNow/api/", // WiFi Tesla
    //apiUrl: "http://MSMN03KDMB06/Services/UHNow/api/",
    //apiUrl: "http://10.30.35.172/Services/UHNow/api/", // Ben WFH
    analyticsId: "dmzna8gid0sle9e6",
    googleMapsAPIKey: "AIzaSyAtRVvG3Be3xXiZFR7xp-K-9hy4nZ4hMFs",
    maxLocationAge: 5 * 60 * 1000, // use cached location for maximum of 5 minutes,
    //secret: (app.ios != null) ? "3E332062-1518-4185-9C7D-AEEC9161A229" : "AA130B2B-02E3-4468-975B-8FF288BAB634",
    //secret: "3E332062-1518-4185-9C7D-AEEC9161A229", //iOS appStore secret
    secret: "70F0513C-A2F4-49B0-96CF-1763ECABC53F", //enterprise secret
    //secret: "AA130B2B-02E3-4468-975B-8FF288BAB634", //Android appStore secret
    //referralEaseUrl: "https://uhnow.uhhospitals.org/Service/api/", //extr prod
    referralEaseUrl: "http://uhnowtest.uhhospitals.org/Service/api/", //test
    //referralEaseUrl: "http://192.168.1.130/xampp/uhservices/", //localhost home
    //referralEaseUrl: "http://stage.srhgrafx.com/uhservices/", //localhost home
    //referralEaseUrl: "http://10.85.57.54:80/Services/UHNow/api/", //Eth0
    //referralEaseUrl: "http://10.85.249.62:80/Services/UHNow/api/", //Marconi
    //symptomCheckerURL: "http://uhnowtest.uhhospitals.org/Service/symptom-checker.html"
    symptomCheckerURL: "https://uhnow.uhhospitals.org/Service/symptom-checker.html",
    InQuickerBaseURL: "https://uh.inquicker.com"
};

module.exports = configObject;