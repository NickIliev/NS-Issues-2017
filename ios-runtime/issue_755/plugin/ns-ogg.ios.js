"use strict";
var ns_ogg_common_1 = require("./ns-ogg-common");
var Ogg = (function (_super) {
    __extends(Ogg, _super);
    function Ogg() {
        return _super.call(this) || this;
    }
    Ogg.prototype.init = function () {
        console.log("init");
        console.log("OggVorbis: " + OggVorbis);
        /*
        + (LPMessagingSDK * _Nonnull)instance;
        ^^^ instance is property in LPMessagingSDK-Swift.h so we are marshalling it as a property
        - (BOOL)initialize:(NSString * _Nullable)brandID error:(NSError * _Nullable * _Nullable)error SWIFT_METHOD_FAMILY(none);
        intializeError(id, error) is the right syntax to convert the Objective-C to JavaScript following the marshalling techniques from docs.nativescript.org/runtimes/ios/marshalling/Marshalling-Overview
        */
    };
    return Ogg;
}(ns_ogg_common_1.Common));
exports.Ogg = Ogg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnMtb2dnLmlvcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5zLW9nZy5pb3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlEQUF5QztBQUl6QztJQUF5Qix1QkFBTTtJQUUzQjtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUVNLGtCQUFJLEdBQVg7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBRXZDOzs7OztVQUtFO0lBQ04sQ0FBQztJQUNMLFVBQUM7QUFBRCxDQUFDLEFBakJELENBQXlCLHNCQUFNLEdBaUI5QjtBQWpCWSxrQkFBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4vbnMtb2dnLWNvbW1vbic7XG5cbmRlY2xhcmUgY29uc3QgT2dnVm9yYmlzIDogYW55O1xuXG5leHBvcnQgY2xhc3MgT2dnIGV4dGVuZHMgQ29tbW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCkgOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbml0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9nZ1ZvcmJpczogXCIgKyBPZ2dWb3JiaXMpO1xuICAgICAgICBcbiAgICAgICAgLypcbiAgICAgICAgKyAoTFBNZXNzYWdpbmdTREsgKiBfTm9ubnVsbClpbnN0YW5jZTsgXG4gICAgICAgIF5eXiBpbnN0YW5jZSBpcyBwcm9wZXJ0eSBpbiBMUE1lc3NhZ2luZ1NESy1Td2lmdC5oIHNvIHdlIGFyZSBtYXJzaGFsbGluZyBpdCBhcyBhIHByb3BlcnR5XG4gICAgICAgIC0gKEJPT0wpaW5pdGlhbGl6ZTooTlNTdHJpbmcgKiBfTnVsbGFibGUpYnJhbmRJRCBlcnJvcjooTlNFcnJvciAqIF9OdWxsYWJsZSAqIF9OdWxsYWJsZSllcnJvciBTV0lGVF9NRVRIT0RfRkFNSUxZKG5vbmUpO1xuICAgICAgICBpbnRpYWxpemVFcnJvcihpZCwgZXJyb3IpIGlzIHRoZSByaWdodCBzeW50YXggdG8gY29udmVydCB0aGUgT2JqZWN0aXZlLUMgdG8gSmF2YVNjcmlwdCBmb2xsb3dpbmcgdGhlIG1hcnNoYWxsaW5nIHRlY2huaXF1ZXMgZnJvbSBkb2NzLm5hdGl2ZXNjcmlwdC5vcmcvcnVudGltZXMvaW9zL21hcnNoYWxsaW5nL01hcnNoYWxsaW5nLU92ZXJ2aWV3XG4gICAgICAgICovXG4gICAgfVxufSJdfQ==