"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var xmlModule = require("xml");
var xmlobjects = require("nativescript-xmlobjects");
var itemsService = (function () {
    function itemsService(http) {
        this.http = http;
    }
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
    itemsService.prototype.parseXMLwithXMLObjects = function (responseText) {
        var parsedDoc;
        return parsedDoc = xmlobjects.parse(responseText);
    };
    // using XML module from NativeScript
    itemsService.prototype.parseXML = function (responseText) {
        var onEventCallback = function (event) {
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
        var onErrorCallback = function (error) {
            console.log("Error: " + error.message);
        };
        var xmlParser = new xmlModule.XmlParser(onEventCallback, onErrorCallback);
        xmlParser.parse(responseText);
    };
    return itemsService;
}());
itemsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], itemsService);
exports.itemsService = itemsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpdGVtcy5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esc0NBQTJDO0FBQzNDLHNDQUFnRztBQUNoRywrQkFBaUM7QUFDakMsb0RBQXNEO0FBR3RELElBQWEsWUFBWTtJQUVyQixzQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRW5DLGVBQWU7SUFDZixtRUFBbUU7SUFDbkUsd0xBQXdMO0lBQ3hMLDBCQUEwQjtJQUMxQix1RUFBdUU7SUFDdkUsa0NBQWtDO0lBQ2xDLHFDQUFxQztJQUNyQywyQkFBMkI7SUFDM0IsOEJBQThCO0lBRTlCLG1DQUFtQztJQUNuQyxrREFBa0Q7SUFDbEQsK0RBQStEO0lBQy9ELDhFQUE4RTtJQUM5RSw4REFBOEQ7SUFFOUQsc0dBQXNHO0lBQ3RHLG1DQUFtQztJQUNuQyx1Q0FBdUM7SUFDdkMsYUFBYTtJQUNiLElBQUk7SUFFSiw2Q0FBc0IsR0FBdEIsVUFBdUIsWUFBWTtRQUMvQixJQUFJLFNBQVMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBR0QscUNBQXFDO0lBQ3JDLCtCQUFRLEdBQVIsVUFBUyxZQUFZO1FBQ2pCLElBQUksZUFBZSxHQUFHLFVBQVUsS0FBNEI7WUFDeEQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRCLEtBQUssU0FBUyxDQUFDLGVBQWUsQ0FBQyxZQUFZO29CQUN2QyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO29CQUN4RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsT0FBTyxJQUFJLGVBQWUsQ0FBQzt3QkFDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxhQUFhLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQ3pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDakQsT0FBTyxJQUFJLEdBQUcsR0FBRyxhQUFhLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDOzRCQUNwRixDQUFDO3dCQUNMLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQixLQUFLLENBQUM7Z0JBRVYsS0FBSyxTQUFTLENBQUMsZUFBZSxDQUFDLFVBQVU7b0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN2RCxLQUFLLENBQUM7Z0JBRVYsS0FBSyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUk7b0JBQy9CLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDbEUsQ0FBQztvQkFDRCxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsSUFBSSxlQUFlLEdBQUcsVUFBVSxLQUFZO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUM7UUFFRixJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FBQyxBQXZFRCxJQXVFQztBQXZFWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7cUNBR2lCLFdBQUk7R0FGckIsWUFBWSxDQXVFeEI7QUF2RVksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAsIFJlcXVlc3QsIFJlc3BvbnNlLCBIZWFkZXJzLCBSZXF1ZXN0TWV0aG9kLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgKiBhcyB4bWxNb2R1bGUgZnJvbSBcInhtbFwiO1xyXG5pbXBvcnQgKiBhcyB4bWxvYmplY3RzIGZyb20gXCJuYXRpdmVzY3JpcHQteG1sb2JqZWN0c1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgaXRlbXNTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG5cclxuICAgIC8vIGNhbGxTT0FQKCkge1xyXG4gICAgLy8gICAgIHZhciBzb2FwUmVxdWVzdCA9ICc8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJ1dGYtOFwiPz4nICtcclxuICAgIC8vICAgICAgICAgJzxzb2FwOkVudmVsb3BlIHhtbG5zOnhzaT1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlXCIgeG1sbnM6eHNkPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWFcIiB4bWxuczpzb2FwPVwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS9cIj4nICtcclxuICAgIC8vICAgICAgICAgJzxzb2FwOkJvZHk+JyArXHJcbiAgICAvLyAgICAgICAgICc8R2V0VUtMb2NhdGlvbkJ5VG93biB4bWxucz1cImh0dHA6Ly93d3cud2Vic2VydmljZVguTkVUXCI+JyArXHJcbiAgICAvLyAgICAgICAgICc8VG93bj5Mb25kb248L1Rvd24+JyArXHJcbiAgICAvLyAgICAgICAgICc8L0dldFVLTG9jYXRpb25CeVRvd24+JyArXHJcbiAgICAvLyAgICAgICAgICc8L3NvYXA6Qm9keT4nICtcclxuICAgIC8vICAgICAgICAgJzwvc29hcDpFbnZlbG9wZT4nO1xyXG5cclxuICAgIC8vICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAvLyAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbCcpO1xyXG4gICAgLy8gICAgIGhlYWRlcnMuYXBwZW5kKCdBY2Nlc3MtQ29udHJvbC1SZXF1ZXN0LU1ldGhvZCcsICdQT1NUJyk7XHJcbiAgICAvLyAgICAgaGVhZGVycy5hcHBlbmQoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICdodHRwOi8vbG9jYWxob3N0OjMwMDQnKTtcclxuICAgIC8vICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgLy8gICAgIHRoaXMuaHR0cC5wb3N0KFwiaHR0cDovL3d3dy53ZWJzZXJ2aWNlWC5ORVQvdWtsb2NhdGlvbi5hc214XCIsIHNvYXBSZXF1ZXN0LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgIC8vICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmR1bXAocmVzcG9uc2UpOyBcclxuICAgIC8vICAgICAgICAgfSlcclxuICAgIC8vIH1cclxuXHJcbiAgICBwYXJzZVhNTHdpdGhYTUxPYmplY3RzKHJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgIHZhciBwYXJzZWREb2M7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlZERvYyA9IHhtbG9iamVjdHMucGFyc2UocmVzcG9uc2VUZXh0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gdXNpbmcgWE1MIG1vZHVsZSBmcm9tIE5hdGl2ZVNjcmlwdFxyXG4gICAgcGFyc2VYTUwocmVzcG9uc2VUZXh0KSB7XHJcbiAgICAgICAgdmFyIG9uRXZlbnRDYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudDogeG1sTW9kdWxlLlBhcnNlckV2ZW50KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuZXZlbnRUeXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSB4bWxNb2R1bGUuUGFyc2VyRXZlbnRUeXBlLlN0YXJ0RWxlbWVudDpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGV2ZW50LmV2ZW50VHlwZSArIFwiIFwiICsgZXZlbnQuZWxlbWVudE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSBcIiwgQXR0cmlidXRlczpcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYXR0cmlidXRlTmFtZSBpbiBldmVudC5hdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGVOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCIgXCIgKyBhdHRyaWJ1dGVOYW1lICsgXCI9XFxcIlwiICsgZXZlbnQuYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSArIFwiXFxcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgeG1sTW9kdWxlLlBhcnNlckV2ZW50VHlwZS5FbmRFbGVtZW50OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmV2ZW50VHlwZSArIFwiIFwiICsgZXZlbnQuZWxlbWVudE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgeG1sTW9kdWxlLlBhcnNlckV2ZW50VHlwZS5UZXh0OlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaWduaWZpY2FudFRleHQgPSBldmVudC5kYXRhLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2lnbmlmaWNhbnRUZXh0ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmV2ZW50VHlwZSArIFwiPVxcXCJcIiArIHNpZ25pZmljYW50VGV4dCArIFwiXFxcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgb25FcnJvckNhbGxiYWNrID0gZnVuY3Rpb24gKGVycm9yOiBFcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB4bWxQYXJzZXIgPSBuZXcgeG1sTW9kdWxlLlhtbFBhcnNlcihvbkV2ZW50Q2FsbGJhY2ssIG9uRXJyb3JDYWxsYmFjayk7XHJcbiAgICAgICAgeG1sUGFyc2VyLnBhcnNlKHJlc3BvbnNlVGV4dCk7XHJcbiAgICB9XHJcblxyXG59Il19