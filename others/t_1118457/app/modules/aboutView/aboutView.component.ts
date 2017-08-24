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
    selector: "ns-aboutView",
    templateUrl: "aboutView.component.html"
        /// component definitions
})

export class AboutViewComponent
/// component inheritance
{
    get title() {
            let result: string = "About";

            /// component custom title

            return result;
        }
        /// component additional properties
    constructor(
            /// component constructor dependencies
            private _service: common.AboutViewService
        ) {
            /// component constructor method
        }
        /// component additional methods
}