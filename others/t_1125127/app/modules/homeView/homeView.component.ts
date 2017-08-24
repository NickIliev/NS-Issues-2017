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
    selector: "ns-homeView",
    templateUrl: "homeView.component.html"
        /// component definitions
})

export class HomeViewComponent
/// component inheritance
{
    get title() {
            let result: string = "Home View";

            /// component custom title

            return result;
        }
        /// component additional properties
    constructor(
            /// component constructor dependencies
            private _service: common.HomeViewService
        ) {
            /// component constructor method
        }
        /// component additional methods
}