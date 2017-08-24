import * as app from "application";

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
