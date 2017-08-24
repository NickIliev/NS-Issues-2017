import { EventData } from 'data/observable';
import { Page } from 'ui/page';

export function navigatingTo(args: EventData) { }

export function onPickerLoaded(args) {
    let picker = args.object;
    picker.minuteInterval = 5;
}