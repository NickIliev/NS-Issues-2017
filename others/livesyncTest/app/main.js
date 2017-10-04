"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
/* ***********************************************************
* The {N} Firebase plugin needs some initialization steps before it is ready
* for use. Check out the initialization script at /shared/firebase.common.ts
* along with more information about it.
*************************************************************/
require("./shared/firebase.common");
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwR0FBMEc7QUFDMUcsMERBQTRFO0FBRTVFLDJDQUF5QztBQUV6Qzs7Ozs4REFJOEQ7QUFDOUQsb0NBQWtDO0FBRWxDLHNDQUEyQixFQUFFLENBQUMsZUFBZSxDQUFDLHNCQUFTLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRoaXMgaW1wb3J0IHNob3VsZCBiZSBmaXJzdCBpbiBvcmRlciB0byBsb2FkIHNvbWUgcmVxdWlyZWQgc2V0dGluZ3MgKGxpa2UgZ2xvYmFscyBhbmQgcmVmbGVjdC1tZXRhZGF0YSlcbmltcG9ydCB7IHBsYXRmb3JtTmF0aXZlU2NyaXB0RHluYW1pYyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9wbGF0Zm9ybVwiO1xuXG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tIFwiLi9hcHAubW9kdWxlXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIFRoZSB7Tn0gRmlyZWJhc2UgcGx1Z2luIG5lZWRzIHNvbWUgaW5pdGlhbGl6YXRpb24gc3RlcHMgYmVmb3JlIGl0IGlzIHJlYWR5XG4qIGZvciB1c2UuIENoZWNrIG91dCB0aGUgaW5pdGlhbGl6YXRpb24gc2NyaXB0IGF0IC9zaGFyZWQvZmlyZWJhc2UuY29tbW9uLnRzXG4qIGFsb25nIHdpdGggbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBpdC5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5pbXBvcnQgXCIuL3NoYXJlZC9maXJlYmFzZS5jb21tb25cIjtcblxucGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSk7XG4iXX0=