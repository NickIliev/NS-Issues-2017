"use strict";
var core_1 = require("@angular/core");
var items_services_1 = require("./items.services");
var xmlobjects = require("nativescript-xmlobjects");
var ItemsComponent = (function () {
    function ItemsComponent(myService) {
        this.myService = myService;
        this.response = '<?xml version="1.0"?>' +
            '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope/" soap:encodingStyle="http://www.w3.org/2003/05/soap-encoding">' +
            '<soap:Body>' +
            '<m:GetPrice xmlns:m="https://www.w3schools.com/prices">' +
            '<m:Item>Apples</m:Item>' +
            '</m:GetPrice>' +
            '</soap:Body>' +
            '</soap:Envelope>"';
    }
    ItemsComponent.prototype.ngOnInit = function () {
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
                var allAttributes = n.attributes(); // the attributes
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
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
        providers: [items_services_1.itemsService]
    }),
    __metadata("design:paramtypes", [items_services_1.itemsService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQsbURBQStDO0FBQy9DLG9EQUFzRDtBQVF0RCxJQUFhLGNBQWM7SUFXdkIsd0JBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFUcEMsYUFBUSxHQUFHLHVCQUF1QjtZQUN6QyxvSUFBb0k7WUFDcEksYUFBYTtZQUNiLHlEQUF5RDtZQUN6RCx5QkFBeUI7WUFDekIsZUFBZTtZQUNmLGNBQWM7WUFDZCxtQkFBbUIsQ0FBQztJQUUyQixDQUFDO0lBRWhELGlDQUFRLEdBQVI7UUFDSSxnQ0FBZ0M7UUFDaEMsMENBQTBDO1FBRTFDLHVDQUF1QztRQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyRSxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxlQUFlO2dCQUNmLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFFLGlCQUFpQjtnQkFFdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTNELGlFQUFpRTtnQkFDakUsSUFBSSxNQUFNLEdBQUcsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsQ0FBQztZQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBOUNELElBOENDO0FBOUNZLGNBQWM7SUFOMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLFNBQVMsRUFBRSxDQUFDLDZCQUFZLENBQUM7S0FDNUIsQ0FBQztxQ0FZaUMsNkJBQVk7R0FYbEMsY0FBYyxDQThDMUI7QUE5Q1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyB4bWxNb2R1bGUgZnJvbSBcInhtbFwiO1xuaW1wb3J0IHsgSHR0cCwgUmVxdWVzdCwgUmVzcG9uc2UsIEhlYWRlcnMsIFJlcXVlc3RNZXRob2QsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBpdGVtc1NlcnZpY2UgfSBmcm9tIFwiLi9pdGVtcy5zZXJ2aWNlc1wiXG5pbXBvcnQgKiBhcyB4bWxvYmplY3RzIGZyb20gXCJuYXRpdmVzY3JpcHQteG1sb2JqZWN0c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHByb3ZpZGVyczogW2l0ZW1zU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHVibGljIHJlc3BvbnNlID0gJzw/eG1sIHZlcnNpb249XCIxLjBcIj8+JyArXG4gICAgJzxzb2FwOkVudmVsb3BlIHhtbG5zOnNvYXA9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAzLzA1L3NvYXAtZW52ZWxvcGUvXCIgc29hcDplbmNvZGluZ1N0eWxlPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMy8wNS9zb2FwLWVuY29kaW5nXCI+JyArXG4gICAgJzxzb2FwOkJvZHk+JyArXG4gICAgJzxtOkdldFByaWNlIHhtbG5zOm09XCJodHRwczovL3d3dy53M3NjaG9vbHMuY29tL3ByaWNlc1wiPicgK1xuICAgICc8bTpJdGVtPkFwcGxlczwvbTpJdGVtPicgK1xuICAgICc8L206R2V0UHJpY2U+JyArXG4gICAgJzwvc29hcDpCb2R5PicgK1xuICAgICc8L3NvYXA6RW52ZWxvcGU+XCInO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBteVNlcnZpY2U6IGl0ZW1zU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gdXNpbmcgdGhlIGJ1aWxkLWluIHhtbCBtb2R1bGVcbiAgICAgICAgLy8gdGhpcy5teVNlcnZpY2UucGFyc2VYTUwodGhpcy5yZXNwb25zZSk7XG5cbiAgICAgICAgLy8gdXNpbmcgdGhlIHBhcnNlZCBYTWwgZnJvbSBYbWxPYmplY3RzXG4gICAgICAgIHZhciBwYXJzZWREb2MgPSB0aGlzLm15U2VydmljZS5wYXJzZVhNTHdpdGhYTUxPYmplY3RzKHRoaXMucmVzcG9uc2UpO1xuXG4gICAgICAgIHZhciByb290RWxlbWVudCA9IHBhcnNlZERvYy5yb290O1xuICAgICAgICB2YXIgYWxsTm9kZXMgPSByb290RWxlbWVudC5ub2RlcygpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbiA9IGFsbE5vZGVzW2ldO1xuXG4gICAgICAgICAgICBpZiAobiBpbnN0YW5jZW9mIHhtbG9iamVjdHMuWEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBYQXR0cmlidXRlW11cbiAgICAgICAgICAgICAgICB2YXIgYWxsQXR0cmlidXRlcyA9IG4uYXR0cmlidXRlcygpOyAgLy8gdGhlIGF0dHJpYnV0ZXNcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSSBhbSBhbiBlbGVtZW50IHdpdGggYXR0cmlidXRlczogXCIgKyBuLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIC8vIEhlcmUgeW91IGNhbiBjcmVhdGUgeW91ciBKU09OIG9iamVjdCBmb3IgdGhlIHZhbHVlIEFwcGxlcyBlLmcuXG4gICAgICAgICAgICAgICAgdmFyIGZydWl0cyA9IHsgXCJmaXJzdEZydWl0XCI6IG4udmFsdWUgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZydWl0cy5maXJzdEZydWl0OiBcIiArIGZydWl0cy5maXJzdEZydWl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG4gaW5zdGFuY2VvZiB4bWxvYmplY3RzLlhDb21tZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJIGFtIGEgY29tbWVudDogXCIgKyBuLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG4gaW5zdGFuY2VvZiB4bWxvYmplY3RzLlhUZXh0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJIGFtIGEgdGV4dC5cIiArIG4udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobiBpbnN0YW5jZW9mIHhtbG9iamVjdHMuWENEYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJIGFtIGEgQ0RBVEE6IFwiICsgbi52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=