/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
var myCarousel;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    var page = args.object;
    myCarousel = page.getViewById("myCarousel");
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    if (!myCarousel) {
        return;
    }
    else {
        console.log("selectPageEvent myCarousel is existing");
        console.log("Currently selected page:" + myCarousel.selectedPage);
        if (myCarousel.selectedPage == 0) {
            myCarousel.selectedPage = 1;
        }
        else if (myCarousel.selectedPage == 1) {
            myCarousel.selectedPage = 2;
        }
        else if (myCarousel.selectedPage == 2) {
            myCarousel.selectedPage = 0;
        }
    }
}
exports.onTap = onTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUU7OztBQUlGLHFEQUFvRDtBQUVwRCxJQUFJLFVBQVUsQ0FBQztBQUVmLHdFQUF3RTtBQUN4RSxzQkFBNkIsSUFBZTtJQUV4QyxJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzdCLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTVDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQU5ELG9DQU1DO0FBRUQsZUFBc0IsSUFBSTtJQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUM7SUFDWCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUE7UUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQWZELHNCQWVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkluIE5hdGl2ZVNjcmlwdCwgYSBmaWxlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBhbiBYTUwgZmlsZSBpcyBrbm93biBhc1xuYSBjb2RlLWJlaGluZCBmaWxlLiBUaGUgY29kZS1iZWhpbmQgaXMgYSBncmVhdCBwbGFjZSB0byBwbGFjZSB5b3VyIHZpZXdcbmxvZ2ljLCBhbmQgdG8gc2V0IHVwIHlvdXIgcGFnZeKAmXMgZGF0YSBiaW5kaW5nLlxuKi9cblxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEhlbGxvV29ybGRNb2RlbCB9IGZyb20gJy4vbWFpbi12aWV3LW1vZGVsJztcblxubGV0IG15Q2Fyb3VzZWw7XG5cbi8vIEV2ZW50IGhhbmRsZXIgZm9yIFBhZ2UgXCJuYXZpZ2F0aW5nVG9cIiBldmVudCBhdHRhY2hlZCBpbiBtYWluLXBhZ2UueG1sXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuXG4gICAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcbiAgICBteUNhcm91c2VsID0gcGFnZS5nZXRWaWV3QnlJZChcIm15Q2Fyb3VzZWxcIik7XG5cbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IEhlbGxvV29ybGRNb2RlbCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25UYXAoYXJncykge1xuICAgIGlmICghbXlDYXJvdXNlbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RQYWdlRXZlbnQgbXlDYXJvdXNlbCBpcyBleGlzdGluZ1wiKVxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnRseSBzZWxlY3RlZCBwYWdlOlwiICsgbXlDYXJvdXNlbC5zZWxlY3RlZFBhZ2UpO1xuXG4gICAgICAgIGlmIChteUNhcm91c2VsLnNlbGVjdGVkUGFnZSA9PSAwKSB7XG4gICAgICAgICAgICBteUNhcm91c2VsLnNlbGVjdGVkUGFnZSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobXlDYXJvdXNlbC5zZWxlY3RlZFBhZ2UgPT0gMSkge1xuICAgICAgICAgICAgbXlDYXJvdXNlbC5zZWxlY3RlZFBhZ2UgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKG15Q2Fyb3VzZWwuc2VsZWN0ZWRQYWdlID09IDIpIHtcbiAgICAgICAgICAgIG15Q2Fyb3VzZWwuc2VsZWN0ZWRQYWdlID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=