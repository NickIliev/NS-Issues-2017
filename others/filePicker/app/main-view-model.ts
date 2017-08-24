import { Observable } from 'data/observable';
import filePicker = require('nativescript-file-picker');

export class HelloWorldModel extends Observable {

    public message: string;
    private filePicker: filePicker.FilePicker;

    constructor() {
        super();

        this.filePicker = new filePicker.FilePicker();
    }

    public showFilePicker() {
        this.filePicker.singleClick = true;
        this.filePicker.mode = filePicker.Modes.MODE_FILE;

        this.filePicker.show().then((result) => {
            if (result.length == 1) {
                console.log(result);
            }
            else
                for (let i = 0; i < result.length; i++) {
                    console.log(result[i]);
                }
        })
    }
}