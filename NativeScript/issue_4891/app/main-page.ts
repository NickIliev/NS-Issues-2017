import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as dialogs from "tns-core-modules/ui/dialogs";

export function navigatingTo(args: EventData) { }

export function openDialog() {
    var options = {
        title: "Race Selection",
        message: "Choose your race",
        cancelButtonText: "Cancel",
        actions: ["Human", "Elf", "Dwarf", "Orc"]
    };
    dialogs.action(options).then((result) => { 
        console.log(result);
    });
}