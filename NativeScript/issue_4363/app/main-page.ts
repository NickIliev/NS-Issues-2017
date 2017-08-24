import { EventData, fromObject, fromObjectRecursive } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    const source = { a: 1, b: { c: 2 } };
    console.log('source.b before is POJO');
    console.dir(source.b);

    const obs1 = fromObjectRecursive(source);
    console.log('source.b after is ObservableFromObject');
    console.dir(source.b);

    const obs2 = fromObjectRecursive(source);
    console.log('obs2 b.c is : '+ obs2.get('b').get('c'));
    obs1.get('b').set('c', 3);
    console.log('obs2 b.c: should be 2 but is '+ obs2.get('b').get('c'));  // НОТЕ here that we are accessing obs2 and not obs1 

    page.bindingContext = new HelloWorldModel();
}