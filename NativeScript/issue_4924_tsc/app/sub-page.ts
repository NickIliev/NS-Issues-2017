import { EventData } from 'data/observable';
import { topmost } from 'ui/frame';

export function goBack(args: EventData) {
    topmost().goBack();
}