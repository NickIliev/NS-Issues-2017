"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("platform");
function onLoaded(args) {
    var page = args.object;
    var tv = page.getViewById("tv");
    tv.text = "sample text";
    if (platform_1.isAndroid) {
        var tvAndriod = tv.android;
        tvAndriod.inputType = "text";
        tvAndriod.maxLines = "3";
    }
    else if (platform_1.isIOS) {
        tv.ios.textContainer.maximumNumberOfLines = 3;
        tv.ios.textContainer.lineBreakMode = NSLineBreakByTruncatingTail;
    }
    tv.on("textChange", function () {
        if (platform_1.isAndroid) {
            if (tv.android.getLayout().getLineCount() > 3) {
                tv.android.getText().delete(tv.android.getText().length() - 1, tv.android.getText().length());
            }
        }
    });
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEscUNBQTRDO0FBSTVDLGtCQUF5QixJQUFlO0lBQ3BDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFN0IsSUFBSSxFQUFFLEdBQWEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxFQUFFLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztJQUV4QixFQUFFLENBQUMsQ0FBQyxvQkFBUyxDQUFDLENBQUMsQ0FBQztRQUNaLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDM0IsU0FBUyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDN0IsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDN0IsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQztRQUNmLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsMkJBQTJCLENBQUM7SUFDckUsQ0FBQztJQUVELEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ1osRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDbEcsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUF0QkQsNEJBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IFRleHRWaWV3IH0gZnJvbSBcInVpL3RleHQtdmlld1wiO1xuXG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5cbmRlY2xhcmUgdmFyIE5TTGluZUJyZWFrQnlUcnVuY2F0aW5nVGFpbDogYW55O1xuXG5leHBvcnQgZnVuY3Rpb24gb25Mb2FkZWQoYXJnczogRXZlbnREYXRhKSB7XG4gICAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcblxuICAgIGxldCB0diA9IDxUZXh0Vmlldz5wYWdlLmdldFZpZXdCeUlkKFwidHZcIik7XG4gICAgdHYudGV4dCA9IFwic2FtcGxlIHRleHRcIjtcblxuICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgbGV0IHR2QW5kcmlvZCA9IHR2LmFuZHJvaWQ7XG4gICAgICAgIHR2QW5kcmlvZC5pbnB1dFR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgdHZBbmRyaW9kLm1heExpbmVzID0gXCIzXCI7XG4gICAgfSBlbHNlIGlmIChpc0lPUykge1xuICAgICAgICB0di5pb3MudGV4dENvbnRhaW5lci5tYXhpbXVtTnVtYmVyT2ZMaW5lcyA9IDM7XG4gICAgICAgIHR2Lmlvcy50ZXh0Q29udGFpbmVyLmxpbmVCcmVha01vZGUgPSBOU0xpbmVCcmVha0J5VHJ1bmNhdGluZ1RhaWw7XG4gICAgfVxuXG4gICAgdHYub24oXCJ0ZXh0Q2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgICAgICAgaWYgKHR2LmFuZHJvaWQuZ2V0TGF5b3V0KCkuZ2V0TGluZUNvdW50KCkgPiAzKSB7XG4gICAgICAgICAgICAgICAgdHYuYW5kcm9pZC5nZXRUZXh0KCkuZGVsZXRlKHR2LmFuZHJvaWQuZ2V0VGV4dCgpLmxlbmd0aCgpIC0gMSwgdHYuYW5kcm9pZC5nZXRUZXh0KCkubGVuZ3RoKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG4iXX0=