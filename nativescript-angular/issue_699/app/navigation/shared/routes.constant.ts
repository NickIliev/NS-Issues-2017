import {
	Routes
}
	from "@angular/router";

/// modules imports
import { SpaceViewComponent } from "../../modules/spaceView/spaceView.component";
import { AboutViewComponent } from "../../modules/aboutView/aboutView.component";
import { NotificationViewComponent } from "../../modules/notificationView/notificationView.component";
import { ScanQrcodeViewComponent } from "../../modules/scanQrcodeView/scanQrcodeView.component";
import { RequestViewComponent } from "../../modules/requestView/requestView.component";
//import { HomeViewComponent } from "../../modules/homeView/homeView.component";
import { AuthenticationViewComponent } from "../../modules/authenticationView/authenticationView.component";

export const ROUTES: Routes = [
	/// start routes declaration
	{ path: "spaceView", component: SpaceViewComponent },
	{ path: "spaceView/:id", component: SpaceViewComponent },
	{ path: "aboutView", component: AboutViewComponent },
	{ path: "notificationView", component: NotificationViewComponent },
	{ path: "scanQrcodeView", component: ScanQrcodeViewComponent },
	{ path: "requestView", component: RequestViewComponent },
	//{ path: "homeView", component: HomeViewComponent },
	{ path: "authenticationView", component: AuthenticationViewComponent },
	{
		path: "",
		component: AuthenticationViewComponent // HomeViewComponent
	}
	/// end routes declaration
];