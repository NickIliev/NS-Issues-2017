import {
    Injectable
} from "@angular/core";
import {
    Router
} from "@angular/router";

import {
    BehaviorSubject
} from "rxjs";

import {
    NavigationModes
} from "../enums";
import {
    NavigationItem
} from "../models";

@Injectable()
export class NavigationService {
    private _modes = NavigationModes;
    private _mode: NavigationModes;
    private _routes: NavigationItem[];

    private _openDrawer$: BehaviorSubject<boolean>;

    constructor(
        private _router: Router
    ) {
        this._mode = this._modes.TABSTRIP;
        this._routes = [
            { path: "authenticationView", title: "Home View", icon: "\uf015" },
            { path: "requestView", title: "Requests", icon: "\uf0ae" },
            { path: "scanQrcodeView", title: "Scan QR", icon: "\uf029" },
            { path: "notificationView", title: "Notifications", icon: "\uf0ac" },
            { path: "aboutView", title: "About", icon: "\uf05a" },
            { path: "buildingView", title: "Buildings", icon: "\uf1ad" },
            { path: "spaceView", title: "Spaces", icon: "\uf1b2" },
            { path: "assetView", title: "Assets", icon: "\uf2db" },
            /// navigation routes
        ];

        this._openDrawer$ = new BehaviorSubject<boolean>(false);
    }

    get mode(): NavigationModes {
        return this._mode;
    }

    get routes(): NavigationItem[] {
        return this._routes;
    }

    get openDrawer$() {
        return this._openDrawer$.asObservable();
    }

    navigateIndex() {
        this._router.navigate(["/"]);
    }

    navigate(path: string) {
        this._router.navigate(["/nav/" + path]); // N.B. needed to add '/nav' to this!
    }

    toggleDrawer() {
        this._openDrawer$.next(!this._openDrawer$.getValue());
    }
}