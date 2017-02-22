/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
"use strict";
var main_view_model_1 = require("./main-view-model");
var Parse = require('parse/node');
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;
    // var GameScore = Parse.Object.extend("GameScore");
    // var gameScore = new GameScore();
    // gameScore.set("score", 1337);
    // gameScore.set("playerName", "Sean Plott");
    // gameScore.set("cheatMode", false);
    // gameScore.save(null, {
    // success: function(gameScore) {
    //     console.log('New object created with objectId: ' + gameScore.id);
    // },
    // error: function(gameScore, error) {
    //     console.log('Failed to create new object, with error code: ' + error.message);
    // }
    // });
    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUU7O0FBSUYscURBQW9EO0FBRXBELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVsQyx3RUFBd0U7QUFDeEUsc0JBQTZCLElBQWU7SUFDeEM7Ozs7TUFJRTtJQUNGLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFHN0Isb0RBQW9EO0lBQ3BELG1DQUFtQztJQUVuQyxnQ0FBZ0M7SUFDaEMsNkNBQTZDO0lBQzdDLHFDQUFxQztJQUVyQyx5QkFBeUI7SUFDekIsaUNBQWlDO0lBQ2pDLHdFQUF3RTtJQUN4RSxLQUFLO0lBQ0wsc0NBQXNDO0lBQ3RDLHFGQUFxRjtJQUNyRixJQUFJO0lBQ0osTUFBTTtJQUVOOzs7Ozs7Ozs7TUFTRTtJQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQXBDRCxvQ0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuSW4gTmF0aXZlU2NyaXB0LCBhIGZpbGUgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIGFuIFhNTCBmaWxlIGlzIGtub3duIGFzXG5hIGNvZGUtYmVoaW5kIGZpbGUuIFRoZSBjb2RlLWJlaGluZCBpcyBhIGdyZWF0IHBsYWNlIHRvIHBsYWNlIHlvdXIgdmlld1xubG9naWMsIGFuZCB0byBzZXQgdXAgeW91ciBwYWdl4oCZcyBkYXRhIGJpbmRpbmcuXG4qL1xuXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgSGVsbG9Xb3JsZE1vZGVsIH0gZnJvbSAnLi9tYWluLXZpZXctbW9kZWwnO1xuXG52YXIgUGFyc2UgPSByZXF1aXJlKCdwYXJzZS9ub2RlJyk7XG5cbi8vIEV2ZW50IGhhbmRsZXIgZm9yIFBhZ2UgXCJuYXZpZ2F0aW5nVG9cIiBldmVudCBhdHRhY2hlZCBpbiBtYWluLXBhZ2UueG1sXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIC8qXG4gICAgVGhpcyBnZXRzIGEgcmVmZXJlbmNlIHRoaXMgcGFnZeKAmXMgPFBhZ2U+IFVJIGNvbXBvbmVudC4gWW91IGNhblxuICAgIHZpZXcgdGhlIEFQSSByZWZlcmVuY2Ugb2YgdGhlIFBhZ2UgdG8gc2VlIHdoYXTigJlzIGF2YWlsYWJsZSBhdFxuICAgIGh0dHBzOi8vZG9jcy5uYXRpdmVzY3JpcHQub3JnL2FwaS1yZWZlcmVuY2UvY2xhc3Nlcy9fdWlfcGFnZV8ucGFnZS5odG1sXG4gICAgKi9cbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuICAgIFxuXG4gICAgLy8gdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgLy8gdmFyIGdhbWVTY29yZSA9IG5ldyBHYW1lU2NvcmUoKTtcbiAgICBcbiAgICAvLyBnYW1lU2NvcmUuc2V0KFwic2NvcmVcIiwgMTMzNyk7XG4gICAgLy8gZ2FtZVNjb3JlLnNldChcInBsYXllck5hbWVcIiwgXCJTZWFuIFBsb3R0XCIpO1xuICAgIC8vIGdhbWVTY29yZS5zZXQoXCJjaGVhdE1vZGVcIiwgZmFsc2UpO1xuXG4gICAgLy8gZ2FtZVNjb3JlLnNhdmUobnVsbCwge1xuICAgIC8vIHN1Y2Nlc3M6IGZ1bmN0aW9uKGdhbWVTY29yZSkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnTmV3IG9iamVjdCBjcmVhdGVkIHdpdGggb2JqZWN0SWQ6ICcgKyBnYW1lU2NvcmUuaWQpO1xuICAgIC8vIH0sXG4gICAgLy8gZXJyb3I6IGZ1bmN0aW9uKGdhbWVTY29yZSwgZXJyb3IpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBjcmVhdGUgbmV3IG9iamVjdCwgd2l0aCBlcnJvciBjb2RlOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgLy8gfVxuICAgIC8vIH0pO1xuXG4gICAgLypcbiAgICBBIHBhZ2XigJlzIGJpbmRpbmdDb250ZXh0IGlzIGFuIG9iamVjdCB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIHBlcmZvcm1cbiAgICBkYXRhIGJpbmRpbmcgYmV0d2VlbiBYTUwgbWFya3VwIGFuZCBUeXBlU2NyaXB0IGNvZGUuIFByb3BlcnRpZXNcbiAgICBvbiB0aGUgYmluZGluZ0NvbnRleHQgY2FuIGJlIGFjY2Vzc2VkIHVzaW5nIHRoZSB7eyB9fSBzeW50YXggaW4gWE1MLlxuICAgIEluIHRoaXMgZXhhbXBsZSwgdGhlIHt7IG1lc3NhZ2UgfX0gYW5kIHt7IG9uVGFwIH19IGJpbmRpbmdzIGFyZSByZXNvbHZlZFxuICAgIGFnYWluc3QgdGhlIG9iamVjdCByZXR1cm5lZCBieSBjcmVhdGVWaWV3TW9kZWwoKS5cblxuICAgIFlvdSBjYW4gbGVhcm4gbW9yZSBhYm91dCBkYXRhIGJpbmRpbmcgaW4gTmF0aXZlU2NyaXB0IGF0XG4gICAgaHR0cHM6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvY29yZS1jb25jZXB0cy9kYXRhLWJpbmRpbmcuXG4gICAgKi9cbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IEhlbGxvV29ybGRNb2RlbCgpO1xufSJdfQ==