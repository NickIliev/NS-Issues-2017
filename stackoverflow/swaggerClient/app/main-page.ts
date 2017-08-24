import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import * as swag from "swagger-client";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    var client = new swag.Swagger({
        url: 'http://petstore.swagger.io/v2/swagger.json',
        success: function () {
            client.pet.getPetById({ petId: 7 }, { responseContentType: 'application/json' }, function (pet) {
                console.log('pet', pet);
            });
        }
    });

}