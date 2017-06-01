import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Recording } from '../recording/recording';
import { RecordingsService } from './recordings.service';

@Component({
    moduleId: module.id,
    selector: "px-recordings",
    templateUrl: "./recordings.component.html",
})
export class RecordingsComponent implements OnInit {
    private recordings: Recording[];

    constructor(
        private recordingsService: RecordingsService
    ) {
        this.recordings = this.recordingsService.recordings;
    }

    ngOnInit(): void {
    }
}
