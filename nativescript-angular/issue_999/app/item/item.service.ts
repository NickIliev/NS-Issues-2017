import { Injectable } from "@angular/core";

@Injectable()
export class ItemService {
    private items = new Array<any>(
        {
            "NodeId": 2259,
            "Number": 1,
            "Details": "",
            "Url": ""
        },
        {
            "NodeId": 7534,
            "Number": 2,
            "Details": "",
            "Url": ""
        },
        {
            "NodeId": 3585,
            "Number": 3,
            "Details": "",
            "Url": "http://www.ncbi.nlm.nih.gov/pubmed/18489970"
        },
        {
            "NodeId": 7535,
            "Number": 4,
            "Details": "",
            "Url": "http://www.ncbi.nlm.nih.gov/pubmed/9701682"
        }
    );

    getItems(): any[] {
        return this.items;
    }

    getItem(id: number): any {
        return this.items.filter(item => item.id === id)[0];
    }
}
