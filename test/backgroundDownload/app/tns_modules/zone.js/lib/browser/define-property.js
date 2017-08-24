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
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[utils_1.zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[utils_1.zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = utils_1.zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
exports.propertyPatch = propertyPatch;
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
exports._redefineProperty = _redefineProperty;
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    desc.configurable = true;
    if (!desc.configurable) {
        if (!obj[unconfigurablesKey]) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        obj[unconfigurablesKey][prop] = true;
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = descJson.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5lLXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVmaW5lLXByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7O0FBRUgseUNBQTJDO0FBQzNDOzs7R0FHRztBQUVILElBQU0sZUFBZSxHQUFJLE1BQWMsQ0FBQyxrQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO0FBQzlGLElBQU0seUJBQXlCLEdBQUksTUFBYyxDQUFDLGtCQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNyRixNQUFNLENBQUMsd0JBQXdCLENBQUM7QUFDcEMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUM5QixJQUFNLGtCQUFrQixHQUFHLGtCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV6RDtJQUNFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDOUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLElBQUksU0FBUyxDQUFDLHdDQUF3QyxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDeEYsQ0FBQztRQUNELElBQU0sd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDdkUsQ0FBQyxDQUFDO0lBRUYsTUFBTSxDQUFDLGdCQUFnQixHQUFHLFVBQVMsR0FBRyxFQUFFLEtBQUs7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFJO1lBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUM7SUFFRixNQUFNLENBQUMsTUFBTSxHQUFRLFVBQVMsR0FBUSxFQUFFLEtBQVU7UUFDaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFJO2dCQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixNQUFNLENBQUMsd0JBQXdCLEdBQUcsVUFBUyxHQUFHLEVBQUUsSUFBSTtRQUNsRCxJQUFNLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztBQUNKLENBQUM7QUFuQ0Qsc0NBbUNDO0FBRUQsMkJBQWtDLEdBQVEsRUFBRSxJQUFZLEVBQUUsSUFBUztJQUNqRSxJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDbkQsSUFBSSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUM7QUFDdkUsQ0FBQztBQUpELDhDQUlDO0FBRUQsMEJBQTBCLEdBQVEsRUFBRSxJQUFTO0lBQzNDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUVELDJCQUEyQixHQUFRLEVBQUUsSUFBWSxFQUFFLElBQVM7SUFDMUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixlQUFlLENBQUMsR0FBRyxFQUFFLGtCQUFrQixFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBQ0QsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELDRCQUE0QixHQUFRLEVBQUUsSUFBWSxFQUFFLElBQVMsRUFBRSx3QkFBNkI7SUFDMUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEIsNkZBQTZGO1lBQzdGLHFDQUFxQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLHdCQUF3QixJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyx3QkFBd0IsQ0FBQztZQUMvQyxDQUFDO1lBQ0QsSUFBSSxDQUFDO2dCQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLFFBQVEsR0FBVyxJQUFJLENBQUM7Z0JBQzVCLElBQUksQ0FBQztvQkFDSCxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNmLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2pDLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBNEIsSUFBSSwyQkFBc0IsUUFBUSxxQkFDOUMsR0FBRyxvQ0FBK0IsS0FBTyxDQUFDLENBQUM7WUFDekUsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge3pvbmVTeW1ib2x9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG4vKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgZm9yIENocm9tZSBhbmQgQ2hyb21lIG1vYmlsZSwgdG8gZW5hYmxlXG4gKiB0aGluZ3MgbGlrZSByZWRlZmluaW5nIGBjcmVhdGVkQ2FsbGJhY2tgIG9uIGFuIGVsZW1lbnQuXG4gKi9cblxuY29uc3QgX2RlZmluZVByb3BlcnR5ID0gKE9iamVjdCBhcyBhbnkpW3pvbmVTeW1ib2woJ2RlZmluZVByb3BlcnR5JyldID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuY29uc3QgX2dldE93blByb3BlcnR5RGVzY3JpcHRvciA9IChPYmplY3QgYXMgYW55KVt6b25lU3ltYm9sKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InKV0gPVxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5jb25zdCBfY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbmNvbnN0IHVuY29uZmlndXJhYmxlc0tleSA9IHpvbmVTeW1ib2woJ3VuY29uZmlndXJhYmxlcycpO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlQYXRjaCgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBwcm9wLCBkZXNjKSB7XG4gICAgaWYgKGlzVW5jb25maWd1cmFibGUob2JqLCBwcm9wKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGFzc2lnbiB0byByZWFkIG9ubHkgcHJvcGVydHkgXFwnJyArIHByb3AgKyAnXFwnIG9mICcgKyBvYmopO1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5hbENvbmZpZ3VyYWJsZUZsYWcgPSBkZXNjLmNvbmZpZ3VyYWJsZTtcbiAgICBpZiAocHJvcCAhPT0gJ3Byb3RvdHlwZScpIHtcbiAgICAgIGRlc2MgPSByZXdyaXRlRGVzY3JpcHRvcihvYmosIHByb3AsIGRlc2MpO1xuICAgIH1cbiAgICByZXR1cm4gX3RyeURlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgZGVzYywgb3JpZ2luYWxDb25maWd1cmFibGVGbGFnKTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uKG9iaiwgcHJvcHMpIHtcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBwcm9wc1twcm9wXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICBPYmplY3QuY3JlYXRlID0gPGFueT5mdW5jdGlvbihvYmo6IGFueSwgcHJvdG86IGFueSkge1xuICAgIGlmICh0eXBlb2YgcHJvdG8gPT09ICdvYmplY3QnICYmICFPYmplY3QuaXNGcm96ZW4ocHJvdG8pKSB7XG4gICAgICBPYmplY3Qua2V5cyhwcm90bykuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgIHByb3RvW3Byb3BdID0gcmV3cml0ZURlc2NyaXB0b3Iob2JqLCBwcm9wLCBwcm90b1twcm9wXSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIF9jcmVhdGUob2JqLCBwcm90byk7XG4gIH07XG5cbiAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkge1xuICAgIGNvbnN0IGRlc2MgPSBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgcHJvcCk7XG4gICAgaWYgKGlzVW5jb25maWd1cmFibGUob2JqLCBwcm9wKSkge1xuICAgICAgZGVzYy5jb25maWd1cmFibGUgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2M7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfcmVkZWZpbmVQcm9wZXJ0eShvYmo6IGFueSwgcHJvcDogc3RyaW5nLCBkZXNjOiBhbnkpIHtcbiAgY29uc3Qgb3JpZ2luYWxDb25maWd1cmFibGVGbGFnID0gZGVzYy5jb25maWd1cmFibGU7XG4gIGRlc2MgPSByZXdyaXRlRGVzY3JpcHRvcihvYmosIHByb3AsIGRlc2MpO1xuICByZXR1cm4gX3RyeURlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgZGVzYywgb3JpZ2luYWxDb25maWd1cmFibGVGbGFnKTtcbn1cblxuZnVuY3Rpb24gaXNVbmNvbmZpZ3VyYWJsZShvYmo6IGFueSwgcHJvcDogYW55KSB7XG4gIHJldHVybiBvYmogJiYgb2JqW3VuY29uZmlndXJhYmxlc0tleV0gJiYgb2JqW3VuY29uZmlndXJhYmxlc0tleV1bcHJvcF07XG59XG5cbmZ1bmN0aW9uIHJld3JpdGVEZXNjcmlwdG9yKG9iajogYW55LCBwcm9wOiBzdHJpbmcsIGRlc2M6IGFueSkge1xuICBkZXNjLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gIGlmICghZGVzYy5jb25maWd1cmFibGUpIHtcbiAgICBpZiAoIW9ialt1bmNvbmZpZ3VyYWJsZXNLZXldKSB7XG4gICAgICBfZGVmaW5lUHJvcGVydHkob2JqLCB1bmNvbmZpZ3VyYWJsZXNLZXksIHt3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHt9fSk7XG4gICAgfVxuICAgIG9ialt1bmNvbmZpZ3VyYWJsZXNLZXldW3Byb3BdID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZGVzYztcbn1cblxuZnVuY3Rpb24gX3RyeURlZmluZVByb3BlcnR5KG9iajogYW55LCBwcm9wOiBzdHJpbmcsIGRlc2M6IGFueSwgb3JpZ2luYWxDb25maWd1cmFibGVGbGFnOiBhbnkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gX2RlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgZGVzYyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICAvLyBJbiBjYXNlIG9mIGVycm9ycywgd2hlbiB0aGUgY29uZmlndXJhYmxlIGZsYWcgd2FzIGxpa2VseSBzZXQgYnkgcmV3cml0ZURlc2NyaXB0b3IoKSwgbGV0J3NcbiAgICAgIC8vIHJldHJ5IHdpdGggdGhlIG9yaWdpbmFsIGZsYWcgdmFsdWVcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxDb25maWd1cmFibGVGbGFnID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGRlbGV0ZSBkZXNjLmNvbmZpZ3VyYWJsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc2MuY29uZmlndXJhYmxlID0gb3JpZ2luYWxDb25maWd1cmFibGVGbGFnO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlc2MpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbGV0IGRlc2NKc29uOiBzdHJpbmcgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRlc2NKc29uID0gSlNPTi5zdHJpbmdpZnkoZGVzYyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgZGVzY0pzb24gPSBkZXNjSnNvbi50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBBdHRlbXB0aW5nIHRvIGNvbmZpZ3VyZSAnJHtwcm9wfScgd2l0aCBkZXNjcmlwdG9yICcke2Rlc2NKc29uXG4gICAgICAgICAgICAgICAgICAgIH0nIG9uIG9iamVjdCAnJHtvYmp9JyBhbmQgZ290IGVycm9yLCBnaXZpbmcgdXA6ICR7ZXJyb3J9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuIl19