import { Observable } from 'data/observable';
import * as httpModule from "http";

export class HelloWorldModel extends Observable {

    public items = [];
    public items2 = [];

    constructor() {
        super();

        this.loadCountries()
    }

    loadCountries() {

        httpModule.request({
            url: "http://services.groupkt.com/country/get/all",
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            var list = response.content.toJSON().RestResponse.result;

            list.forEach(country => {
                console.log(country.name);
                this.items.push(country);
                this.items2.push(country);
            });

        });
    }

}