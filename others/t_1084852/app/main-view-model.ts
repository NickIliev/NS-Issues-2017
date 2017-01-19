import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

    private _pdfUrl: string;


    constructor() {
        super();

        this.pdfUrl = "https://ia601708.us.archive.org/6/items/sreyas-ebooks/sree-vishnusahasranamasthothram.pdf";
    }

    get pdfUrl(): string {
        return this._pdfUrl;
    }
    
    set pdfUrl(value: string) {
        if (this._pdfUrl !== value) {
            this._pdfUrl = value;
            this.notifyPropertyChange('pdfUrl', value)
        }
    }

    public onLoad() {
        console.log("PDF file loaded");
    }

}