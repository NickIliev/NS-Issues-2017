import { Recording } from '../recording/recording';
import { RecordingsService } from '../recordings/recordings.service';
import { Component, OnInit } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "px-main",
    templateUrl: "./main.component.html",
})
export class MainComponent implements OnInit {
    public constructor(
        private recordingsService: RecordingsService
    ) {
        
    }

    public ngOnInit(): void {

    }
}
