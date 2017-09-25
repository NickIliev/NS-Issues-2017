var http = require("http");

function onNavigatingTo(args) {
    var items = [];
    http.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY&limit=50")
        .then(function (result) {
            for (var index = 0; index < result["photos"].length; index++) {
                var element = result["photos"][index];
                // console.dir(element);
                items.push({
                    id: element["id"],
                    name: element["camera"]["sol"],
                    role: element["camera"]["earth_date"],
                    imageUrl: element["img_src"]
                });
            }

            args.object.bindingContext = items;
        }, function (error) {
            console.log(error);
        });

}

exports.onNavigatingTo = onNavigatingTo;