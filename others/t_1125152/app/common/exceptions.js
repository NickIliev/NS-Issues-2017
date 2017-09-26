var exceptions = {
    httpStatusCode: {
        200: "OK",
        default: "A server error encountered. Please try the request again."
    },

    nativeExceptions: {
        ios: {
            "The Internet connection appears to be offline.":
            {
                title: "No Network Found",
                message: "It appears that you do not have an internet connection. Please ensure that you are connected to Wi-Fi or a mobile network and try again."
            }
        },
        android: {
            "java.net.UnknownHostException":
            {
                title: "No Network Found",
                message: "It appears that you do not have an internet connection. Please ensure that you are connected to Wi-Fi or a mobile network and try again."
            }
        }
    }
}


module.exports = exceptions;