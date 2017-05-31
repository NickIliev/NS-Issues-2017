import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Grocery } from "./item";

@Injectable()
export class MyHttpGetService {
  constructor(private http: Http) {}

  static apiUrl = "http://api.androidhive.info/contacts/";

  load() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get(MyHttpGetService.apiUrl, {
      headers: headers
    })
    .map(res => res.json())
    .map(data => {
      let groceryList = [];
      data.Result.forEach((contacts) => {
        groceryList.push(new Grocery(contacts.id, contacts.name));
      });

      console.log("groceryList.length: " + groceryList.length)
      return groceryList;
    })
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}