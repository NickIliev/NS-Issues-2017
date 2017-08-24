"use strict";
var fs = require("file-system");
function navigatingTo(args) {
    var page = args.object;
    var desktop = fs.knownFolders.ios.desktop();
    console.log("desktop: " + desktop); // undefined
    var developer = fs.knownFolders.ios.developer();
    console.log("developer: " + developer); // undefined
    var downloads = fs.knownFolders.ios.downloads();
    console.log("downloads: " + downloads); // undefined
    var library = fs.knownFolders.ios.library();
    console.log("library: " + library.path); // only this returns Folder as expected
    var movies = fs.knownFolders.ios.movies();
    console.log("movies: " + movies); // undefined
    var sharedPulbic = fs.knownFolders.ios.sharedPublic();
    console.log("sharedPulbic: " + sharedPulbic); // undefined
    var pictures = fs.knownFolders.ios.pictures();
    console.log("pictures: " + pictures); // undefined
    var music = fs.knownFolders.ios.music();
    console.log("music: " + music); // undefined
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map