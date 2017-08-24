"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var config_1 = require("../shared/config");
/* ***********************************************************
* The {N} Firebase plugin initialization is explained in the plugin readme here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase#usage
* Another important part of the initialization are the prerequisites:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase#prerequisites
* In this template, Firebase is set up with a custom existing project, so that
* You can build and run this template without creating your own Firebase project.
* Note that if you change the bundle id of the application, the Firebase configuration
* will stop working.
*************************************************************/
firebase.init({
    persist: false,
    storageBucket: config_1.Config.firebaseBucket
}).then(function (instance) { return console.log("firebase.init done"); }, function (error) { return console.log("firebase.init error: " + error); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlyZWJhc2UuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQTBEO0FBRTFELDJDQUEwQztBQUUxQzs7Ozs7Ozs7OzhEQVM4RDtBQUM5RCxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ1YsT0FBTyxFQUFFLEtBQUs7SUFDZCxhQUFhLEVBQUUsZUFBTSxDQUFDLGNBQWM7Q0FDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsRUFBakMsQ0FBaUMsRUFDbkQsVUFBQyxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9zaGFyZWQvY29uZmlnXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoZSB7Tn0gRmlyZWJhc2UgcGx1Z2luIGluaXRpYWxpemF0aW9uIGlzIGV4cGxhaW5lZCBpbiB0aGUgcGx1Z2luIHJlYWRtZSBoZXJlOlxyXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9FZGR5VmVyYnJ1Z2dlbi9uYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlI3VzYWdlXHJcbiogQW5vdGhlciBpbXBvcnRhbnQgcGFydCBvZiB0aGUgaW5pdGlhbGl6YXRpb24gYXJlIHRoZSBwcmVyZXF1aXNpdGVzOlxyXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9FZGR5VmVyYnJ1Z2dlbi9uYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlI3ByZXJlcXVpc2l0ZXNcclxuKiBJbiB0aGlzIHRlbXBsYXRlLCBGaXJlYmFzZSBpcyBzZXQgdXAgd2l0aCBhIGN1c3RvbSBleGlzdGluZyBwcm9qZWN0LCBzbyB0aGF0XHJcbiogWW91IGNhbiBidWlsZCBhbmQgcnVuIHRoaXMgdGVtcGxhdGUgd2l0aG91dCBjcmVhdGluZyB5b3VyIG93biBGaXJlYmFzZSBwcm9qZWN0LlxyXG4qIE5vdGUgdGhhdCBpZiB5b3UgY2hhbmdlIHRoZSBidW5kbGUgaWQgb2YgdGhlIGFwcGxpY2F0aW9uLCB0aGUgRmlyZWJhc2UgY29uZmlndXJhdGlvblxyXG4qIHdpbGwgc3RvcCB3b3JraW5nLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5maXJlYmFzZS5pbml0KHtcclxuICAgIHBlcnNpc3Q6IGZhbHNlLFxyXG4gICAgc3RvcmFnZUJ1Y2tldDogQ29uZmlnLmZpcmViYXNlQnVja2V0XHJcbn0pLnRoZW4oKGluc3RhbmNlKSA9PiBjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZG9uZVwiKSxcclxuICAgIChlcnJvcikgPT4gY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGVycm9yOiBcIiArIGVycm9yKSk7XHJcbiJdfQ==