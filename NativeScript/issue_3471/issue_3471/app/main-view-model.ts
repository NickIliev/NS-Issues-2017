import {Observable} from 'data/observable';
import * as frame from "ui/frame";

export class HelloWorldModel extends Observable {

    constructor() {
        super();
    }


    public goToSecond() {
        frame.topmost().navigate("sub-page");
    }

    public goBack() {
        console.log("goBack");
        frame.goBack();
    }

}