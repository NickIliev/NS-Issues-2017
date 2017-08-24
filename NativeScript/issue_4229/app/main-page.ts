import { EventData } from 'data/observable';
import { Page } from 'ui/page';


export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    const blurEffect = UIBlurEffect.effectWithStyle(UIBlurEffectStyle.Dark);
}