import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable()
export class ItemService {
    private items = new Array<Item>(
        { id: 1, name: "Ter Stegen", role: "Goalkeeper", isSelected: true },
        { id: 3, name: "Piqué", role: "Defender", isSelected: false },
        { id: 4, name: "I. Rakitic", role: "Midfielder", isSelected: true },
        { id: 5, name: "Sergio", role: "Midfielder", isSelected: false },
        { id: 6, name: "Denis Suárez", role: "Midfielder", isSelected: true },
        { id: 7, name: "Arda", role: "Midfielder", isSelected: false },
        { id: 8, name: "A. Iniesta", role: "Midfielder", isSelected: true },
        { id: 9, name: "Suárez", role: "Forward", isSelected: false },
        { id: 10, name: "Messi", role: "Forward", isSelected: true },
        { id: 11, name: "Neymar", role: "Forward", isSelected: false },
        { id: 12, name: "Rafinha", role: "Midfielder", isSelected: true },
        { id: 13, name: "Cillessen", role: "Goalkeeper", isSelected: false },
        { id: 14, name: "Mascherano", role: "Defender", isSelected: true },
        { id: 17, name: "Paco Alcácer", role: "Forward", isSelected: false },
        { id: 18, name: "Jordi Alba", role: "Defender", isSelected: true },
        { id: 19, name: "Digne", role: "Defender", isSelected: false },
        { id: 20, name: "Sergi Roberto", role: "Midfielder", isSelected: true },
        { id: 21, name: "André Gomes", role: "Midfielder", isSelected: false },
        { id: 22, name: "Aleix Vidal", role: "Midfielder", isSelected: true },
        { id: 23, name: "Umtiti", role: "Defender", isSelected: false },
        { id: 24, name: "Mathieu", role: "Defender", isSelected: true },
        { id: 25, name: "Masip", role: "Goalkeeper", isSelected: false },
    );

    getItems(): Item[] {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter(item => item.id === id)[0];
    }
}
