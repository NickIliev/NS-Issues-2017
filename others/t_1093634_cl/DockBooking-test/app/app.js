"use strict";
var app = require("application");
/*
** xho -----> Do not place any code after the application has been started (it is ignored on iOS)
*/
app.start({ moduleName: './pages/home/home' });
// LATER SHOULD USE FRESCO on ANDROID Platform - https://github.com/NativeScript/nativescript-fresco
// import fresco = require("nativescript-fresco");
// //partial declaration of Fresco native anroid class
// declare module com{
//     module facebook{
//         module drawee{
//             module backends {
//                 module pipeline{
//                     class Fresco{
//                        static initialize(context: any) : any;
// }}}}}}
// if (application.android) {
//     application.onLaunch = function (intent) {
//         fresco.initialize();
//     };
// }
// app events
// import dialogs = require("ui/dialogs");
// application.on(application.lowMemoryEvent, function (args) {
//     let activityMessage;
//     activityMessage = args.android || args.ios;
//     console.log("LOW MEMORY WARNING: " + activityMessage);
//     dialogs.alert("Activity: " + activityMessage).then(()=> {
//     });
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBbUM7QUFFbkM7O0VBRUU7QUFDRixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQztBQUUvQyxvR0FBb0c7QUFDcEcsa0RBQWtEO0FBQ2xELHNEQUFzRDtBQUN0RCxzQkFBc0I7QUFDdEIsdUJBQXVCO0FBQ3ZCLHlCQUF5QjtBQUN6QixnQ0FBZ0M7QUFDaEMsbUNBQW1DO0FBQ25DLG9DQUFvQztBQUNwQyxnRUFBZ0U7QUFDaEUsU0FBUztBQUVULDZCQUE2QjtBQUM3QixpREFBaUQ7QUFDakQsK0JBQStCO0FBQy9CLFNBQVM7QUFDVCxJQUFJO0FBRUosYUFBYTtBQUNiLDBDQUEwQztBQUUxQywrREFBK0Q7QUFDL0QsMkJBQTJCO0FBQzNCLGtEQUFrRDtBQUNsRCw2REFBNkQ7QUFDN0QsZ0VBQWdFO0FBQ2hFLFVBQVU7QUFDVixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG4vKlxuKiogeGhvIC0tLS0tPiBEbyBub3QgcGxhY2UgYW55IGNvZGUgYWZ0ZXIgdGhlIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHN0YXJ0ZWQgKGl0IGlzIGlnbm9yZWQgb24gaU9TKVxuKi9cbmFwcC5zdGFydCh7IG1vZHVsZU5hbWU6ICcuL3BhZ2VzL2hvbWUvaG9tZScgfSk7XG5cbi8vIExBVEVSIFNIT1VMRCBVU0UgRlJFU0NPIG9uIEFORFJPSUQgUGxhdGZvcm0gLSBodHRwczovL2dpdGh1Yi5jb20vTmF0aXZlU2NyaXB0L25hdGl2ZXNjcmlwdC1mcmVzY29cbi8vIGltcG9ydCBmcmVzY28gPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWZyZXNjb1wiKTtcbi8vIC8vcGFydGlhbCBkZWNsYXJhdGlvbiBvZiBGcmVzY28gbmF0aXZlIGFucm9pZCBjbGFzc1xuLy8gZGVjbGFyZSBtb2R1bGUgY29te1xuLy8gICAgIG1vZHVsZSBmYWNlYm9va3tcbi8vICAgICAgICAgbW9kdWxlIGRyYXdlZXtcbi8vICAgICAgICAgICAgIG1vZHVsZSBiYWNrZW5kcyB7XG4vLyAgICAgICAgICAgICAgICAgbW9kdWxlIHBpcGVsaW5le1xuLy8gICAgICAgICAgICAgICAgICAgICBjbGFzcyBGcmVzY297XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpYyBpbml0aWFsaXplKGNvbnRleHQ6IGFueSkgOiBhbnk7XG4vLyB9fX19fX1cblxuLy8gaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcbi8vIMKgIMKgIGFwcGxpY2F0aW9uLm9uTGF1bmNoID0gZnVuY3Rpb24gKGludGVudCkge1xuLy8gICAgICAgICBmcmVzY28uaW5pdGlhbGl6ZSgpO1xuLy8gwqAgwqAgfTtcbi8vIH1cblxuLy8gYXBwIGV2ZW50c1xuLy8gaW1wb3J0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcblxuLy8gYXBwbGljYXRpb24ub24oYXBwbGljYXRpb24ubG93TWVtb3J5RXZlbnQsIGZ1bmN0aW9uIChhcmdzKSB7XG4vLyAgICAgbGV0IGFjdGl2aXR5TWVzc2FnZTtcbi8vICAgICBhY3Rpdml0eU1lc3NhZ2UgPSBhcmdzLmFuZHJvaWQgfHwgYXJncy5pb3M7XG4vLyAgICAgY29uc29sZS5sb2coXCJMT1cgTUVNT1JZIFdBUk5JTkc6IFwiICsgYWN0aXZpdHlNZXNzYWdlKTtcbi8vICAgICBkaWFsb2dzLmFsZXJ0KFwiQWN0aXZpdHk6IFwiICsgYWN0aXZpdHlNZXNzYWdlKS50aGVuKCgpPT4ge1xuLy8gICAgIH0pO1xuLy8gfSk7XG4iXX0=