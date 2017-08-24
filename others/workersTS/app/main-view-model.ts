import { Observable } from 'data/observable';
var worker = new Worker('./workers/image-processor');
import { fromResource } from "image-source";

export class HelloWorldModel extends Observable {

    public imageSource = fromResource("res://icon");

    private _counter: number;
    private _message: string;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value)
        }
    }

    public onTap() {
        this._counter--;
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        } else {
            this.message = `${this._counter} taps left`;
        }
    }

    public workerInit() {
        worker.postMessage({ src: this.imageSource, mode: 'scale' });

        worker.onmessage = function (msg) {
            if (msg.data.success) {
                // Stop idle animation
                // Update Image View
                // Terminate worker or send another message

                worker.terminate();
            } else {
                // Stop idle animation
                // Display meaningful message
                // Terminate worker or send message with different parameters
            }
        }

        worker.onerror = function (err) {
            console.log(`An unhandled error occurred in worker: ${err.filename}, line: ${err.lineno} :`);
            console.log(err.message);
        }
    }
}