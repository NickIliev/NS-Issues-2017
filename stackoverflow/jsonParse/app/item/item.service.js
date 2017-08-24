"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var item_1 = require("./item");
var MyHttpGetService = MyHttpGetService_1 = (function () {
    function MyHttpGetService(http) {
        this.http = http;
    }
    MyHttpGetService.prototype.load = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this.http.get(MyHttpGetService_1.apiUrl, {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var groceryList = [];
            data.Result.forEach(function (contacts) {
                groceryList.push(new item_1.Grocery(contacts.id, contacts.name));
            });
            console.log("groceryList.length: " + groceryList.length);
            return groceryList;
        })
            .catch(this.handleErrors);
    };
    MyHttpGetService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    return MyHttpGetService;
}());
MyHttpGetService.apiUrl = "http://api.androidhive.info/contacts/";
MyHttpGetService = MyHttpGetService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MyHttpGetService);
exports.MyHttpGetService = MyHttpGetService;
var MyHttpGetService_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUN4RCw4QkFBcUM7QUFDckMsaUNBQStCO0FBRS9CLCtCQUFpQztBQUdqQyxJQUFhLGdCQUFnQjtJQUMzQiwwQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBRyxDQUFDO0lBSWxDLCtCQUFJLEdBQUo7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUM1QyxPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDO2FBQ0QsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN0QixHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ1AsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtnQkFDM0IsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDeEQsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCx1Q0FBWSxHQUFaLFVBQWEsS0FBZTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBMUJRLHVCQUFNLEdBQUcsdUNBQXVDLENBQUM7QUFIN0MsZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7cUNBRWUsV0FBSTtHQURuQixnQkFBZ0IsQ0E2QjVCO0FBN0JZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuaW1wb3J0IHsgR3JvY2VyeSB9IGZyb20gXCIuL2l0ZW1cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE15SHR0cEdldFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHt9XG5cbiAgc3RhdGljIGFwaVVybCA9IFwiaHR0cDovL2FwaS5hbmRyb2lkaGl2ZS5pbmZvL2NvbnRhY3RzL1wiO1xuXG4gIGxvYWQoKSB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KE15SHR0cEdldFNlcnZpY2UuYXBpVXJsLCB7XG4gICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgfSlcbiAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC5tYXAoZGF0YSA9PiB7XG4gICAgICBsZXQgZ3JvY2VyeUxpc3QgPSBbXTtcbiAgICAgIGRhdGEuUmVzdWx0LmZvckVhY2goKGNvbnRhY3RzKSA9PiB7XG4gICAgICAgIGdyb2NlcnlMaXN0LnB1c2gobmV3IEdyb2NlcnkoY29udGFjdHMuaWQsIGNvbnRhY3RzLm5hbWUpKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zb2xlLmxvZyhcImdyb2NlcnlMaXN0Lmxlbmd0aDogXCIgKyBncm9jZXJ5TGlzdC5sZW5ndGgpXG4gICAgICByZXR1cm4gZ3JvY2VyeUxpc3Q7XG4gICAgfSlcbiAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxufSJdfQ==