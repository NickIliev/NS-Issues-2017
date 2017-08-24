"use strict";
var http = require("http");
function navigatingTo(args) {
    var page = args.object;
    http.getString("http://m.slashdot.org")
        .then(function (html) {
        console.log(html);
    }).catch(function (err) {
        console.log(err);
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map