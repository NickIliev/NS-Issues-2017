var http = require("http");

function onNavigatingTo(args) {
    var page = args.object;
}
exports.onNavigatingTo = onNavigatingTo;

function onLoaded(args) {
    var policy = new android.os.StrictMode.ThreadPolicy.Builder().permitAll().build();
    android.os.StrictMode.setThreadPolicy(policy);
}
exports.onLoaded = onLoaded;

exports.onTap = function (args) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://test.salesforce.com/services/Soap/u/30.0', true);

    // build SOAP request
    var sr =    '<?xml version="1.0" encoding="utf-8"?>' +
                `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">` +
                `<Header/>` +
                `<Body>` +
                    `<login Xmlns="urn:partner.soap.sforce.com">` +
                        `<username>consultics.group@precisionperu.com.testperu</username>` +
                        `<passwogit pushrd>Consultics123XHgM90vJ8v1YUyrRVG15RPTw0</password>` +
                    `</login>` +
                `</Body>` +
                '</Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                console.log('done. use firebug/console to see network response');
                console.log("response: " + xmlhttp.response);
            } else {
                console.log("status code: " + xmlhttp.status);
                console.log("statusText: " + xmlhttp.statusText);
                console.log("response: " + xmlhttp.response);
                console.log("responseText: " + xmlhttp.responseText);
            }
        }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);


    /* === SECOND SCENARIO using NativeScript http module === */

    // var content = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">` +
    //     `<Header/>` +
    //     `<Body>` +
    //     `<login Xmlns="urn:partner.soap.sforce.com">` +
    //     `<username>consultics.group@precisionperu.com.testperu</username>` +
    //     `<passwogit pushrd>Consultics123XHgM90vJ8v1YUyrRVG15RPTw0</password>` +
    //     `</login>` +
    //     `</Body>` +
    //     '</Envelope>';

    // http.request({
    //     url: "https://test.salesforce.com/services/Soap/u/30.0",
    //     method: "POST",
    //     headers: { "Content-Type": "text/xml", "SOAPAction": '""' },
    //     content: content
    // }).then(function (response) {
    //     console.log('http.request response', response);
    //     for (var key in response) {
    //         if (response.hasOwnProperty(key)) {
    //             var element = response[key];
    //             console.log(key + ": " + element);
    //         }
    //     }
    // }).catch(function (error) {
    //     console.log('http.request error: ' + error)
    // })

}