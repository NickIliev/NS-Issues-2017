
import { Injectable } from "@angular/core";
import { Http, Request, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import * as xmlModule from "xml";
import * as xmlobjects from "nativescript-xmlobjects";

@Injectable()
export class itemsService {

    constructor(private http: Http) { }

    // callSOAP() {
    //     var soapRequest = '<?xml version="1.0" encoding="utf-8"?>' +
    //         '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    //         '<soap:Body>' +
    //         '<GetUKLocationByTown xmlns="http://www.webserviceX.NET">' +
    //         '<Town>London</Town>' +
    //         '</GetUKLocationByTown>' +
    //         '</soap:Body>' +
    //         '</soap:Envelope>';

    //     var headers = new Headers();
    //     headers.append('Content-Type', 'text/xml');
    //     headers.append('Access-Control-Request-Method', 'POST');
    //     headers.append('Access-Control-Allow-Origin', 'http://localhost:3004');
    //     let options = new RequestOptions({ headers: headers });

    //     this.http.post("http://www.webserviceX.NET/uklocation.asmx", soapRequest, { headers: headers })
    //         .subscribe(response => {
    //             console.dump(response); 
    //         })
    // }

    parseXMLwithXMLObjects(responseText) {
        var parsedDoc;
        return parsedDoc = xmlobjects.parse(responseText);
    }


    // using XML module from NativeScript
    parseXML(responseText) {
        var onEventCallback = function (event: xmlModule.ParserEvent) {
            switch (event.eventType) {

                case xmlModule.ParserEventType.StartElement:
                    var message = event.eventType + " " + event.elementName;
                    if (event.attributes) {
                        message += ", Attributes:";
                        for (var attributeName in event.attributes) {
                            if (event.attributes.hasOwnProperty(attributeName)) {
                                message += " " + attributeName + "=\"" + event.attributes[attributeName] + "\"";
                            }
                        }
                    }
                    console.log(message);
                    break;

                case xmlModule.ParserEventType.EndElement:
                    console.log(event.eventType + " " + event.elementName);
                    break;

                case xmlModule.ParserEventType.Text:
                    var significantText = event.data.trim();
                    if (significantText !== "") {
                        console.log(event.eventType + "=\"" + significantText + "\"");
                    }
                    break;
            }
        };

        var onErrorCallback = function (error: Error) {
            console.log("Error: " + error.message);
        };

        var xmlParser = new xmlModule.XmlParser(onEventCallback, onErrorCallback);
        xmlParser.parse(responseText);
    }

}