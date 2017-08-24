/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web_view_1 = require("ui/web-view");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    var page = args.object;
    var stack = page.getViewById("container");
    var webView = new web_view_1.WebView();
    webView.src = "~/index.html";
    webView.on(web_view_1.WebView.loadedEvent, function () {
        console.log("TEST TEST TEST");
    });
    stack.addChild(webView);
}
exports.navigatingTo = navigatingTo;
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUU7OztBQU9GLHdDQUFzQztBQUV0Qyx3RUFBd0U7QUFDeEUsc0JBQTZCLElBQWU7SUFFeEMsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QixJQUFJLEtBQUssR0FBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV2RCxJQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFPLEVBQUUsQ0FBQztJQUM5QixPQUFPLENBQUMsR0FBRyxHQUFHLGVBQWUsQ0FBQztJQUM5QixPQUFPLENBQUMsRUFBRSxDQUFDLGtCQUFPLENBQUMsV0FBVyxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQVpELG9DQVlDIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuSW4gTmF0aXZlU2NyaXB0LCBhIGZpbGUgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIGFuIFhNTCBmaWxlIGlzIGtub3duIGFzXHJcbmEgY29kZS1iZWhpbmQgZmlsZS4gVGhlIGNvZGUtYmVoaW5kIGlzIGEgZ3JlYXQgcGxhY2UgdG8gcGxhY2UgeW91ciB2aWV3XHJcbmxvZ2ljLCBhbmQgdG8gc2V0IHVwIHlvdXIgcGFnZeKAmXMgZGF0YSBiaW5kaW5nLlxyXG4qL1xyXG5cclxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xyXG5pbXBvcnQgeyBIZWxsb1dvcmxkTW9kZWwgfSBmcm9tICcuL21haW4tdmlldy1tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyBXZWJWaWV3IH0gZnJvbSBcInVpL3dlYi12aWV3XCI7XHJcblxyXG4vLyBFdmVudCBoYW5kbGVyIGZvciBQYWdlIFwibmF2aWdhdGluZ1RvXCIgZXZlbnQgYXR0YWNoZWQgaW4gbWFpbi1wYWdlLnhtbFxyXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG5cclxuICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBsZXQgc3RhY2sgPSA8U3RhY2tMYXlvdXQ+cGFnZS5nZXRWaWV3QnlJZChcImNvbnRhaW5lclwiKTtcclxuXHJcbiAgICBjb25zdCB3ZWJWaWV3ID0gbmV3IFdlYlZpZXcoKTtcclxuICAgIHdlYlZpZXcuc3JjID0gXCI8aHRtbD48L2h0bWw+XCI7XHJcbiAgICB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZGVkRXZlbnQsICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRFU1QgVEVTVCBURVNUXCIpXHJcbiAgICB9KTtcclxuXHJcbiAgICBzdGFjay5hZGRDaGlsZCh3ZWJWaWV3KTtcclxufSJdfQ==
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUU7OztBQU9GLHdDQUFzQztBQUV0Qyx3RUFBd0U7QUFDeEUsc0JBQTZCLElBQWU7SUFFeEMsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QixJQUFJLEtBQUssR0FBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV2RCxJQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFPLEVBQUUsQ0FBQztJQUM5QixPQUFPLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQztJQUM3QixPQUFPLENBQUMsRUFBRSxDQUFDLGtCQUFPLENBQUMsV0FBVyxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQVpELG9DQVlDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkluIE5hdGl2ZVNjcmlwdCwgYSBmaWxlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBhbiBYTUwgZmlsZSBpcyBrbm93biBhc1xuYSBjb2RlLWJlaGluZCBmaWxlLiBUaGUgY29kZS1iZWhpbmQgaXMgYSBncmVhdCBwbGFjZSB0byBwbGFjZSB5b3VyIHZpZXdcbmxvZ2ljLCBhbmQgdG8gc2V0IHVwIHlvdXIgcGFnZeKAmXMgZGF0YSBiaW5kaW5nLlxuKi9cblxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEhlbGxvV29ybGRNb2RlbCB9IGZyb20gJy4vbWFpbi12aWV3LW1vZGVsJztcblxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCB7IFdlYlZpZXcgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcblxuLy8gRXZlbnQgaGFuZGxlciBmb3IgUGFnZSBcIm5hdmlnYXRpbmdUb1wiIGV2ZW50IGF0dGFjaGVkIGluIG1haW4tcGFnZS54bWxcbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG5cbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuICAgIGxldCBzdGFjayA9IDxTdGFja0xheW91dD5wYWdlLmdldFZpZXdCeUlkKFwiY29udGFpbmVyXCIpO1xuXG4gICAgY29uc3Qgd2ViVmlldyA9IG5ldyBXZWJWaWV3KCk7XG4gICAgd2ViVmlldy5zcmMgPSBcIn4vaW5kZXguaHRtbFwiO1xuICAgIHdlYlZpZXcub24oV2ViVmlldy5sb2FkZWRFdmVudCwgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRFU1QgVEVTVCBURVNUXCIpXG4gICAgfSk7XG5cbiAgICBzdGFjay5hZGRDaGlsZCh3ZWJWaWV3KTtcbn0iXX0=
>>>>>>> 66078cd1c6afdcb9c5a963be0cb8cc7741331a0b
