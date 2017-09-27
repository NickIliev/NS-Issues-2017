import "./bundle-config";
import * as app from 'application';
import * as frameModule from 'ui/frame';

// comment the default page transtion and the navigation will work as expected
frameModule.Frame.defaultTransition = { name: "slide" };

app.start({ moduleName: 'main-page' });
