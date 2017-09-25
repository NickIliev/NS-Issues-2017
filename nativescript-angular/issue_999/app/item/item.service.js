"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemService = (function () {
    function ItemService() {
        this.items = new Array({
            "NodeId": 2259,
            "Number": 1,
            "Details": "",
            "Url": ""
        }, {
            "NodeId": 7534,
            "Number": 2,
            "Details": "",
            "Url": ""
        }, {
            "NodeId": 3585,
            "Number": 3,
            "Details": "",
            "Url": "http://www.ncbi.nlm.nih.gov/pubmed/18489970"
        }, {
            "NodeId": 7535,
            "Number": 4,
            "Details": "",
            "Url": "http://www.ncbi.nlm.nih.gov/pubmed/9701682"
        });
    }
    ItemService.prototype.getItems = function () {
        return this.items;
    };
    ItemService.prototype.getItem = function (id) {
        return this.items.filter(function (item) { return item.id === id; })[0];
    };
    ItemService = __decorate([
        core_1.Injectable()
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDO0lBREE7UUFFWSxVQUFLLEdBQUcsSUFBSSxLQUFLLENBQ3JCO1lBQ0ksUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQztZQUNYLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7U0FDWixFQUNEO1lBQ0ksUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQztZQUNYLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7U0FDWixFQUNEO1lBQ0ksUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQztZQUNYLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLDZDQUE2QztTQUN2RCxFQUNEO1lBQ0ksUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQztZQUNYLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLDRDQUE0QztTQUN0RCxDQUNKLENBQUM7SUFTTixDQUFDO0lBUEcsOEJBQVEsR0FBUjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsRUFBVTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFsQ1EsV0FBVztRQUR2QixpQkFBVSxFQUFFO09BQ0EsV0FBVyxDQW1DdkI7SUFBRCxrQkFBQztDQUFBLEFBbkNELElBbUNDO0FBbkNZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJdGVtU2VydmljZSB7XG4gICAgcHJpdmF0ZSBpdGVtcyA9IG5ldyBBcnJheTxhbnk+KFxuICAgICAgICB7XG4gICAgICAgICAgICBcIk5vZGVJZFwiOiAyMjU5LFxuICAgICAgICAgICAgXCJOdW1iZXJcIjogMSxcbiAgICAgICAgICAgIFwiRGV0YWlsc1wiOiBcIlwiLFxuICAgICAgICAgICAgXCJVcmxcIjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcIk5vZGVJZFwiOiA3NTM0LFxuICAgICAgICAgICAgXCJOdW1iZXJcIjogMixcbiAgICAgICAgICAgIFwiRGV0YWlsc1wiOiBcIlwiLFxuICAgICAgICAgICAgXCJVcmxcIjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcIk5vZGVJZFwiOiAzNTg1LFxuICAgICAgICAgICAgXCJOdW1iZXJcIjogMyxcbiAgICAgICAgICAgIFwiRGV0YWlsc1wiOiBcIlwiLFxuICAgICAgICAgICAgXCJVcmxcIjogXCJodHRwOi8vd3d3Lm5jYmkubmxtLm5paC5nb3YvcHVibWVkLzE4NDg5OTcwXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJOb2RlSWRcIjogNzUzNSxcbiAgICAgICAgICAgIFwiTnVtYmVyXCI6IDQsXG4gICAgICAgICAgICBcIkRldGFpbHNcIjogXCJcIixcbiAgICAgICAgICAgIFwiVXJsXCI6IFwiaHR0cDovL3d3dy5uY2JpLm5sbS5uaWguZ292L3B1Ym1lZC85NzAxNjgyXCJcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBnZXRJdGVtcygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgIH1cblxuICAgIGdldEl0ZW0oaWQ6IG51bWJlcik6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgPT09IGlkKVswXTtcbiAgICB9XG59XG4iXX0=