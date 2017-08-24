import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

var faker = require('Faker'); 
var randomName = faker.Name.findName();
var randomEmail = faker.Internet.email(); 
var randomCard = faker.Helpers.createCard(); 

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    console.log("randomName: " + randomName);
    console.log("randomEmail: " + randomEmail);
    console.log("randomCard: " + randomCard);

    page.bindingContext = new HelloWorldModel();
}