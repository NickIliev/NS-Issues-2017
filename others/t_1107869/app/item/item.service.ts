import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable()
export class ItemService {
    private items = new Array<Item>(
        { id: 1, name: "Ter Stegen (selectable)", role: "Goalkeeper" },
        { id: 3, name: "Piqué (selectable)", role: "Defender" },
        { id: 4, name: "I. Rakitic (selectable)", role: "Midfielder" },
        { id: 5, name: "Sergio (selectable)", role: "Midfielder" },
        { id: 6, name: "Denis Suárez (selectable)", role: "Midfielder" },
        { id: 7, name: "Arda (selectable)", role: "Midfielder" },
        { id: 8, name: "A. Iniesta (selectable)", role: "Midfielder" },
        { id: 9, name: "Suárez (selectable)", role: "Forward" },
        { id: 10, name: "Messi (selectable)", role: "Forward" },
        { id: 11, name: "Neymar (selectable)", role: "Forward" },
        { id: 12, name: "Rafinha (non-selectable)", role: "Midfielder" },
        { id: 13, name: "Cillessen (non-selectable)", role: "Goalkeeper" },
        { id: 14, name: "Mascherano (non-selectable)", role: "Defender" },
        { id: 17, name: "Paco Alcácer (non-selectable)", role: "Forward" },
        { id: 18, name: "Jordi Alba (non-selectable)", role: "Defender" },
        { id: 19, name: "Digne (non-selectable)", role: "Defender" },
        { id: 20, name: "Sergi Roberto (non-selectable)", role: "Midfielder" },
        { id: 21, name: "André Gomes (non-selectable)", role: "Midfielder" },
        { id: 22, name: "Aleix Vidal (non-selectable)", role: "Midfielder" },
        { id: 23, name: "Umtiti (non-selectable)", role: "Defender" },
        { id: 24, name: "Mathieu (non-selectable)", role: "Defender" },
        { id: 25, name: "Masip (non-selectable)", role: "Goalkeeper" },
    );

    getItems(): Item[] {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter(item => item.id === id)[0];
    }
}
