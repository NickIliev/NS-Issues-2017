var httpModule = require("http");

exports.pageLoaded = function() {

};

exports.buttonTap = function() {
    httpModule.request({ url: "http://10.0.2.2:3000/withoutContentType", method: "GET" })
        .then(function(response){
            alert("response received");
        });
}
