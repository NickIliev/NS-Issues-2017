import { Injectable } from "@angular/core";
import { Recording } from "../recording/recording";
import { SettingsService } from '../settings.service';

@Injectable()
export class RecordingsService {
    private _recordings: Recording[];

    public constructor(
        private settingsService: SettingsService
    ) {
        this._recordings = JSON.parse(this.settingsService.getString('recordings', '[]'));
    }

    public get recordings(): Recording[] {
        return this._recordings;
    }

    public set recordings(value: Recording[]) {
        this._recordings.length = 0;

        if (value) {
            this._recordings.push(...value);
        }

        this.persist();
    }

    public persist() {
        this.settingsService.setString('recordings', JSON.stringify(this._recordings));
    }
}
