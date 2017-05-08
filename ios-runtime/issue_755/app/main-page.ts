import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import { Ogg }from "nativescript-ogg";

export function onLoaded(args: EventData) {

    var oggVorbis = new Ogg();

    oggVorbis.init()
}