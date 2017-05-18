"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
var application_1 = require("application");
var delegateModule;
if (application_1.ios) {
    delegateModule = require("./delegate");
}
function navigatingTo(args) {
    var page = args.object;
    var tf = page.getViewById("tf");
    var sw = page.getViewById("sw");
    // the event name is concatanating the property name "text" with key word "Change" = "textChange"
    // tf.on("textChange", (args: PropertyChangeData) => {
    //     console.log("text changed for text-field!");
    //     console.log(args.eventName); // textChange
    //     console.log(args.propertyName); // text
    //     console.log(args.object); // TextField<tf
    //     console.log(args.value);
    //     console.log(args.oldValue);
    // })
    // the event name is concatanating the property name "checked" with key word "Change" = "checkedChange"
    // sw.on("checkedChange", (args: PropertyChangeData) => {
    //     console.log("switch checked change!");
    //     console.log(args.eventName); // checkedChange
    //     console.log(args.propertyName); // checked
    //     console.log(args.object); // Switch<sw>
    //     console.log(args.value);
    //     console.log(args.oldValue);
    // })
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function onRadLoaded(args) {
    var autocmp = args.object;
    console.log("autocmp: " + autocmp);
    // for (var key in autocmp) {
    //     if (autocmp.hasOwnProperty(key)) {
    //         var element = autocmp[key];
    //         console.log(key + ": " + element)
    //     }
    // }
    if (application_1.android) {
        var nativeTField = autocmp.android.getTextField();
        console.log("nativeTextField: " + nativeTField); // android.widget.EditText
        nativeTField.addTextChangedListener(new android.text.TextWatcher({
            afterTextChanged: function (s) {
                console.log("afterTextChanged");
                console.log(s);
            },
            beforeTextChanged: function (s, start, count, after) {
                console.log("beforeTextChanged");
                console.log(s);
                console.log(start);
                console.log(count);
                console.log(after);
            },
            onTextChanged: function (s, start, before, count) {
                console.log("onTextChanged");
                console.log(s);
                console.log(start);
                console.log(before);
                console.log(count);
            }
        }));
    }
    else if (application_1.ios) {
        var tkAutoCompleteTextView = autocmp.nativeView;
        console.log("tkAutoCompleteTextView for iOS: " + tkAutoCompleteTextView); // TKAutoCompleteTextView 
        var originalDelegate = tkAutoCompleteTextView.delegate;
        console.log("originalDelegate: " + originalDelegate); // AutoCompleteDelegateImpl
        for (var key in originalDelegate) {
            if (originalDelegate.hasOwnProperty(key)) {
                var element = originalDelegate[key];
                console.log(key + ": " + element);
            }
        }
        var tkModifiedTextField = tkAutoCompleteTextView.textField;
        console.log("tkModifiedTextField: " + tkModifiedTextField); // TKModifiedTextField extended UITextField
        var newDelegate = delegateModule.newUITextFieldDelegateImpl.initWithOriginalDelegate(tkAutoCompleteTextView.delegate);
        tkAutoCompleteTextView._delegate = newDelegate;
        tkModifiedTextField.delegate = newDelegate;
    }
}
exports.onRadLoaded = onRadLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQW9EO0FBS3BELDJDQUFtRTtBQUluRSxJQUFJLGNBQWMsQ0FBQztBQUNuQixFQUFFLENBQUMsQ0FBQyxpQkFBTSxDQUFDLENBQUMsQ0FBQztJQUNULGNBQWMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUlELHNCQUE2QixJQUFlO0lBRXhDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFN0IsSUFBSSxFQUFFLEdBQWMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXhDLGlHQUFpRztJQUNqRyxzREFBc0Q7SUFDdEQsbURBQW1EO0lBRW5ELGlEQUFpRDtJQUNqRCw4Q0FBOEM7SUFDOUMsZ0RBQWdEO0lBQ2hELCtCQUErQjtJQUMvQixrQ0FBa0M7SUFDbEMsS0FBSztJQUVMLHVHQUF1RztJQUN2Ryx5REFBeUQ7SUFDekQsNkNBQTZDO0lBRTdDLG9EQUFvRDtJQUNwRCxpREFBaUQ7SUFDakQsOENBQThDO0lBQzlDLCtCQUErQjtJQUMvQixrQ0FBa0M7SUFDbEMsS0FBSztJQUVMLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQTlCRCxvQ0E4QkM7QUFFRCxxQkFBNEIsSUFBSTtJQUM1QixJQUFJLE9BQU8sR0FBNEIsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUVuRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUVuQyw2QkFBNkI7SUFDN0IseUNBQXlDO0lBQ3pDLHNDQUFzQztJQUN0Qyw0Q0FBNEM7SUFDNUMsUUFBUTtJQUNSLElBQUk7SUFFSixF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YXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEhlbGxvV29ybGRNb2RlbCB9IGZyb20gJy4vbWFpbi12aWV3LW1vZGVsJztcblxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcblxuaW1wb3J0IHsgYW5kcm9pZCBhcyBhbmRyb2lkQXBwLCBpb3MgYXMgaW9zQXBwIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cbmltcG9ydCB7IFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9hdXRvY29tcGxldGVcIjtcblxudmFyIGRlbGVnYXRlTW9kdWxlO1xuaWYgKGlvc0FwcCkge1xuICAgIGRlbGVnYXRlTW9kdWxlID0gcmVxdWlyZShcIi4vZGVsZWdhdGVcIik7XG59IFxuXG5kZWNsYXJlIHZhciBhbmRyb2lkOiBhbnk7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG5cbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuXG4gICAgbGV0IHRmID0gPFRleHRGaWVsZD5wYWdlLmdldFZpZXdCeUlkKFwidGZcIik7XG4gICAgbGV0IHN3ID0gPFN3aXRjaD5wYWdlLmdldFZpZXdCeUlkKFwic3dcIik7XG5cbiAgICAvLyB0aGUgZXZlbnQgbmFtZSBpcyBjb25jYXRhbmF0aW5nIHRoZSBwcm9wZXJ0eSBuYW1lIFwidGV4dFwiIHdpdGgga2V5IHdvcmQgXCJDaGFuZ2VcIiA9IFwidGV4dENoYW5nZVwiXG4gICAgLy8gdGYub24oXCJ0ZXh0Q2hhbmdlXCIsIChhcmdzOiBQcm9wZXJ0eUNoYW5nZURhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0ZXh0IGNoYW5nZWQgZm9yIHRleHQtZmllbGQhXCIpO1xuXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZ3MuZXZlbnROYW1lKTsgLy8gdGV4dENoYW5nZVxuICAgIC8vICAgICBjb25zb2xlLmxvZyhhcmdzLnByb3BlcnR5TmFtZSk7IC8vIHRleHRcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJncy5vYmplY3QpOyAvLyBUZXh0RmllbGQ8dGZcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJncy52YWx1ZSk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZ3Mub2xkVmFsdWUpO1xuICAgIC8vIH0pXG5cbiAgICAvLyB0aGUgZXZlbnQgbmFtZSBpcyBjb25jYXRhbmF0aW5nIHRoZSBwcm9wZXJ0eSBuYW1lIFwiY2hlY2tlZFwiIHdpdGgga2V5IHdvcmQgXCJDaGFuZ2VcIiA9IFwiY2hlY2tlZENoYW5nZVwiXG4gICAgLy8gc3cub24oXCJjaGVja2VkQ2hhbmdlXCIsIChhcmdzOiBQcm9wZXJ0eUNoYW5nZURhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJzd2l0Y2ggY2hlY2tlZCBjaGFuZ2UhXCIpO1xuXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZ3MuZXZlbnROYW1lKTsgLy8gY2hlY2tlZENoYW5nZVxuICAgIC8vICAgICBjb25zb2xlLmxvZyhhcmdzLnByb3BlcnR5TmFtZSk7IC8vIGNoZWNrZWRcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJncy5vYmplY3QpOyAvLyBTd2l0Y2g8c3c+XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZ3MudmFsdWUpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhhcmdzLm9sZFZhbHVlKTtcbiAgICAvLyB9KVxuXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIZWxsb1dvcmxkTW9kZWwoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmFkTG9hZGVkKGFyZ3MpIHtcbiAgICB2YXIgYXV0b2NtcCA9IDxSYWRBdXRvQ29tcGxldGVUZXh0Vmlldz5hcmdzLm9iamVjdDtcblxuICAgIGNvbnNvbGUubG9nKFwiYXV0b2NtcDogXCIgKyBhdXRvY21wKTtcblxuICAgIC8vIGZvciAodmFyIGtleSBpbiBhdXRvY21wKSB7XG4gICAgLy8gICAgIGlmIChhdXRvY21wLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAvLyAgICAgICAgIHZhciBlbGVtZW50ID0gYXV0b2NtcFtrZXldO1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coa2V5ICsgXCI6IFwiICsgZWxlbWVudClcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIGlmIChhbmRyb2lkQXBwKSB7XG4gICAgICAgIHZhciBuYXRpdmVURmllbGQgPSBhdXRvY21wLmFuZHJvaWQuZ2V0VGV4dEZpZWxkKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibmF0aXZlVGV4dEZpZWxkOiBcIiArIG5hdGl2ZVRGaWVsZCkgLy8gYW5kcm9pZC53aWRnZXQuRWRpdFRleHRcblxuICAgICAgICBuYXRpdmVURmllbGQuYWRkVGV4dENoYW5nZWRMaXN0ZW5lcihuZXcgYW5kcm9pZC50ZXh0LlRleHRXYXRjaGVyKHtcblxuICAgICAgICAgICAgYWZ0ZXJUZXh0Q2hhbmdlZChzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZnRlclRleHRDaGFuZ2VkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlZm9yZVRleHRDaGFuZ2VkKHMsIHN0YXJ0LCBjb3VudCwgYWZ0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJlZm9yZVRleHRDaGFuZ2VkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb3VudCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWZ0ZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVGV4dENoYW5nZWQocywgc3RhcnQsIGJlZm9yZSwgY291bnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uVGV4dENoYW5nZWRcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RhcnQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJlZm9yZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfSBlbHNlIGlmIChpb3NBcHApIHtcbiAgICAgICAgdmFyIHRrQXV0b0NvbXBsZXRlVGV4dFZpZXcgPSBhdXRvY21wLm5hdGl2ZVZpZXc7IFxuICAgICAgICBjb25zb2xlLmxvZyhcInRrQXV0b0NvbXBsZXRlVGV4dFZpZXcgZm9yIGlPUzogXCIgKyB0a0F1dG9Db21wbGV0ZVRleHRWaWV3KSAvLyBUS0F1dG9Db21wbGV0ZVRleHRWaWV3IFxuXG4gICAgICAgIHZhciBvcmlnaW5hbERlbGVnYXRlID0gdGtBdXRvQ29tcGxldGVUZXh0Vmlldy5kZWxlZ2F0ZTsgXG4gICAgICAgIGNvbnNvbGUubG9nKFwib3JpZ2luYWxEZWxlZ2F0ZTogXCIgKyBvcmlnaW5hbERlbGVnYXRlKTsgLy8gQXV0b0NvbXBsZXRlRGVsZWdhdGVJbXBsXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9yaWdpbmFsRGVsZWdhdGUpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbERlbGVnYXRlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IG9yaWdpbmFsRGVsZWdhdGVba2V5XTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXkrIFwiOiBcIiArZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGtNb2RpZmllZFRleHRGaWVsZCA9IHRrQXV0b0NvbXBsZXRlVGV4dFZpZXcudGV4dEZpZWxkO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRrTW9kaWZpZWRUZXh0RmllbGQ6IFwiICsgdGtNb2RpZmllZFRleHRGaWVsZCk7IC8vIFRLTW9kaWZpZWRUZXh0RmllbGQgZXh0ZW5kZWQgVUlUZXh0RmllbGRcblxuICAgICAgICBsZXQgbmV3RGVsZWdhdGUgPSBkZWxlZ2F0ZU1vZHVsZS5uZXdVSVRleHRGaWVsZERlbGVnYXRlSW1wbC5pbml0V2l0aE9yaWdpbmFsRGVsZWdhdGUodGtBdXRvQ29tcGxldGVUZXh0Vmlldy5kZWxlZ2F0ZSk7XG4gICAgICAgIHRrQXV0b0NvbXBsZXRlVGV4dFZpZXcuX2RlbGVnYXRlID0gbmV3RGVsZWdhdGU7XG5cbiAgICAgICAgdGtNb2RpZmllZFRleHRGaWVsZC5kZWxlZ2F0ZSA9IG5ld0RlbGVnYXRlO1xuICAgIH1cbn0iXX0=