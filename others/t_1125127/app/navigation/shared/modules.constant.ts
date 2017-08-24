/// modules imports
import { SpaceViewModule } from "../../modules/spaceView/spaceView.module";
import { AssetViewModule } from "../../modules/assetView/assetView.module";
import { AboutViewModule } from "../../modules/aboutView/aboutView.module";
import { NotificationViewModule } from "../../modules/notificationView/notificationView.module";
import { ScanQrcodeViewModule } from "../../modules/scanQrcodeView/scanQrcodeView.module";
import { RequestViewModule } from "../../modules/requestView/requestView.module";
//import { HomeViewModule } from "../../modules/homeView/homeView.module";
import { AuthenticationViewModule } from "../../modules/authenticationView/authenticationView.module";

export const MODULES = [
/// start modules declaration
SpaceViewModule,
AssetViewModule,
AboutViewModule,
NotificationViewModule,
ScanQrcodeViewModule,
RequestViewModule,
//HomeViewModule,
AuthenticationViewModule
/// end modules declaration
];
