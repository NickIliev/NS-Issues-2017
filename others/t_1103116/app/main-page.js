/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
"use strict";
var main_view_model_1 = require("./main-view-model");
var fs = require("file-system");
var dialogs_1 = require("ui/dialogs");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onLoaded(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    var documentsPath = fs.knownFolders.documents().path;
    console.log("documents: " + documentsPath);
    // this path will remain the same when the app is installed
    // each new re-deploy of the app will change the path
    // simply chaning the JS or XML files will livesync the app without re-deploy aso the path will remain the same
    // withi this check
    var path = fs.path.join(documentsPath, "myFolder");
    var myFolder;
    if (!fs.Folder.exists(path)) {
        myFolder = fs.Folder.fromPath(path);
    }
    else {
        myFolder = fs.knownFolders.documents().getFolder("myFolder");
    }
    dialogs_1.alert("myFolder: " + myFolder.path);
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUU7O0FBSUYscURBQW9EO0FBRXBELGdDQUFrQztBQUNsQyxzQ0FBbUM7QUFFbkMsd0VBQXdFO0FBQ3hFLGtCQUF5QixJQUFlO0lBQ3BDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztJQUU1QyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztJQUVyRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQztJQUMzQywyREFBMkQ7SUFDM0QscURBQXFEO0lBQ3JELCtHQUErRztJQUcvRyxtQkFBbUI7SUFDbkIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELElBQUksUUFBUSxDQUFDO0lBRWIsRUFBRSxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDeEIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLFFBQVEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsZUFBSyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQXZCRCw0QkF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuSW4gTmF0aXZlU2NyaXB0LCBhIGZpbGUgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIGFuIFhNTCBmaWxlIGlzIGtub3duIGFzXG5hIGNvZGUtYmVoaW5kIGZpbGUuIFRoZSBjb2RlLWJlaGluZCBpcyBhIGdyZWF0IHBsYWNlIHRvIHBsYWNlIHlvdXIgdmlld1xubG9naWMsIGFuZCB0byBzZXQgdXAgeW91ciBwYWdl4oCZcyBkYXRhIGJpbmRpbmcuXG4qL1xuXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgSGVsbG9Xb3JsZE1vZGVsIH0gZnJvbSAnLi9tYWluLXZpZXctbW9kZWwnO1xuXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuLy8gRXZlbnQgaGFuZGxlciBmb3IgUGFnZSBcIm5hdmlnYXRpbmdUb1wiIGV2ZW50IGF0dGFjaGVkIGluIG1haW4tcGFnZS54bWxcbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWRlZChhcmdzOiBFdmVudERhdGEpIHtcbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgSGVsbG9Xb3JsZE1vZGVsKCk7XG5cbiAgICB2YXIgZG9jdW1lbnRzUGF0aCA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKS5wYXRoO1xuXG4gICAgY29uc29sZS5sb2coXCJkb2N1bWVudHM6IFwiICsgZG9jdW1lbnRzUGF0aCk7XG4gICAgLy8gdGhpcyBwYXRoIHdpbGwgcmVtYWluIHRoZSBzYW1lIHdoZW4gdGhlIGFwcCBpcyBpbnN0YWxsZWRcbiAgICAvLyBlYWNoIG5ldyByZS1kZXBsb3kgb2YgdGhlIGFwcCB3aWxsIGNoYW5nZSB0aGUgcGF0aFxuICAgIC8vIHNpbXBseSBjaGFuaW5nIHRoZSBKUyBvciBYTUwgZmlsZXMgd2lsbCBsaXZlc3luYyB0aGUgYXBwIHdpdGhvdXQgcmUtZGVwbG95IGFzbyB0aGUgcGF0aCB3aWxsIHJlbWFpbiB0aGUgc2FtZVxuXG5cbiAgICAvLyB3aXRoaSB0aGlzIGNoZWNrXG4gICAgdmFyIHBhdGggPSBmcy5wYXRoLmpvaW4oZG9jdW1lbnRzUGF0aCwgXCJteUZvbGRlclwiKTtcbiAgICB2YXIgbXlGb2xkZXI7XG5cbiAgICBpZighZnMuRm9sZGVyLmV4aXN0cyhwYXRoKSl7XG4gICAgICAgIG15Rm9sZGVyID0gZnMuRm9sZGVyLmZyb21QYXRoKHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG15Rm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpLmdldEZvbGRlcihcIm15Rm9sZGVyXCIpO1xuICAgIH1cblxuICAgIGFsZXJ0KFwibXlGb2xkZXI6IFwiICsgbXlGb2xkZXIucGF0aCk7XG59Il19