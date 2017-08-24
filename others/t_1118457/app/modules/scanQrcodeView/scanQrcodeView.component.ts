import {
    Component
    /// component core modules
}
from "@angular/core";

/// component additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-scanQrcodeView",
    templateUrl: "scanQrcodeView.component.html"
        /// component definitions
})

export class ScanQrcodeViewComponent
/// component inheritance
{
    get title() {
            let result: string = "Scan QR";

            /// component custom title

            return result;
        }
        /// component additional properties
    constructor(
            /// component constructor dependencies
            private _service: common.ScanQrcodeViewService
        ) {
            /// component constructor method
        }
        /// component additional methods
}