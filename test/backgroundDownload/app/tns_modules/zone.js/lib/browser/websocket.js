/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
// we have to patch the instance since the proto is non-configurable
function apply(_global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        utils_1.patchEventTargetMethods(WS.prototype);
    }
    _global.WebSocket = function (a, b) {
        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
        var proxySocket;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = Object.create(socket);
            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    return socket[propName].apply(socket, arguments);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        utils_1.patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);
        return proxySocket;
    };
    for (var prop in WS) {
        _global['WebSocket'][prop] = WS[prop];
    }
}
exports.apply = apply;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2Vic29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7O0FBRUgseUNBQTJFO0FBRTNFLG9FQUFvRTtBQUNwRSxlQUFzQixPQUFZO0lBQ2hDLElBQU0sRUFBRSxHQUFTLE9BQVEsQ0FBQyxTQUFTLENBQUM7SUFDcEMseUZBQXlGO0lBQ3pGLGlFQUFpRTtJQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFPLE9BQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLCtCQUF1QixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0ssT0FBUSxDQUFDLFNBQVMsR0FBRyxVQUFTLENBQU0sRUFBRSxDQUFNO1FBQ2hELElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLFdBQWdCLENBQUM7UUFFckIsZ0dBQWdHO1FBQ2hHLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDM0UsRUFBRSxDQUFDLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxRCxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxDQUFDLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxRQUFRO2dCQUNwRixXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUc7b0JBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTiwrQkFBK0I7WUFDL0IsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUN2QixDQUFDO1FBRUQseUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUV0RSxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUMsQ0FBQztJQUNGLEdBQUcsQ0FBQyxDQUFDLElBQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0FBQ0gsQ0FBQztBQWhDRCxzQkFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7cGF0Y2hFdmVudFRhcmdldE1ldGhvZHMsIHBhdGNoT25Qcm9wZXJ0aWVzfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG4vLyB3ZSBoYXZlIHRvIHBhdGNoIHRoZSBpbnN0YW5jZSBzaW5jZSB0aGUgcHJvdG8gaXMgbm9uLWNvbmZpZ3VyYWJsZVxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KF9nbG9iYWw6IGFueSkge1xuICBjb25zdCBXUyA9ICg8YW55Pl9nbG9iYWwpLldlYlNvY2tldDtcbiAgLy8gT24gU2FmYXJpIHdpbmRvdy5FdmVudFRhcmdldCBkb2Vzbid0IGV4aXN0IHNvIG5lZWQgdG8gcGF0Y2ggV1MgYWRkL3JlbW92ZUV2ZW50TGlzdGVuZXJcbiAgLy8gT24gb2xkZXIgQ2hyb21lLCBubyBuZWVkIHNpbmNlIEV2ZW50VGFyZ2V0IHdhcyBhbHJlYWR5IHBhdGNoZWRcbiAgaWYgKCEoPGFueT5fZ2xvYmFsKS5FdmVudFRhcmdldCkge1xuICAgIHBhdGNoRXZlbnRUYXJnZXRNZXRob2RzKFdTLnByb3RvdHlwZSk7XG4gIH1cbiAgKDxhbnk+X2dsb2JhbCkuV2ViU29ja2V0ID0gZnVuY3Rpb24oYTogYW55LCBiOiBhbnkpIHtcbiAgICBjb25zdCBzb2NrZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IG5ldyBXUyhhLCBiKSA6IG5ldyBXUyhhKTtcbiAgICBsZXQgcHJveHlTb2NrZXQ6IGFueTtcblxuICAgIC8vIFNhZmFyaSA3LjAgaGFzIG5vbi1jb25maWd1cmFibGUgb3duICdvbm1lc3NhZ2UnIGFuZCBmcmllbmRzIHByb3BlcnRpZXMgb24gdGhlIHNvY2tldCBpbnN0YW5jZVxuICAgIGNvbnN0IG9ubWVzc2FnZURlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvY2tldCwgJ29ubWVzc2FnZScpO1xuICAgIGlmIChvbm1lc3NhZ2VEZXNjICYmIG9ubWVzc2FnZURlc2MuY29uZmlndXJhYmxlID09PSBmYWxzZSkge1xuICAgICAgcHJveHlTb2NrZXQgPSBPYmplY3QuY3JlYXRlKHNvY2tldCk7XG4gICAgICBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsICdzZW5kJywgJ2Nsb3NlJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wTmFtZSkge1xuICAgICAgICBwcm94eVNvY2tldFtwcm9wTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc29ja2V0W3Byb3BOYW1lXS5hcHBseShzb2NrZXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2UgY2FuIHBhdGNoIHRoZSByZWFsIHNvY2tldFxuICAgICAgcHJveHlTb2NrZXQgPSBzb2NrZXQ7XG4gICAgfVxuXG4gICAgcGF0Y2hPblByb3BlcnRpZXMocHJveHlTb2NrZXQsIFsnY2xvc2UnLCAnZXJyb3InLCAnbWVzc2FnZScsICdvcGVuJ10pO1xuXG4gICAgcmV0dXJuIHByb3h5U29ja2V0O1xuICB9O1xuICBmb3IgKGNvbnN0IHByb3AgaW4gV1MpIHtcbiAgICBfZ2xvYmFsWydXZWJTb2NrZXQnXVtwcm9wXSA9IFdTW3Byb3BdO1xuICB9XG59XG4iXX0=