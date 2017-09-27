import { Injectable } from '@angular/core';

var namesAndEmails = require("./names.json")
var posts = require("./posts.json")
var listItems = require("./listItems.json")

@Injectable()
export class DataItemService {
    private _words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

    getDataItems(): DataItem[] {
        return DATAITEMS;
    }

    getIdenticalDataItems(size: number): DataItem[] {
        var result = new Array<DataItem>();
        for (var i = 0; i < size; i++) {
            result.push(new DataItem(i, "Item " + i, "This is item description."));
        }

        return result;
    }

    getPersonDataItems(): DataItem[] {
        var result = new Array<DataItem>();
        for (var i = 0; i < namesAndEmails.names.length; i++) {
            result.push(new DataItem(i, namesAndEmails.names[i], "This is item description"));
        }

        return result;
    }

    getNameEmailDataItems(): DataItem[] {
        var result = new Array<DataItem>();
        for (var i = 0; i < namesAndEmails.names.length; i++) {
            result.push(new DataItem(i, namesAndEmails.names[i], namesAndEmails.emails[i]));
        }

        return result;
    }

    getPostDataItems(): DataItem[] {
        var result = new Array<DataItem>();
        for (var i = 0; i < posts.names.length; i++) {
            result.push(new DataItem(i, posts.names[i], "This is item description", posts.titles[i], posts.text[i]));
        }

        return result;
    }

    getListItemsFromJson(): DataItem[] {
        var result = new Array<DataItem>();
        for (var i = 0; i < listItems.items.length; i++) {
            result.push(new DataItem(i, listItems.items[i].author, "This is item description", listItems.items[i].title, listItems.items[i].category, listItems.items[i].photo));
        }

        return result;
    }

    getStaggeredItems(): DataItem[] {
        var result = new Array<DataItem>();
        for (var i = 0; i < 50; i++) {
            result.push(new DataItem(i, "Item " + i, this.getRandomLengthString()));
        }

        return result;
    }

    private getRandomLengthString() {
      var sentenceLength = Math.round((Math.random() * 15));
      var result = this._words[0];
      for (var i = 0; i < sentenceLength; i++) {
       result += (this._words[i % this._words.length] + " ");
      }
       return result;
   }
}

export class DataItem {
    constructor(public id?: number, public name?: string, public description?: string, public title?: string, public text?: string, public image?: string, public selected?: boolean, public type?: string) {
    }
}

export var DATAITEMS: DataItem[] = [
    { "id": 1, "name": "Item 1", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image", "selected": false },
    { "id": 2, "name": "Item 2", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image", "selected": false },
    { "id": 3, "name": "Item 3", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image", "selected": false },
    { "id": 4, "name": "Item 4", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image", "selected": false },
    { "id": 5, "name": "Item 5", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image", "selected": false },
    { "id": 6, "name": "Item 6", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image", "selected": false },
    { "id": 7, "name": "Item 7", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image", "selected": false },
    { "id": 8, "name": "Item 8", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image", "selected": false },
    { "id": 9, "name": "Item 9", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image", "selected": false },
    { "id": 10, "name": "Item 10", "description": "This is item description.", "title": "This is item Title", "text": "This is item Text",  "image": "This is item Image" , "selected": false},
]