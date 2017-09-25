"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("../common/events");
var utils_1 = require("../common/utils");
// we have to patch the instance since the proto is non-configurable
function apply(api, _global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        events_1.patchEventTarget(_global, [WS.prototype]);
    }
    _global.WebSocket = function (a, b) {
        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
        var proxySocket;
        var proxySocketProto;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = Object.create(socket);
            // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
            // but proxySocket not, so we will keep socket as prototype and pass it to
            // patchOnProperties method
            proxySocketProto = socket;
            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    var args = Array.prototype.slice.call(arguments);
                    if (propName === 'addEventListener' || propName === 'removeEventListener') {
                        var eventName = args.length > 0 ? args[0] : undefined;
                        if (eventName) {
                            var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                            socket[propertySymbol] = proxySocket[propertySymbol];
                        }
                    }
                    return socket[propName].apply(socket, args);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        utils_1.patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
        return proxySocket;
    };
    var globalWebSocket = _global['WebSocket'];
    for (var prop in WS) {
        globalWebSocket[prop] = WS[prop];
    }
}
exports.apply = apply;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2Vic29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkNBQWtEO0FBQ2xELHlDQUFrRDtBQUVsRCxvRUFBb0U7QUFDcEUsZUFBc0IsR0FBaUIsRUFBRSxPQUFZO0lBQ25ELElBQU0sRUFBRSxHQUFTLE9BQVEsQ0FBQyxTQUFTLENBQUM7SUFDcEMseUZBQXlGO0lBQ3pGLGlFQUFpRTtJQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFPLE9BQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLHlCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDSyxPQUFRLENBQUMsU0FBUyxHQUFHLFVBQVMsQ0FBTSxFQUFFLENBQU07UUFDaEQsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksV0FBZ0IsQ0FBQztRQUVyQixJQUFJLGdCQUFxQixDQUFDO1FBRTFCLGdHQUFnRztRQUNoRyxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsa0ZBQWtGO1lBQ2xGLDBFQUEwRTtZQUMxRSwyQkFBMkI7WUFDM0IsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO1lBQzFCLENBQUMsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7Z0JBQ3BGLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRztvQkFDdEIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNuRCxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssa0JBQWtCLElBQUksUUFBUSxLQUFLLHFCQUFxQixDQUFDLENBQUMsQ0FBQzt3QkFDMUUsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQzt3QkFDeEQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDZCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsQ0FBQzs0QkFDbEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDdkQsQ0FBQztvQkFDSCxDQUFDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTiwrQkFBK0I7WUFDL0IsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUN2QixDQUFDO1FBRUQseUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RixNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUMsQ0FBQztJQUVGLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxHQUFHLENBQUMsQ0FBQyxJQUFNLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztBQUNILENBQUM7QUEvQ0Qsc0JBK0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge3BhdGNoRXZlbnRUYXJnZXR9IGZyb20gJy4uL2NvbW1vbi9ldmVudHMnO1xuaW1wb3J0IHtwYXRjaE9uUHJvcGVydGllc30gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuLy8gd2UgaGF2ZSB0byBwYXRjaCB0aGUgaW5zdGFuY2Ugc2luY2UgdGhlIHByb3RvIGlzIG5vbi1jb25maWd1cmFibGVcbmV4cG9ydCBmdW5jdGlvbiBhcHBseShhcGk6IF9ab25lUHJpdmF0ZSwgX2dsb2JhbDogYW55KSB7XG4gIGNvbnN0IFdTID0gKDxhbnk+X2dsb2JhbCkuV2ViU29ja2V0O1xuICAvLyBPbiBTYWZhcmkgd2luZG93LkV2ZW50VGFyZ2V0IGRvZXNuJ3QgZXhpc3Qgc28gbmVlZCB0byBwYXRjaCBXUyBhZGQvcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAvLyBPbiBvbGRlciBDaHJvbWUsIG5vIG5lZWQgc2luY2UgRXZlbnRUYXJnZXQgd2FzIGFscmVhZHkgcGF0Y2hlZFxuICBpZiAoISg8YW55Pl9nbG9iYWwpLkV2ZW50VGFyZ2V0KSB7XG4gICAgcGF0Y2hFdmVudFRhcmdldChfZ2xvYmFsLCBbV1MucHJvdG90eXBlXSk7XG4gIH1cbiAgKDxhbnk+X2dsb2JhbCkuV2ViU29ja2V0ID0gZnVuY3Rpb24oYTogYW55LCBiOiBhbnkpIHtcbiAgICBjb25zdCBzb2NrZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IG5ldyBXUyhhLCBiKSA6IG5ldyBXUyhhKTtcbiAgICBsZXQgcHJveHlTb2NrZXQ6IGFueTtcblxuICAgIGxldCBwcm94eVNvY2tldFByb3RvOiBhbnk7XG5cbiAgICAvLyBTYWZhcmkgNy4wIGhhcyBub24tY29uZmlndXJhYmxlIG93biAnb25tZXNzYWdlJyBhbmQgZnJpZW5kcyBwcm9wZXJ0aWVzIG9uIHRoZSBzb2NrZXQgaW5zdGFuY2VcbiAgICBjb25zdCBvbm1lc3NhZ2VEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb2NrZXQsICdvbm1lc3NhZ2UnKTtcbiAgICBpZiAob25tZXNzYWdlRGVzYyAmJiBvbm1lc3NhZ2VEZXNjLmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHByb3h5U29ja2V0ID0gT2JqZWN0LmNyZWF0ZShzb2NrZXQpO1xuICAgICAgLy8gc29ja2V0IGhhdmUgb3duIHByb3BlcnR5IGRlc2NyaXB0b3IgJ29ub3BlbicsICdvbm1lc3NhZ2UnLCAnb25jbG9zZScsICdvbmVycm9yJ1xuICAgICAgLy8gYnV0IHByb3h5U29ja2V0IG5vdCwgc28gd2Ugd2lsbCBrZWVwIHNvY2tldCBhcyBwcm90b3R5cGUgYW5kIHBhc3MgaXQgdG9cbiAgICAgIC8vIHBhdGNoT25Qcm9wZXJ0aWVzIG1ldGhvZFxuICAgICAgcHJveHlTb2NrZXRQcm90byA9IHNvY2tldDtcbiAgICAgIFsnYWRkRXZlbnRMaXN0ZW5lcicsICdyZW1vdmVFdmVudExpc3RlbmVyJywgJ3NlbmQnLCAnY2xvc2UnXS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BOYW1lKSB7XG4gICAgICAgIHByb3h5U29ja2V0W3Byb3BOYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2FkZEV2ZW50TGlzdGVuZXInIHx8IHByb3BOYW1lID09PSAncmVtb3ZlRXZlbnRMaXN0ZW5lcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGFyZ3MubGVuZ3RoID4gMCA/IGFyZ3NbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5U3ltYm9sID0gWm9uZS5fX3N5bWJvbF9fKCdPTl9QUk9QRVJUWScgKyBldmVudE5hbWUpO1xuICAgICAgICAgICAgICBzb2NrZXRbcHJvcGVydHlTeW1ib2xdID0gcHJveHlTb2NrZXRbcHJvcGVydHlTeW1ib2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc29ja2V0W3Byb3BOYW1lXS5hcHBseShzb2NrZXQsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIGNhbiBwYXRjaCB0aGUgcmVhbCBzb2NrZXRcbiAgICAgIHByb3h5U29ja2V0ID0gc29ja2V0O1xuICAgIH1cblxuICAgIHBhdGNoT25Qcm9wZXJ0aWVzKHByb3h5U29ja2V0LCBbJ2Nsb3NlJywgJ2Vycm9yJywgJ21lc3NhZ2UnLCAnb3BlbiddLCBwcm94eVNvY2tldFByb3RvKTtcbiAgICByZXR1cm4gcHJveHlTb2NrZXQ7XG4gIH07XG5cbiAgY29uc3QgZ2xvYmFsV2ViU29ja2V0ID0gX2dsb2JhbFsnV2ViU29ja2V0J107XG4gIGZvciAoY29uc3QgcHJvcCBpbiBXUykge1xuICAgIGdsb2JhbFdlYlNvY2tldFtwcm9wXSA9IFdTW3Byb3BdO1xuICB9XG59XG4iXX0=