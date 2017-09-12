"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var frame_1 = require("ui/frame");
var fs = require("tns-core-modules/file-system");
var platform_1 = require("platform");
// declare var android: any;
// declare var NSData: any;
var ViewModel = /** @class */ (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel(page) {
        var _this = _super.call(this) || this;
        _this.page = null;
        _this.page = page;
        return _this;
    }
    ViewModel.prototype.onBack = function () {
        frame_1.topmost().goBack();
    };
    ;
    ViewModel.prototype.readWriteBinaryTap = function (record) {
        var fileName = "icon.png";
        var destinationPath = __dirname + "/" + fileName;
        //read file
        var sourceFile = fs.File.fromPath(__dirname + "/../media/" + fileName);
        var source = sourceFile.readSync(function (e) { console.log(e); });
        console.log(source);
        //emulate saving and retrieiving this data as base64 (I want to store this image in the firebase database)
        //I want to store other binary files too - not just images.
        if (platform_1.isAndroid) {
            var base64String = android.util.Base64.encodeToString(source, android.util.Base64.NO_WRAP);
            // console.log(base64String);
        }
        else if (platform_1.isIOS) {
            var base64StringIOS = source.base64EncodedStringWithOptions(0);
            // console.log(base64StringIOS);
            var binarySource = NSData.alloc().initWithBase64Encoding(base64StringIOS);
            console.log(binarySource);
        }
        //save file
        var destinationFile = fs.File.fromPath(destinationPath);
        destinationFile.writeSync(source, function (e) { console.log(e); });
        this.set("image", destinationPath);
    };
    ;
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
var viewModel;
function pageLoaded(args) {
    var page = args.object;
    viewModel = new ViewModel(page);
    page.bindingContext = viewModel;
}
exports.pageLoaded = pageLoaded;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3QyxrQ0FBbUM7QUFFbkMsaURBQW1EO0FBR25ELHFDQUE0QztBQUU1Qyw0QkFBNEI7QUFDNUIsMkJBQTJCO0FBRTNCO0lBQStCLDZCQUFVO0lBR3JDLG1CQUFZLElBQVU7UUFBdEIsWUFDSSxpQkFBTyxTQUVWO1FBTE8sVUFBSSxHQUFTLElBQUksQ0FBQztRQUl0QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7SUFDckIsQ0FBQztJQUVNLDBCQUFNLEdBQWI7UUFDSSxlQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQUEsQ0FBQztJQUVLLHNDQUFrQixHQUF6QixVQUEwQixNQUFNO1FBRTVCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMxQixJQUFJLGVBQWUsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUVqRCxXQUFXO1FBQ1gsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQztRQUV2RSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQUEsQ0FBQyxJQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLDBHQUEwRztRQUMxRywyREFBMkQ7UUFFM0QsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNGLDZCQUE2QjtRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELGdDQUFnQztZQUVoQyxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUM3QixDQUFDO1FBRUQsV0FBVztRQUNYLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hELGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQUEsQ0FBQyxJQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQUEsQ0FBQztJQUdOLGdCQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUErQix1QkFBVSxHQTJDeEM7QUEzQ1ksOEJBQVM7QUE2Q3RCLElBQUksU0FBb0IsQ0FBQztBQUN6QixvQkFBMkIsSUFBSTtJQUMzQixJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzdCLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUNwQyxDQUFDO0FBSkQsZ0NBSUM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gJ3VpL2ZyYW1lJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgKiBhcyBidWZmZXJNb2R1bGUgZnJvbSBcImJ1ZmZlclwiO1xyXG5cclxuaW1wb3J0IHsgaXNJT1MsIGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5cclxuLy8gZGVjbGFyZSB2YXIgYW5kcm9pZDogYW55O1xyXG4vLyBkZWNsYXJlIHZhciBOU0RhdGE6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIHByaXZhdGUgcGFnZTogUGFnZSA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25CYWNrKCkge1xyXG4gICAgICAgIHRvcG1vc3QoKS5nb0JhY2soKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHJlYWRXcml0ZUJpbmFyeVRhcChyZWNvcmQpIHtcclxuXHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gXCJpY29uLnBuZ1wiO1xyXG4gICAgICAgIHZhciBkZXN0aW5hdGlvblBhdGggPSBfX2Rpcm5hbWUgKyBcIi9cIiArIGZpbGVOYW1lO1xyXG5cclxuICAgICAgICAvL3JlYWQgZmlsZVxyXG4gICAgICAgIHZhciBzb3VyY2VGaWxlID0gZnMuRmlsZS5mcm9tUGF0aChfX2Rpcm5hbWUgKyBcIi8uLi9tZWRpYS9cIiArIGZpbGVOYW1lKTtcclxuXHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZUZpbGUucmVhZFN5bmMoZSA9PiB7IGNvbnNvbGUubG9nKGUpOyB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzb3VyY2UpO1xyXG4gICAgICAgIC8vZW11bGF0ZSBzYXZpbmcgYW5kIHJldHJpZWl2aW5nIHRoaXMgZGF0YSBhcyBiYXNlNjQgKEkgd2FudCB0byBzdG9yZSB0aGlzIGltYWdlIGluIHRoZSBmaXJlYmFzZSBkYXRhYmFzZSlcclxuICAgICAgICAvL0kgd2FudCB0byBzdG9yZSBvdGhlciBiaW5hcnkgZmlsZXMgdG9vIC0gbm90IGp1c3QgaW1hZ2VzLlxyXG5cclxuICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlNjRTdHJpbmcgPSBhbmRyb2lkLnV0aWwuQmFzZTY0LmVuY29kZVRvU3RyaW5nKHNvdXJjZSwgYW5kcm9pZC51dGlsLkJhc2U2NC5OT19XUkFQKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYmFzZTY0U3RyaW5nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzSU9TKSB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlNjRTdHJpbmdJT1MgPSBzb3VyY2UuYmFzZTY0RW5jb2RlZFN0cmluZ1dpdGhPcHRpb25zKDApO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiYXNlNjRTdHJpbmdJT1MpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJpbmFyeVNvdXJjZSA9IE5TRGF0YS5hbGxvYygpLmluaXRXaXRoQmFzZTY0RW5jb2RpbmcoYmFzZTY0U3RyaW5nSU9TKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYmluYXJ5U291cmNlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9zYXZlIGZpbGVcclxuICAgICAgICB2YXIgZGVzdGluYXRpb25GaWxlID0gZnMuRmlsZS5mcm9tUGF0aChkZXN0aW5hdGlvblBhdGgpO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uRmlsZS53cml0ZVN5bmMoc291cmNlLCBlID0+IHsgY29uc29sZS5sb2coZSk7IH0pO1xyXG4gICAgICAgIHRoaXMuc2V0KFwiaW1hZ2VcIiwgZGVzdGluYXRpb25QYXRoKTtcclxuICAgIH07XHJcblxyXG5cclxufVxyXG5cclxudmFyIHZpZXdNb2RlbDogVmlld01vZGVsO1xyXG5leHBvcnQgZnVuY3Rpb24gcGFnZUxvYWRlZChhcmdzKSB7XHJcbiAgICB2YXIgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgdmlld01vZGVsID0gbmV3IFZpZXdNb2RlbChwYWdlKTtcclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB2aWV3TW9kZWw7XHJcbn07XHJcblxyXG4iXX0=