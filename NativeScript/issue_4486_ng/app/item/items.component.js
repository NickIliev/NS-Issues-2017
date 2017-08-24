"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var fs = require("file-system");
var base64 = require("base-64");
var ItemsComponent = (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    ItemsComponent.prototype.writeSText = function () {
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "base.txt");
        var contents = base64.decode("c2FtcGxlIGJhc2U2NCBzdHJpbmc=");
        var file = fs.File.fromPath(path);
        var error;
        file.writeText(contents).then(function (res) {
            file.readText().then(function (cont) {
                console.log(cont);
            });
        });
    };
    ItemsComponent.prototype.writeSync = function () {
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "base.txt");
        var file = fs.File.fromPath(path);
        var source = file.readSync(function (e) { console.log(e); });
        var destPath = fs.path.join(documents.path, "dest.txt");
        var destinationFile = fs.File.fromPath(destPath);
        destinationFile.writeSync(source, function (e) { console.log(e); });
        setTimeout(function () {
            destinationFile.readText().then(function (content) {
                console.log(content);
            });
        }, 500);
    };
    ItemsComponent.prototype.readFile = function () {
        var documents = fs.knownFolders.documents();
        var myFile = documents.getFile("base.txt");
        var source = myFile.readSync(function (e) { console.log(e); });
    };
    ItemsComponent.prototype.checkIfFileExists = function () {
        var documents = fs.knownFolders.documents();
        var filePath = fs.path.join(documents.path, "base.txt");
        console.log(fs.File.exists(filePath));
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQUM3QyxnQ0FBa0M7QUFFbEMsZ0NBQWtDO0FBT2xDLElBQWEsY0FBYztJQUd2Qiw2SUFBNkk7SUFDN0ksaUhBQWlIO0lBQ2pILHdCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFakQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsbUNBQVUsR0FBVjtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDNUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxLQUFLLENBQUM7UUFHVixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDN0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBQSxDQUFDLElBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBELElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEQsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBQSxDQUFDLElBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNELFVBQVUsQ0FBQztZQUNQLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVDLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0MsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFBLENBQUMsSUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELDBDQUFpQixHQUFqQjtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDNUMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUV4RCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXpERCxJQXlEQztBQXpEWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtLQUN4QyxDQUFDO3FDQU1tQywwQkFBVztHQUxuQyxjQUFjLENBeUQxQjtBQXpEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcblxuaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gXCJiYXNlLTY0XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpdGVtczogSXRlbVtdO1xuXG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy4oCZcyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLiBcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw4oCZcyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgd3JpdGVTVGV4dCgpIHtcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcbiAgICAgICAgbGV0IHBhdGggPSBmcy5wYXRoLmpvaW4oZG9jdW1lbnRzLnBhdGgsIFwiYmFzZS50eHRcIik7XG4gICAgICAgIGxldCBjb250ZW50cyA9IGJhc2U2NC5kZWNvZGUoXCJjMkZ0Y0d4bElHSmhjMlUyTkNCemRISnBibWM9XCIpO1xuICAgICAgICBsZXQgZmlsZSA9IGZzLkZpbGUuZnJvbVBhdGgocGF0aCk7XG4gICAgICAgIGxldCBlcnJvcjtcblxuXG4gICAgICAgIGZpbGUud3JpdGVUZXh0KGNvbnRlbnRzKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBmaWxlLnJlYWRUZXh0KCkudGhlbihjb250ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb250KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdyaXRlU3luYygpIHtcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcbiAgICAgICAgbGV0IHBhdGggPSBmcy5wYXRoLmpvaW4oZG9jdW1lbnRzLnBhdGgsIFwiYmFzZS50eHRcIik7XG4gICAgICAgIGxldCBmaWxlID0gZnMuRmlsZS5mcm9tUGF0aChwYXRoKTtcblxuICAgICAgICB2YXIgc291cmNlID0gZmlsZS5yZWFkU3luYyhlID0+IHsgY29uc29sZS5sb2coZSkgfSk7XG5cbiAgICAgICAgbGV0IGRlc3RQYXRoID0gZnMucGF0aC5qb2luKGRvY3VtZW50cy5wYXRoLCBcImRlc3QudHh0XCIpO1xuICAgICAgICBsZXQgZGVzdGluYXRpb25GaWxlID0gZnMuRmlsZS5mcm9tUGF0aChkZXN0UGF0aCk7XG4gICAgICAgIGRlc3RpbmF0aW9uRmlsZS53cml0ZVN5bmMoc291cmNlLCBlID0+IHsgY29uc29sZS5sb2coZSkgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uRmlsZS5yZWFkVGV4dCgpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29udGVudCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgIHJlYWRGaWxlKCkge1xuICAgICAgICBsZXQgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xuICAgICAgICBsZXQgbXlGaWxlID0gZG9jdW1lbnRzLmdldEZpbGUoXCJiYXNlLnR4dFwiKTtcblxuICAgICAgICBsZXQgc291cmNlID0gbXlGaWxlLnJlYWRTeW5jKGUgPT4geyBjb25zb2xlLmxvZyhlKSB9KTtcbiAgICB9XG5cbiAgICBjaGVja0lmRmlsZUV4aXN0cygpIHtcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcbiAgICAgICAgdmFyIGZpbGVQYXRoID0gZnMucGF0aC5qb2luKGRvY3VtZW50cy5wYXRoLCBcImJhc2UudHh0XCIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGZzLkZpbGUuZXhpc3RzKGZpbGVQYXRoKSk7XG4gICAgfVxufVxuIl19