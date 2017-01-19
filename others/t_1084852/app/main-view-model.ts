import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

    private _pdfUrl: string;


    constructor() {
        super();

        this.pdfUrl = "http://quranmalayalam.com/files/quran_ml_full.pdf";
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