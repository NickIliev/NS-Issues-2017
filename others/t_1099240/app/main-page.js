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
  
    var content =   `<Envelope xmlns = "http://schemas.xmlsoap.org/soap/envelope/">` +
                    `<Header/>` +
                    `<Body>` +
                        `<login Xmlns = "urn: partner.soap.sforce.com">` +
                            `<username> consultics.group@precisionperu.com.testperu </username>` +
                            `<password> Consultics123XHgM90vJ8v1YUyrRVG15RPTw0 </password>` +
                        `</login>` +
                    `</Body>`;

    http.request({
        url: "https://test.salesforce.com/services/Soap/u/30.0",
        method: "POST",
        headers: { "Content-Type": "text/xml", "SOAPAction": '""' },
        content: content
    }).then(function (response) {
        console.log('http.request response', response);
        for (var key in response) {
            if (response.hasOwnProperty(key)) {
                var element = response[key];
                console.log(key + ": " + element);
            }
        }
    }).catch(function (error) {
        console.log('http.request error: ' + error)
    })
}


