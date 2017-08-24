import { BasePage } from "../../shared/BasePage";
import { Observable } from 'data/observable';

export class HomeModel extends Observable {

    constructor() {
        super();

        // Initialize default values.
        this.set('pageTitle', 'home');
    }

}
