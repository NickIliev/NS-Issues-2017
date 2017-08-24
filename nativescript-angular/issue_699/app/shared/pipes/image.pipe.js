"use strict";
var core_1 = require("@angular/core");
var empty1x1png = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";
var ImagePipe = (function () {
    function ImagePipe() {
    }
    ImagePipe.prototype.transform = function (value, args) {
        var img, type, provider;
        if (typeof (value) === "undefined") {
            return empty1x1png;
        }
        type = args[0];
        provider = args[1];
        if (!this._isAbsolute(value)) {
            if (type === "everlive") {
                var setup = provider.setup;
                img = setup.scheme + ":" + setup.url + setup.appId + "/Files/" + value + "/Download";
            }
            else if (type === "sitefinity") {
                var url = provider.profileUrl, startIndex = url.indexOf("//") + 2, endIndex = url.indexOf("/", startIndex), destination = endIndex === -1 ? url : url.substr(0, endIndex);
                img = destination + img;
            }
            else {
                img = empty1x1png;
            }
        }
        return img;
    };
    ImagePipe.prototype._isAbsolute = function (src) {
        if (src && (src.slice(0, 5) === "http:" || src.slice(0, 6) === "https:" || src.slice(0, 2) === "//" || src.slice(0, 5) === "data:")) {
            return true;
        }
        return false;
    };
    ImagePipe = __decorate([
        core_1.Pipe({
            name: "nsImage"
        }), 
        __metadata('design:paramtypes', [])
    ], ImagePipe);
    return ImagePipe;
}());
exports.ImagePipe = ImagePipe;
//# sourceMappingURL=image.pipe.js.map