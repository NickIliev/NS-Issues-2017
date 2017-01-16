import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

var faker = require('Faker'); 
var randomName = faker.Name.findName();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    console.log("randomName: " + randomName);

    page.bindingContext = new HelloWorldModel();
}