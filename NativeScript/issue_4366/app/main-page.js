/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogs_1 = require("ui/dialogs");
function showAction() {
    var options = {
        title: "Race Selection",
        message: "Choose your race",
        cancelButtonText: "Cancel",
        actions: ["Human", "Elf", "Dwarf", "Orc"]
    };
    dialogs_1.action(options).then(function (result) {
        console.log(result);
    });
}
exports.showAction = showAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUU7OztBQUlGLHNDQUFvQztBQUVwQztJQUNJLElBQUksT0FBTyxHQUFHO1FBQ1YsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLGdCQUFnQixFQUFFLFFBQVE7UUFDMUIsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDO0tBQzVDLENBQUM7SUFDRixnQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFWRCxnQ0FVQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5JbiBOYXRpdmVTY3JpcHQsIGEgZmlsZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgYW4gWE1MIGZpbGUgaXMga25vd24gYXNcbmEgY29kZS1iZWhpbmQgZmlsZS4gVGhlIGNvZGUtYmVoaW5kIGlzIGEgZ3JlYXQgcGxhY2UgdG8gcGxhY2UgeW91ciB2aWV3XG5sb2dpYywgYW5kIHRvIHNldCB1cCB5b3VyIHBhZ2XigJlzIGRhdGEgYmluZGluZy5cbiovXG5cbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0FjdGlvbigpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgdGl0bGU6IFwiUmFjZSBTZWxlY3Rpb25cIixcbiAgICAgICAgbWVzc2FnZTogXCJDaG9vc2UgeW91ciByYWNlXCIsXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXG4gICAgICAgIGFjdGlvbnM6IFtcIkh1bWFuXCIsIFwiRWxmXCIsIFwiRHdhcmZcIiwgXCJPcmNcIl1cbiAgICB9O1xuICAgIGFjdGlvbihvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHsgXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgfSk7XG59Il19