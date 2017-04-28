import { EventData } from 'data/observable';
import { Page } from 'ui/page';

declare var OggVorbis: any;

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    console.log(OggVorbis);

} 