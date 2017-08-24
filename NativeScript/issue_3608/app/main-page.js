"use strict";
var main_view_model_1 = require("./main-view-model");
var page;
function navigatingTo(args) {
    page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function tapSyncUnsynced(args) {
    var message = page.getViewById('message-manual-journey');
    message.className = message.className + ' pulse';
}
exports.tapSyncUnsynced = tapSyncUnsynced;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxxREFBb0Q7QUFDcEQsSUFBSSxJQUFVLENBQUM7QUFDZixzQkFBNkIsSUFBZTtJQUV4QyxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUV6QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksaUNBQWUsRUFBRSxDQUFDO0FBQ2hELENBQUM7QUFMRCxvQ0FLQztBQUVELHlCQUFnQyxJQUFJO0lBQ2hDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN6RCxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBQ3JELENBQUM7QUFIRCwwQ0FHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBIZWxsb1dvcmxkTW9kZWwgfSBmcm9tICcuL21haW4tdmlldy1tb2RlbCc7XG5sZXQgcGFnZTogUGFnZTtcbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG5cbiAgICBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG5cbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IEhlbGxvV29ybGRNb2RlbCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFwU3luY1Vuc3luY2VkKGFyZ3MpIHtcbiAgICB2YXIgbWVzc2FnZSA9IHBhZ2UuZ2V0Vmlld0J5SWQoJ21lc3NhZ2UtbWFudWFsLWpvdXJuZXknKTtcbiAgICBtZXNzYWdlLmNsYXNzTmFtZSA9IG1lc3NhZ2UuY2xhc3NOYW1lICsgJyBwdWxzZSc7XG59Il19