"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var config_1 = require("./config");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlyZWJhc2UuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQTBEO0FBRTFELG1DQUFrQztBQUVsQzs7Ozs7Ozs7OzhEQVM4RDtBQUM5RCxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ1YsT0FBTyxFQUFFLEtBQUs7SUFDZCxhQUFhLEVBQUUsZUFBTSxDQUFDLGNBQWM7Q0FDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsRUFBakMsQ0FBaUMsRUFDbkQsVUFBQyxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGUge059IEZpcmViYXNlIHBsdWdpbiBpbml0aWFsaXphdGlvbiBpcyBleHBsYWluZWQgaW4gdGhlIHBsdWdpbiByZWFkbWUgaGVyZTpcclxuKiBodHRwczovL2dpdGh1Yi5jb20vRWRkeVZlcmJydWdnZW4vbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZSN1c2FnZVxyXG4qIEFub3RoZXIgaW1wb3J0YW50IHBhcnQgb2YgdGhlIGluaXRpYWxpemF0aW9uIGFyZSB0aGUgcHJlcmVxdWlzaXRlczpcclxuKiBodHRwczovL2dpdGh1Yi5jb20vRWRkeVZlcmJydWdnZW4vbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZSNwcmVyZXF1aXNpdGVzXHJcbiogSW4gdGhpcyB0ZW1wbGF0ZSwgRmlyZWJhc2UgaXMgc2V0IHVwIHdpdGggYSBjdXN0b20gZXhpc3RpbmcgcHJvamVjdCwgc28gdGhhdFxyXG4qIFlvdSBjYW4gYnVpbGQgYW5kIHJ1biB0aGlzIHRlbXBsYXRlIHdpdGhvdXQgY3JlYXRpbmcgeW91ciBvd24gRmlyZWJhc2UgcHJvamVjdC5cclxuKiBOb3RlIHRoYXQgaWYgeW91IGNoYW5nZSB0aGUgYnVuZGxlIGlkIG9mIHRoZSBhcHBsaWNhdGlvbiwgdGhlIEZpcmViYXNlIGNvbmZpZ3VyYXRpb25cclxuKiB3aWxsIHN0b3Agd29ya2luZy5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZmlyZWJhc2UuaW5pdCh7XHJcbiAgICBwZXJzaXN0OiBmYWxzZSxcclxuICAgIHN0b3JhZ2VCdWNrZXQ6IENvbmZpZy5maXJlYmFzZUJ1Y2tldFxyXG59KS50aGVuKChpbnN0YW5jZSkgPT4gY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGRvbmVcIiksXHJcbiAgICAoZXJyb3IpID0+IGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBlcnJvcjogXCIgKyBlcnJvcikpO1xyXG4iXX0=