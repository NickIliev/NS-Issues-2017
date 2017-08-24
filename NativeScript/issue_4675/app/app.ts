/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import "./bundle-config";
import * as application from 'application';

application.on(application.launchEvent, (args: application.ApplicationEventData) => {
	console.log('app.ts -> launchEvent');
});

application.on(application.resumeEvent, (args: application.ApplicationEventData) => {
	console.log("app.ts -> resumeEvent");
});

application.on(application.suspendEvent, (args: application.ApplicationEventData) => {
	console.log('app.ts -> suspendEvent');
});

application.on(application.exitEvent, (args: application.ApplicationEventData) => {
	console.log('app.ts -> exitEvent');
});

    application.android.on(application.AndroidApplication.activityDestroyedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

application.start({ moduleName: 'main-page' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
