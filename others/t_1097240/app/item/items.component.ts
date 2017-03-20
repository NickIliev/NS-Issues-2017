import { Component, OnInit } from "@angular/core";
import * as xmlModule from "xml";
import { Http, Request, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { itemsService } from "./items.services"
import * as xmlobjects from "nativescript-xmlobjects";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    providers: [itemsService]
})
export class ItemsComponent implements OnInit {

    public response = '<?xml version="1.0"?>' +
    '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope/" soap:encodingStyle="http://www.w3.org/2003/05/soap-encoding">' +
    '<soap:Body>' +
    '<m:GetPrice xmlns:m="https://www.w3schools.com/prices">' +
    '<m:Item>Apples</m:Item>' +
    '</m:GetPrice>' +
    '</soap:Body>' +
    '</soap:Envelope>"';

    constructor(private myService: itemsService) { }

    ngOnInit(): void {
        // using the build-in xml module
        // this.myService.parseXML(this.response);

        // using the parsed XMl from XmlObjects
        var parsedDoc = this.myService.parseXMLwithXMLObjects(this.response);

        var rootElement = parsedDoc.root;
        var allNodes = rootElement.nodes();
        for (var i = 0; i < allNodes.length; i++) {
            var n = allNodes[i];

            if (n instanceof xmlobjects.XElement) {
                // XAttribute[]
                var allAttributes = n.attributes();  // the attributes

                console.log("I am an element with attributes: " + n.value);

                // Here you can create your JSON object for the value Apples e.g.
                var fruits = { "firstFruit": n.value };
                console.log("fruits.firstFruit: " + fruits.firstFruit);
            }
            else if (n instanceof xmlobjects.XComment) {
                console.log("I am a comment: " + n.value);
            }
            else if (n instanceof xmlobjects.XText) {
                console.log("I am a text." + n.value);
            }
            else if (n instanceof xmlobjects.XCData) {
                console.log("I am a CDATA: " + n.value);
            }
        }
    }
}
