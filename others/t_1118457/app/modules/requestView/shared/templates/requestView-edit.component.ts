import {
    Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, OnInit
}
from "@angular/core";
import {
    Observable
}
from "rxjs/Observable";

import * as common from "../";
import * as shared from "../../../../shared";

@
Component({
    moduleId: module.id,
    selector: "ns-requestView-edit",
    templateUrl: "requestView-edit.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestViewEditComponent implements OnInit {@
    Input() service: any;@
    Input() set current(value: shared.Item) {
        this.item = ( < any > Object).assign({}, value);
    }

    @
    Output() update = new EventEmitter();@
    Output() delete = new EventEmitter();

    /// Add fields instance

    item: shared.Item;

    /// placeholder for field

    constructor() {
        /// placeholder for component constructor
    }

    ngOnInit() {
        /// placeholder for component init
    }

    onUpdate() {
        this.update.emit({
            item: this.item
        });
    }

    onDelete() {
        this.delete.emit({
            item: this.item
        });
    }

    /// partial additional methods
}