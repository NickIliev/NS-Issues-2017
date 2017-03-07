"use strict";
var TicketViewModel = (function () {
    function TicketViewModel() {
    }
    Object.defineProperty(TicketViewModel.prototype, "ticketOrder", {
        get: function () {
            if (!this._ticketOrder) {
                this._ticketOrder = new TicketOrder();
            }
            return this._ticketOrder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TicketViewModel.prototype, "movies", {
        get: function () {
            if (!this._movies) {
                this._movies = new Array();
                this._movies.push(new Movie(123, "Zootopia"));
                this._movies.push(new Movie(217, "Captain America"));
                this._movies.push(new Movie(324, "The Jungle Book"));
            }
            return this._movies;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TicketViewModel.prototype, "movieNames", {
        get: function () {
            if (!this._movieNames) {
                this._movieNames = this.movies.map(function (value) { return value.name; });
            }
            return this._movieNames;
        },
        enumerable: true,
        configurable: true
    });
    return TicketViewModel;
}());
exports.TicketViewModel = TicketViewModel;
var Movie = (function () {
    function Movie(key, name) {
        this.key = key;
        this.name = name;
    }
    return Movie;
}());
exports.Movie = Movie;
var TicketOrder = (function () {
    function TicketOrder() {
        this.movie = 123;
    }
    return TicketOrder;
}());
exports.TicketOrder = TicketOrder;
// << dataform-converters-code 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQU1JO0lBQ0EsQ0FBQztJQUVELHNCQUFJLHdDQUFXO2FBQWY7WUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDMUMsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksbUNBQU07YUFBVjtZQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQVMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksdUNBQVU7YUFBZDtZQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFZLElBQUssT0FBQSxLQUFLLENBQUMsSUFBSSxFQUFWLENBQVUsQ0FBQyxDQUFDO1lBQ3JFLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVMLHNCQUFDO0FBQUQsQ0FBQyxBQWxDRCxJQWtDQztBQWxDWSwwQ0FBZTtBQW9DNUI7SUFJSSxlQUFZLEdBQVcsRUFBRSxJQUFZO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLHNCQUFLO0FBVWxCO0lBR0k7UUFGTyxVQUFLLEdBQVcsR0FBRyxDQUFDO0lBRzNCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksa0NBQVc7QUFNeEIsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRpY2tldFZpZXdNb2RlbCAge1xuXG4gICAgcHJpdmF0ZSBfdGlja2V0T3JkZXI6IFRpY2tldE9yZGVyO1xuICAgIHByaXZhdGUgX21vdmllczogQXJyYXk8TW92aWU+O1xuICAgIHByaXZhdGUgX21vdmllTmFtZXM6IEFycmF5PFN0cmluZz47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXQgdGlja2V0T3JkZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5fdGlja2V0T3JkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpY2tldE9yZGVyID0gbmV3IFRpY2tldE9yZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpY2tldE9yZGVyO1xuICAgIH1cblxuICAgIGdldCBtb3ZpZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbW92aWVzKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZpZXMgPSBuZXcgQXJyYXk8TW92aWU+KCk7XG4gICAgICAgICAgICB0aGlzLl9tb3ZpZXMucHVzaChuZXcgTW92aWUoMTIzLCBcIlpvb3RvcGlhXCIpKTtcbiAgICAgICAgICAgIHRoaXMuX21vdmllcy5wdXNoKG5ldyBNb3ZpZSgyMTcsIFwiQ2FwdGFpbiBBbWVyaWNhXCIpKTtcbiAgICAgICAgICAgIHRoaXMuX21vdmllcy5wdXNoKG5ldyBNb3ZpZSgzMjQsIFwiVGhlIEp1bmdsZSBCb29rXCIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbW92aWVzO1xuICAgIH1cblxuXG4gICAgZ2V0IG1vdmllTmFtZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbW92aWVOYW1lcykge1xuICAgICAgICAgICAgdGhpcy5fbW92aWVOYW1lcyA9IHRoaXMubW92aWVzLm1hcCgodmFsdWU6IE1vdmllKSA9PiB2YWx1ZS5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbW92aWVOYW1lcztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIE1vdmllIHtcbiAgICBwdWJsaWMga2V5OiBudW1iZXI7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGtleTogbnVtYmVyLCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGlja2V0T3JkZXIge1xuICAgIHB1YmxpYyBtb3ZpZTogbnVtYmVyID0gMTIzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxufVxuLy8gPDwgZGF0YWZvcm0tY29udmVydGVycy1jb2RlIl19