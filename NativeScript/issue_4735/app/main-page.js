"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var pageData = new observable_1.Observable();
function onNavigatingTo(args) {
    var page = args.object;
    pageData.set("MemberUserID", 99);
    var comments = [{
            MemberUserID: 11
        }, {
            MemberUserID: 99
        }];
    pageData.set("comments", comments);
    page.bindingContext = pageData;
}
exports.onNavigatingTo = onNavigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDLElBQUksUUFBUSxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO0FBRWhDLHdCQUErQixJQUFJO0lBQy9CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFdkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFakMsSUFBSSxRQUFRLEdBQUcsQ0FBQztZQUNaLFlBQVksRUFBRSxFQUFFO1NBQ25CLEVBQUM7WUFDRSxZQUFZLEVBQUUsRUFBRTtTQUNuQixDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVuQyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztBQUNuQyxDQUFDO0FBZEQsd0NBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuXG5sZXQgcGFnZURhdGEgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJncykge1xuICAgIGxldCBwYWdlID0gYXJncy5vYmplY3Q7XG5cbiAgICBwYWdlRGF0YS5zZXQoXCJNZW1iZXJVc2VySURcIiwgOTkpO1xuXG4gICAgbGV0IGNvbW1lbnRzID0gW3tcbiAgICAgICAgTWVtYmVyVXNlcklEOiAxMVxuICAgIH0se1xuICAgICAgICBNZW1iZXJVc2VySUQ6IDk5XG4gICAgfV07XG5cbiAgICBwYWdlRGF0YS5zZXQoXCJjb21tZW50c1wiLCBjb21tZW50cyk7XG5cbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gcGFnZURhdGE7XG59XG4iXX0=