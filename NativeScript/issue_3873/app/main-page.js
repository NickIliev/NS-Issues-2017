"use strict";
var main_view_model_1 = require("./main-view-model");
var vm = new main_view_model_1.ViewModel();
var lv;
function selectItemTemplate(item, index, items) {
    return item.id % 10 === 0 ? "red" : item.id % 2 === 0 ? "green" : "yellow";
}
exports.selectItemTemplate = selectItemTemplate;
function pageLoaded(args) {
    var page = args.object;
    lv = page.getViewById("lv2");
    page.bindingContext = vm;
}
exports.pageLoaded = pageLoaded;
function onItemTap(args) {
    console.log("onItemTap");
    var items = vm.get("items");
    items.push(new main_view_model_1.Item("new item", 111)); // yellow
    items.push(new main_view_model_1.Item("new item", 1000)); // red
    items.push(new main_view_model_1.Item("new item", 222)); // green
    items.push(new main_view_model_1.Item("new item", 333)); // yellow
    items.push(new main_view_model_1.Item("new item", 444)); // green
    items.push(new main_view_model_1.Item("new item", 555)); // yellow
    items.push(new main_view_model_1.Item("new item", 2000)); // red
    items.push(new main_view_model_1.Item("new item", 666)); // green
    items.push(new main_view_model_1.Item("new item", 777)); // yellow
    items.push(new main_view_model_1.Item("new item", 888)); // green
    items.push(new main_view_model_1.Item("new item", 999)); // yellow
    items.push(new main_view_model_1.Item("new item", 3000)); // red
    vm.set("items", items);
    // vm.set("items", new ObservableArray([new Item("new item", 111), new Item("new item", 222), new Item("new item", 333), new Item("new item", 444), new Item("new item", 555), new Item("new item", 666), new Item("new item", 777), new Item("new item", 888)]))
}
exports.onItemTap = onItemTap;
var scrollToBottom = true;
function onScroll(args) {
    var page = args.object.page;
    var gridLayout = page.getViewById("grid-layout");
    for (var i = 0, length_1 = gridLayout.getChildrenCount(); i < length_1; i++) {
        var listView = gridLayout.getChildAt(i);
        listView.scrollToIndex(scrollToBottom ? listView.items.length - 1 : 0);
    }
    scrollToBottom = !scrollToBottom;
}
exports.onScroll = onScroll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxxREFBb0Q7QUFNcEQsSUFBSSxFQUFFLEdBQUcsSUFBSSwyQkFBUyxFQUFFLENBQUM7QUFDekIsSUFBSSxFQUFZLENBQUM7QUFFakIsNEJBQW1DLElBQVUsRUFBRSxLQUFhLEVBQUUsS0FBNEI7SUFDdEYsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFDL0UsQ0FBQztBQUZELGdEQUVDO0FBRUQsb0JBQTJCLElBQWU7SUFDeEMsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QixFQUFFLEdBQWEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2QyxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBTEQsZ0NBS0M7QUFHRCxtQkFBMEIsSUFBZTtJQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtJQUM5QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7SUFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtJQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFDaEQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO0lBQzlDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtJQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFDaEQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO0lBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztJQUNoRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07SUFFOUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkIsaVFBQWlRO0FBQ3JRLENBQUM7QUFsQkQsOEJBa0JDO0FBRUQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGtCQUF5QixJQUFlO0lBQ3RDLElBQUksSUFBSSxHQUFVLElBQUksQ0FBQyxNQUFPLENBQUMsSUFBSSxDQUFDO0lBQ3BDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQWEsYUFBYSxDQUFDLENBQUM7SUFDN0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQU0sR0FBRyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLEdBQUcsUUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7UUFDckUsSUFBSSxRQUFRLEdBQWEsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUNELGNBQWMsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUNuQyxDQUFDO0FBUkQsNEJBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBWaWV3LCBLZXllZFRlbXBsYXRlIH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBWaWV3TW9kZWwsIEl0ZW0gfSBmcm9tICcuL21haW4tdmlldy1tb2RlbCc7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ1aS9saXN0LXZpZXdcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInVpL2xhYmVsXCI7XG5pbXBvcnQgeyBHcmlkTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5cbmxldCB2bSA9IG5ldyBWaWV3TW9kZWwoKTtcbnZhciBsdjogTGlzdFZpZXc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RJdGVtVGVtcGxhdGUoaXRlbTogSXRlbSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IE9ic2VydmFibGVBcnJheTxJdGVtPik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0uaWQgJSAxMCA9PT0gMCA/IFwicmVkXCIgOiBpdGVtLmlkICUgMiA9PT0gMCA/IFwiZ3JlZW5cIiA6IFwieWVsbG93XCI7IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFnZUxvYWRlZChhcmdzOiBFdmVudERhdGEpIHtcbiAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcbiAgbHYgPSA8TGlzdFZpZXc+cGFnZS5nZXRWaWV3QnlJZChcImx2MlwiKTtcblxuICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdm07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG9uSXRlbVRhcChhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9uSXRlbVRhcFwiKTtcbiAgICB2YXIgaXRlbXMgPSB2bS5nZXQoXCJpdGVtc1wiKTtcbiAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKFwibmV3IGl0ZW1cIiwgMTExKSk7IC8vIHllbGxvd1xuICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCAxMDAwKSk7IC8vIHJlZFxuICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCAyMjIpKTsgLy8gZ3JlZW5cbiAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKFwibmV3IGl0ZW1cIiwgMzMzKSk7IC8vIHllbGxvd1xuICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCA0NDQpKTsgLy8gZ3JlZW5cbiAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKFwibmV3IGl0ZW1cIiwgNTU1KSk7IC8vIHllbGxvd1xuICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCAyMDAwKSk7IC8vIHJlZFxuICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCA2NjYpKTsgLy8gZ3JlZW5cbiAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKFwibmV3IGl0ZW1cIiwgNzc3KSk7IC8vIHllbGxvd1xuICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCA4ODgpKTsgLy8gZ3JlZW5cbiAgICBpdGVtcy5wdXNoKG5ldyBJdGVtKFwibmV3IGl0ZW1cIiwgOTk5KSk7IC8vIHllbGxvd1xuICAgIGl0ZW1zLnB1c2gobmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCAzMDAwKSk7IC8vIHJlZFxuXG4gICAgdm0uc2V0KFwiaXRlbXNcIiwgaXRlbXMpO1xuICAgIC8vIHZtLnNldChcIml0ZW1zXCIsIG5ldyBPYnNlcnZhYmxlQXJyYXkoW25ldyBJdGVtKFwibmV3IGl0ZW1cIiwgMTExKSwgbmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCAyMjIpLCBuZXcgSXRlbShcIm5ldyBpdGVtXCIsIDMzMyksIG5ldyBJdGVtKFwibmV3IGl0ZW1cIiwgNDQ0KSwgbmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCA1NTUpLCBuZXcgSXRlbShcIm5ldyBpdGVtXCIsIDY2NiksIG5ldyBJdGVtKFwibmV3IGl0ZW1cIiwgNzc3KSwgbmV3IEl0ZW0oXCJuZXcgaXRlbVwiLCA4ODgpXSkpXG59XG5cbmxldCBzY3JvbGxUb0JvdHRvbSA9IHRydWU7XG5leHBvcnQgZnVuY3Rpb24gb25TY3JvbGwoYXJnczogRXZlbnREYXRhKXtcbiAgbGV0IHBhZ2UgPSAoPFZpZXc+YXJncy5vYmplY3QpLnBhZ2U7XG4gIGxldCBncmlkTGF5b3V0ID0gcGFnZS5nZXRWaWV3QnlJZDxHcmlkTGF5b3V0PihcImdyaWQtbGF5b3V0XCIpO1xuICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gZ3JpZExheW91dC5nZXRDaGlsZHJlbkNvdW50KCk7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgbGlzdFZpZXcgPSA8TGlzdFZpZXc+Z3JpZExheW91dC5nZXRDaGlsZEF0KGkpO1xuICAgICAgbGlzdFZpZXcuc2Nyb2xsVG9JbmRleChzY3JvbGxUb0JvdHRvbSA/IGxpc3RWaWV3Lml0ZW1zLmxlbmd0aCAtIDEgOiAwKTtcbiAgfVxuICBzY3JvbGxUb0JvdHRvbSA9ICFzY3JvbGxUb0JvdHRvbTtcbn0iXX0=