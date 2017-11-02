import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable()
export class ItemService {
    private items = new Array<any>(
        { id: 1, name: "Ter Stegen", role: "Goalkeeper", list: [1, 2, 4, 8, 16] },
        { id: 3, name: "Piqué", role: "Defender", list: [11, 22, 44, 88, 166] },
        { id: 4, name: "I. Rakitic", role: "Midfielder", list: [31, 32, 34, 38, 136] },
        { id: 5, name: "Sergio", role: "Midfielder", list: [41, 42, 44, 48, 416] },
        { id: 6, name: "Denis Suárez", role: "Midfielder", list: [51, 52, 54, 58, 56] },
        { id: 7, name: "Arda", role: "Midfielder", list: [61, 62, 64, 68, 616] },
        { id: 8, name: "A. Iniesta", role: "Midfielder", list: [71, 72, 74, 78, 716] },
        { id: 9, name: "Suárez", role: "Forward", list: [81, 82, 84, 88, 816] }
    );

    getItems(): Item[] {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter(item => item.id === id)[0];
    }
}
