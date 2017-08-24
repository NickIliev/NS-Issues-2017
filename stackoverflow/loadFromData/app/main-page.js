var createViewModel = require("./main-view-model").createViewModel;
var http = require("http");
var imageModule = require("ui/image");
var imageSourceModule = require("image-source");

function onNavigatingTo(args) {
    var page = args.object;

    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

function buildImageView() {
    return http.request({ url: "https://www.fillmurray.com/200/300", method: "GET" })
        .then(function (response) {

            response.content.toImage().then(function(res) {
                // res is image
                console.log(res.width);
                console.log(res.height)
            })

        });
}
exports.buildImageView = buildImageView;