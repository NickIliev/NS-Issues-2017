"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var ItemService = (function () {
    function ItemService(http) {
        this.http = http;
        this.serverUrl = "https://httpbin.org/get";
    }
    ItemService.prototype.binaryRequest = function () {
        var options = this.createOptionssAB();
        return this.http.get("https://httpbin.org/stream-bytes/55", options)
            .subscribe(function (res) {
            console.log("status: " + res.status);
            console.log("arrayBuffer: " + res.arrayBuffer);
            return res.arrayBuffer;
        });
    };
    ItemService.prototype.createOptionssAB = function () {
        var requestOptions = new http_1.RequestOptions();
        requestOptions.responseType = http_1.ResponseContentType.ArrayBuffer; // if this is set to ResponseContentType.Json ит воулд ворк
        return requestOptions;
    };
    return ItemService;
}());
ItemService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUEyRztBQUczRyxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBRzlCLElBQWEsV0FBVztJQUdwQixxQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGdEIsY0FBUyxHQUFHLHlCQUF5QixDQUFDO0lBRVosQ0FBQztJQUVuQyxtQ0FBYSxHQUFiO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLE9BQU8sQ0FBQzthQUMvRCxTQUFTLENBQUMsVUFBQyxHQUFhO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBRU8sc0NBQWdCLEdBQXhCO1FBQ0ksSUFBSSxjQUFjLEdBQUcsSUFBSSxxQkFBYyxFQUFFLENBQUM7UUFFMUMsY0FBYyxDQUFDLFlBQVksR0FBRywwQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQywyREFBMkQ7UUFFMUgsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBRUwsa0JBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBeEJZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FJaUIsV0FBSTtHQUhyQixXQUFXLENBd0J2QjtBQXhCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlc3BvbnNlQ29udGVudFR5cGUsIFJlc3BvbnNlVHlwZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5cbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEl0ZW1TZXJ2aWNlIHtcbiAgICBwcml2YXRlIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9odHRwYmluLm9yZy9nZXRcIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG5cbiAgICBiaW5hcnlSZXF1ZXN0KCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuY3JlYXRlT3B0aW9uc3NBQigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFwiaHR0cHM6Ly9odHRwYmluLm9yZy9zdHJlYW0tYnl0ZXMvNTVcIiwgb3B0aW9ucylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1czogXCIgKyByZXMuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFycmF5QnVmZmVyOiBcIiArIHJlcy5hcnJheUJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5hcnJheUJ1ZmZlcjtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVPcHRpb25zc0FCKCkge1xuICAgICAgICBsZXQgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoKTtcblxuICAgICAgICByZXF1ZXN0T3B0aW9ucy5yZXNwb25zZVR5cGUgPSBSZXNwb25zZUNvbnRlbnRUeXBlLkFycmF5QnVmZmVyOyAvLyBpZiB0aGlzIGlzIHNldCB0byBSZXNwb25zZUNvbnRlbnRUeXBlLkpzb24g0LjRgiDQstC+0YPQu9C0INCy0L7RgNC6XG5cbiAgICAgICAgcmV0dXJuIHJlcXVlc3RPcHRpb25zO1xuICAgIH1cblxufSJdfQ==