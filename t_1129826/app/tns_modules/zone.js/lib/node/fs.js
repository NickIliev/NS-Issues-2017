"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
Zone.__load_patch('fs', function (global, Zone, api) {
    var fs;
    try {
        fs = require('fs');
    }
    catch (err) {
    }
    // watch, watchFile, unwatchFile has been patched
    // because EventEmitter has been patched
    var TO_PATCH_MACROTASK_METHODS = [
        'access', 'appendFile', 'chmod', 'chown', 'close', 'exists', 'fchmod',
        'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes', 'lchmod',
        'lchown', 'link', 'lstat', 'mkdir', 'mkdtemp', 'open', 'read',
        'readdir', 'readFile', 'readlink', 'realpath', 'rename', 'rmdir', 'stat',
        'symlink', 'truncate', 'unlink', 'utimes', 'write', 'writeFile',
    ];
    if (fs) {
        TO_PATCH_MACROTASK_METHODS.filter(function (name) { return !!fs[name] && typeof fs[name] === 'function'; })
            .forEach(function (name) {
            utils_1.patchMacroTask(fs, name, function (self, args) {
                return {
                    name: 'fs.' + name,
                    args: args,
                    callbackIndex: args.length > 0 ? args.length - 1 : -1,
                    target: self
                };
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILHlDQUErQztBQUUvQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFDLE1BQVcsRUFBRSxJQUFjLEVBQUUsR0FBaUI7SUFDckUsSUFBSSxFQUFPLENBQUM7SUFDWixJQUFJLENBQUM7UUFDSCxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELGlEQUFpRDtJQUNqRCx3Q0FBd0M7SUFDeEMsSUFBTSwwQkFBMEIsR0FBRztRQUNqQyxRQUFRLEVBQUcsWUFBWSxFQUFFLE9BQU8sRUFBSyxPQUFPLEVBQUssT0FBTyxFQUFNLFFBQVEsRUFBSyxRQUFRO1FBQ25GLFFBQVEsRUFBRyxXQUFXLEVBQUcsT0FBTyxFQUFLLE9BQU8sRUFBSyxXQUFXLEVBQUUsU0FBUyxFQUFJLFFBQVE7UUFDbkYsUUFBUSxFQUFHLE1BQU0sRUFBUSxPQUFPLEVBQUssT0FBTyxFQUFLLFNBQVMsRUFBSSxNQUFNLEVBQU8sTUFBTTtRQUNqRixTQUFTLEVBQUUsVUFBVSxFQUFJLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFLLE9BQU8sRUFBTSxNQUFNO1FBQ2pGLFNBQVMsRUFBRSxVQUFVLEVBQUksUUFBUSxFQUFJLFFBQVEsRUFBSSxPQUFPLEVBQU0sV0FBVztLQUMxRSxDQUFDO0lBRUYsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNQLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUE1QyxDQUE0QyxDQUFDO2FBQ2xGLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDWCxzQkFBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBQyxJQUFTLEVBQUUsSUFBVztnQkFDOUMsTUFBTSxDQUFDO29CQUNMLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSTtvQkFDbEIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsYUFBYSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDckQsTUFBTSxFQUFFLElBQUk7aUJBQ2IsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7cGF0Y2hNYWNyb1Rhc2t9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cblpvbmUuX19sb2FkX3BhdGNoKCdmcycsIChnbG9iYWw6IGFueSwgWm9uZTogWm9uZVR5cGUsIGFwaTogX1pvbmVQcml2YXRlKSA9PiB7XG4gIGxldCBmczogYW55O1xuICB0cnkge1xuICAgIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gIH1cblxuICAvLyB3YXRjaCwgd2F0Y2hGaWxlLCB1bndhdGNoRmlsZSBoYXMgYmVlbiBwYXRjaGVkXG4gIC8vIGJlY2F1c2UgRXZlbnRFbWl0dGVyIGhhcyBiZWVuIHBhdGNoZWRcbiAgY29uc3QgVE9fUEFUQ0hfTUFDUk9UQVNLX01FVEhPRFMgPSBbXG4gICAgJ2FjY2VzcycsICAnYXBwZW5kRmlsZScsICdjaG1vZCcsICAgICdjaG93bicsICAgICdjbG9zZScsICAgICAnZXhpc3RzJywgICAgJ2ZjaG1vZCcsXG4gICAgJ2ZjaG93bicsICAnZmRhdGFzeW5jJywgICdmc3RhdCcsICAgICdmc3luYycsICAgICdmdHJ1bmNhdGUnLCAnZnV0aW1lcycsICAgJ2xjaG1vZCcsXG4gICAgJ2xjaG93bicsICAnbGluaycsICAgICAgICdsc3RhdCcsICAgICdta2RpcicsICAgICdta2R0ZW1wJywgICAnb3BlbicsICAgICAgJ3JlYWQnLFxuICAgICdyZWFkZGlyJywgJ3JlYWRGaWxlJywgICAncmVhZGxpbmsnLCAncmVhbHBhdGgnLCAncmVuYW1lJywgICAgJ3JtZGlyJywgICAgICdzdGF0JyxcbiAgICAnc3ltbGluaycsICd0cnVuY2F0ZScsICAgJ3VubGluaycsICAgJ3V0aW1lcycsICAgJ3dyaXRlJywgICAgICd3cml0ZUZpbGUnLFxuICBdO1xuXG4gIGlmIChmcykge1xuICAgIFRPX1BBVENIX01BQ1JPVEFTS19NRVRIT0RTLmZpbHRlcihuYW1lID0+ICEhZnNbbmFtZV0gJiYgdHlwZW9mIGZzW25hbWVdID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICBwYXRjaE1hY3JvVGFzayhmcywgbmFtZSwgKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG5hbWU6ICdmcy4nICsgbmFtZSxcbiAgICAgICAgICAgICAgYXJnczogYXJncyxcbiAgICAgICAgICAgICAgY2FsbGJhY2tJbmRleDogYXJncy5sZW5ndGggPiAwID8gYXJncy5sZW5ndGggLSAxIDogLTEsXG4gICAgICAgICAgICAgIHRhcmdldDogc2VsZlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gIH1cbn0pOyJdfQ==