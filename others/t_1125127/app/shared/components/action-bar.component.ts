import { Component, Input, Output, EventEmitter } from "@angular/core";

import { NavigationModes } from "../enums";
import { NavigationService } from "../services";

@Component({
    moduleId: module.id,
    selector: "ns-action-bar",
    templateUrl: "action-bar.component.html"
})
export class ActionBarComponent {
    @Input() title: string;
    @Input() showBack: boolean;
    @Input() showDrawer: boolean;
    @Input() showIndex: boolean;

    @Output() back = new EventEmitter();

    private _modes = NavigationModes;
    private _mode: NavigationModes;

    constructor(
        private _navigationService: NavigationService
    ) {
        this._mode = _navigationService.mode;

        if (this._mode === this._modes.DRAWER) {
            this.showDrawer = true;
            this.showIndex = false;
        } else if (this._mode === this._modes.LISTMENU) {
            this.showDrawer = false;
            this.showIndex = true;
        } else {
            this.showDrawer = false;
            this.showIndex = false;
        }
    }

    onIndex() {
        this._navigationService.navigateIndex();
    }

    onDrawer() {
        this._navigationService.toggleDrawer();
    }

    onBack() {
        this.back.emit();
    }
}
