/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
'use strict';
(function () {
    var __extends = function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    // Patch jasmine's describe/it/beforeEach/afterEach functions so test code always runs
    // in a testZone (ProxyZone). (See: angular/zone.js#91 & angular/angular#10503)
    if (!Zone)
        throw new Error('Missing: zone.js');
    if (typeof jasmine == 'undefined')
        throw new Error('Missing: jasmine.js');
    if (jasmine['__zone_patch__'])
        throw new Error('\'jasmine\' has already been patched with \'Zone\'.');
    jasmine['__zone_patch__'] = true;
    var SyncTestZoneSpec = Zone['SyncTestZoneSpec'];
    var ProxyZoneSpec = Zone['ProxyZoneSpec'];
    if (!SyncTestZoneSpec)
        throw new Error('Missing: SyncTestZoneSpec');
    if (!ProxyZoneSpec)
        throw new Error('Missing: ProxyZoneSpec');
    var ambientZone = Zone.current;
    // Create a synchronous-only zone in which to run `describe` blocks in order to raise an
    // error if any asynchronous operations are attempted inside of a `describe` but outside of
    // a `beforeEach` or `it`.
    var syncZone = ambientZone.fork(new SyncTestZoneSpec('jasmine.describe'));
    // This is the zone which will be used for running individual tests.
    // It will be a proxy zone, so that the tests function can retroactively install
    // different zones.
    // Example:
    //   - In beforeEach() do childZone = Zone.current.fork(...);
    //   - In it() try to do fakeAsync(). The issue is that because the beforeEach forked the
    //     zone outside of fakeAsync it will be able to escape the fakeAsync rules.
    //   - Because ProxyZone is parent fo `childZone` fakeAsync can retroactively add
    //     fakeAsync behavior to the childZone.
    var testProxyZone = null;
    // Monkey patch all of the jasmine DSL so that each function runs in appropriate zone.
    var jasmineEnv = jasmine.getEnv();
    ['describe', 'xdescribe', 'fdescribe'].forEach(function (methodName) {
        var originalJasmineFn = jasmineEnv[methodName];
        jasmineEnv[methodName] = function (description, specDefinitions) {
            return originalJasmineFn.call(this, description, wrapDescribeInZone(specDefinitions));
        };
    });
    ['it', 'xit', 'fit'].forEach(function (methodName) {
        var originalJasmineFn = jasmineEnv[methodName];
        jasmineEnv[methodName] = function (description, specDefinitions, timeout) {
            arguments[1] = wrapTestInZone(specDefinitions);
            return originalJasmineFn.apply(this, arguments);
        };
    });
    ['beforeEach', 'afterEach'].forEach(function (methodName) {
        var originalJasmineFn = jasmineEnv[methodName];
        jasmineEnv[methodName] = function (specDefinitions, timeout) {
            arguments[0] = wrapTestInZone(specDefinitions);
            return originalJasmineFn.apply(this, arguments);
        };
    });
    /**
     * Gets a function wrapping the body of a Jasmine `describe` block to execute in a
     * synchronous-only zone.
     */
    function wrapDescribeInZone(describeBody) {
        return function () {
            return syncZone.run(describeBody, this, arguments);
        };
    }
    /**
     * Gets a function wrapping the body of a Jasmine `it/beforeEach/afterEach` block to
     * execute in a ProxyZone zone.
     * This will run in `testProxyZone`. The `testProxyZone` will be reset by the `ZoneQueueRunner`
     */
    function wrapTestInZone(testBody) {
        // The `done` callback is only passed through if the function expects at least one argument.
        // Note we have to make a function with correct number of arguments, otherwise jasmine will
        // think that all functions are sync or async.
        return testBody && (testBody.length ? function (done) {
            return testProxyZone.run(testBody, this, [done]);
        } : function () {
            return testProxyZone.run(testBody, this);
        });
    }
    var QueueRunner = jasmine.QueueRunner;
    jasmine.QueueRunner = (function (_super) {
        __extends(ZoneQueueRunner, _super);
        function ZoneQueueRunner(attrs) {
            attrs.onComplete = (function (fn) { return function () {
                // All functions are done, clear the test zone.
                testProxyZone = null;
                ambientZone.scheduleMicroTask('jasmine.onComplete', fn);
            }; })(attrs.onComplete);
            _super.call(this, attrs);
        }
        ZoneQueueRunner.prototype.execute = function () {
            var _this = this;
            if (Zone.current !== ambientZone)
                throw new Error('Unexpected Zone: ' + Zone.current.name);
            testProxyZone = ambientZone.fork(new ProxyZoneSpec());
            if (!Zone.currentTask) {
                // if we are not running in a task then if someone would register a
                // element.addEventListener and then calling element.click() the
                // addEventListener callback would think that it is the top most task and would
                // drain the microtask queue on element.click() which would be incorrect.
                // For this reason we always force a task when running jasmine tests.
                Zone.current.scheduleMicroTask('jasmine.execute().forceTask', function () { return QueueRunner.prototype.execute.call(_this); });
            }
            else {
                _super.prototype.execute.call(this);
            }
        };
        return ZoneQueueRunner;
    }(QueueRunner));
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamFzbWluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImphc21pbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsWUFBWSxDQUFDO0FBQ2IsQ0FBQztJQUNDLElBQU0sU0FBUyxHQUFHLFVBQVMsQ0FBTSxFQUFFLENBQU07UUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QztZQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFLLEVBQVUsRUFBRSxDQUFDLENBQUM7SUFDaEcsQ0FBQyxDQUFDO0lBQ0Ysc0ZBQXNGO0lBQ3RGLCtFQUErRTtJQUMvRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMvQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sSUFBSSxXQUFXLENBQUM7UUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDMUUsRUFBRSxDQUFDLENBQUUsT0FBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0lBQ3hFLE9BQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUUxQyxJQUFNLGdCQUFnQixHQUFvQyxJQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRixJQUFNLGFBQWEsR0FBd0IsSUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7UUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFFOUQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNqQyx3RkFBd0Y7SUFDeEYsMkZBQTJGO0lBQzNGLDBCQUEwQjtJQUMxQixJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBRTVFLG9FQUFvRTtJQUNwRSxnRkFBZ0Y7SUFDaEYsbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCw2REFBNkQ7SUFDN0QseUZBQXlGO0lBQ3pGLCtFQUErRTtJQUMvRSxpRkFBaUY7SUFDakYsMkNBQTJDO0lBQzNDLElBQUksYUFBYSxHQUFTLElBQUksQ0FBQztJQUUvQixzRkFBc0Y7SUFDdEYsSUFBTSxVQUFVLEdBQVEsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pDLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO1FBQ3hELElBQUksaUJBQWlCLEdBQWEsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFTLFdBQW1CLEVBQUUsZUFBeUI7WUFDOUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtRQUN0QyxJQUFJLGlCQUFpQixHQUFhLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6RCxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFDckIsV0FBbUIsRUFBRSxlQUF5QixFQUFFLE9BQWU7WUFDakUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUNILENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7UUFDN0MsSUFBSSxpQkFBaUIsR0FBYSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVMsZUFBeUIsRUFBRSxPQUFlO1lBQzFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSDs7O09BR0c7SUFDSCw0QkFBNEIsWUFBc0I7UUFDaEQsTUFBTSxDQUFDO1lBQ0wsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxTQUF5QixDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx3QkFBd0IsUUFBa0I7UUFDeEMsNEZBQTRGO1FBQzVGLDJGQUEyRjtRQUMzRiw4Q0FBOEM7UUFDOUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsVUFBUyxJQUFjO1lBQ3BELE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsR0FBRztZQUNGLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNaLENBQUM7SUFlRCxJQUFNLFdBQVcsR0FBSSxPQUFlLENBQUMsV0FBMkQsQ0FBQztJQUNoRyxPQUFlLENBQUMsV0FBVyxHQUFHLENBQUMsVUFBUyxNQUFNO1FBQzdDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMseUJBQXlCLEtBQTZCO1lBQ3BELEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBO2dCQUMxQiwrQ0FBK0M7Z0JBQy9DLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxRCxDQUFDLEVBSjJCLENBSTNCLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHO1lBQUEsaUJBY25DO1lBYkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUM7Z0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNGLGFBQWEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsQ0FBQztZQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixtRUFBbUU7Z0JBQ25FLGdFQUFnRTtnQkFDaEUsK0VBQStFO2dCQUMvRSx5RUFBeUU7Z0JBQ3pFLHFFQUFxRTtnQkFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FDMUIsNkJBQTZCLEVBQUUsY0FBTSxPQUFBLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDO1lBQ3JGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsQ0FBQztRQUNILENBQUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDekIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuKCgpID0+IHtcbiAgY29uc3QgX19leHRlbmRzID0gZnVuY3Rpb24oZDogYW55LCBiOiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IHAgaW4gYilcbiAgICAgIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHtcbiAgICAgIHRoaXMuY29uc3RydWN0b3IgPSBkO1xuICAgIH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgKF9fIGFzIGFueSkoKSk7XG4gIH07XG4gIC8vIFBhdGNoIGphc21pbmUncyBkZXNjcmliZS9pdC9iZWZvcmVFYWNoL2FmdGVyRWFjaCBmdW5jdGlvbnMgc28gdGVzdCBjb2RlIGFsd2F5cyBydW5zXG4gIC8vIGluIGEgdGVzdFpvbmUgKFByb3h5Wm9uZSkuIChTZWU6IGFuZ3VsYXIvem9uZS5qcyM5MSAmIGFuZ3VsYXIvYW5ndWxhciMxMDUwMylcbiAgaWYgKCFab25lKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmc6IHpvbmUuanMnKTtcbiAgaWYgKHR5cGVvZiBqYXNtaW5lID09ICd1bmRlZmluZWQnKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmc6IGphc21pbmUuanMnKTtcbiAgaWYgKChqYXNtaW5lIGFzIGFueSlbJ19fem9uZV9wYXRjaF9fJ10pXG4gICAgdGhyb3cgbmV3IEVycm9yKCdcXCdqYXNtaW5lXFwnIGhhcyBhbHJlYWR5IGJlZW4gcGF0Y2hlZCB3aXRoIFxcJ1pvbmVcXCcuJyk7XG4gIChqYXNtaW5lIGFzIGFueSlbJ19fem9uZV9wYXRjaF9fJ10gPSB0cnVlO1xuXG4gIGNvbnN0IFN5bmNUZXN0Wm9uZVNwZWM6IHtuZXcgKG5hbWU6IHN0cmluZyk6IFpvbmVTcGVjfSA9IChab25lIGFzIGFueSlbJ1N5bmNUZXN0Wm9uZVNwZWMnXTtcbiAgY29uc3QgUHJveHlab25lU3BlYzoge25ldyAoKTogWm9uZVNwZWN9ID0gKFpvbmUgYXMgYW55KVsnUHJveHlab25lU3BlYyddO1xuICBpZiAoIVN5bmNUZXN0Wm9uZVNwZWMpIHRocm93IG5ldyBFcnJvcignTWlzc2luZzogU3luY1Rlc3Rab25lU3BlYycpO1xuICBpZiAoIVByb3h5Wm9uZVNwZWMpIHRocm93IG5ldyBFcnJvcignTWlzc2luZzogUHJveHlab25lU3BlYycpO1xuXG4gIGNvbnN0IGFtYmllbnRab25lID0gWm9uZS5jdXJyZW50O1xuICAvLyBDcmVhdGUgYSBzeW5jaHJvbm91cy1vbmx5IHpvbmUgaW4gd2hpY2ggdG8gcnVuIGBkZXNjcmliZWAgYmxvY2tzIGluIG9yZGVyIHRvIHJhaXNlIGFuXG4gIC8vIGVycm9yIGlmIGFueSBhc3luY2hyb25vdXMgb3BlcmF0aW9ucyBhcmUgYXR0ZW1wdGVkIGluc2lkZSBvZiBhIGBkZXNjcmliZWAgYnV0IG91dHNpZGUgb2ZcbiAgLy8gYSBgYmVmb3JlRWFjaGAgb3IgYGl0YC5cbiAgY29uc3Qgc3luY1pvbmUgPSBhbWJpZW50Wm9uZS5mb3JrKG5ldyBTeW5jVGVzdFpvbmVTcGVjKCdqYXNtaW5lLmRlc2NyaWJlJykpO1xuXG4gIC8vIFRoaXMgaXMgdGhlIHpvbmUgd2hpY2ggd2lsbCBiZSB1c2VkIGZvciBydW5uaW5nIGluZGl2aWR1YWwgdGVzdHMuXG4gIC8vIEl0IHdpbGwgYmUgYSBwcm94eSB6b25lLCBzbyB0aGF0IHRoZSB0ZXN0cyBmdW5jdGlvbiBjYW4gcmV0cm9hY3RpdmVseSBpbnN0YWxsXG4gIC8vIGRpZmZlcmVudCB6b25lcy5cbiAgLy8gRXhhbXBsZTpcbiAgLy8gICAtIEluIGJlZm9yZUVhY2goKSBkbyBjaGlsZFpvbmUgPSBab25lLmN1cnJlbnQuZm9yayguLi4pO1xuICAvLyAgIC0gSW4gaXQoKSB0cnkgdG8gZG8gZmFrZUFzeW5jKCkuIFRoZSBpc3N1ZSBpcyB0aGF0IGJlY2F1c2UgdGhlIGJlZm9yZUVhY2ggZm9ya2VkIHRoZVxuICAvLyAgICAgem9uZSBvdXRzaWRlIG9mIGZha2VBc3luYyBpdCB3aWxsIGJlIGFibGUgdG8gZXNjYXBlIHRoZSBmYWtlQXN5bmMgcnVsZXMuXG4gIC8vICAgLSBCZWNhdXNlIFByb3h5Wm9uZSBpcyBwYXJlbnQgZm8gYGNoaWxkWm9uZWAgZmFrZUFzeW5jIGNhbiByZXRyb2FjdGl2ZWx5IGFkZFxuICAvLyAgICAgZmFrZUFzeW5jIGJlaGF2aW9yIHRvIHRoZSBjaGlsZFpvbmUuXG4gIGxldCB0ZXN0UHJveHlab25lOiBab25lID0gbnVsbDtcblxuICAvLyBNb25rZXkgcGF0Y2ggYWxsIG9mIHRoZSBqYXNtaW5lIERTTCBzbyB0aGF0IGVhY2ggZnVuY3Rpb24gcnVucyBpbiBhcHByb3ByaWF0ZSB6b25lLlxuICBjb25zdCBqYXNtaW5lRW52OiBhbnkgPSBqYXNtaW5lLmdldEVudigpO1xuICBbJ2Rlc2NyaWJlJywgJ3hkZXNjcmliZScsICdmZGVzY3JpYmUnXS5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XG4gICAgbGV0IG9yaWdpbmFsSmFzbWluZUZuOiBGdW5jdGlvbiA9IGphc21pbmVFbnZbbWV0aG9kTmFtZV07XG4gICAgamFzbWluZUVudlttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcsIHNwZWNEZWZpbml0aW9uczogRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbEphc21pbmVGbi5jYWxsKHRoaXMsIGRlc2NyaXB0aW9uLCB3cmFwRGVzY3JpYmVJblpvbmUoc3BlY0RlZmluaXRpb25zKSk7XG4gICAgfTtcbiAgfSk7XG4gIFsnaXQnLCAneGl0JywgJ2ZpdCddLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcbiAgICBsZXQgb3JpZ2luYWxKYXNtaW5lRm46IEZ1bmN0aW9uID0gamFzbWluZUVudlttZXRob2ROYW1lXTtcbiAgICBqYXNtaW5lRW52W21ldGhvZE5hbWVdID0gZnVuY3Rpb24oXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHNwZWNEZWZpbml0aW9uczogRnVuY3Rpb24sIHRpbWVvdXQ6IG51bWJlcikge1xuICAgICAgYXJndW1lbnRzWzFdID0gd3JhcFRlc3RJblpvbmUoc3BlY0RlZmluaXRpb25zKTtcbiAgICAgIHJldHVybiBvcmlnaW5hbEphc21pbmVGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuICBbJ2JlZm9yZUVhY2gnLCAnYWZ0ZXJFYWNoJ10uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuICAgIGxldCBvcmlnaW5hbEphc21pbmVGbjogRnVuY3Rpb24gPSBqYXNtaW5lRW52W21ldGhvZE5hbWVdO1xuICAgIGphc21pbmVFbnZbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbihzcGVjRGVmaW5pdGlvbnM6IEZ1bmN0aW9uLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICAgIGFyZ3VtZW50c1swXSA9IHdyYXBUZXN0SW5ab25lKHNwZWNEZWZpbml0aW9ucyk7XG4gICAgICByZXR1cm4gb3JpZ2luYWxKYXNtaW5lRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICAvKipcbiAgICogR2V0cyBhIGZ1bmN0aW9uIHdyYXBwaW5nIHRoZSBib2R5IG9mIGEgSmFzbWluZSBgZGVzY3JpYmVgIGJsb2NrIHRvIGV4ZWN1dGUgaW4gYVxuICAgKiBzeW5jaHJvbm91cy1vbmx5IHpvbmUuXG4gICAqL1xuICBmdW5jdGlvbiB3cmFwRGVzY3JpYmVJblpvbmUoZGVzY3JpYmVCb2R5OiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gc3luY1pvbmUucnVuKGRlc2NyaWJlQm9keSwgdGhpcywgYXJndW1lbnRzIGFzIGFueSBhcyBhbnlbXSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgZnVuY3Rpb24gd3JhcHBpbmcgdGhlIGJvZHkgb2YgYSBKYXNtaW5lIGBpdC9iZWZvcmVFYWNoL2FmdGVyRWFjaGAgYmxvY2sgdG9cbiAgICogZXhlY3V0ZSBpbiBhIFByb3h5Wm9uZSB6b25lLlxuICAgKiBUaGlzIHdpbGwgcnVuIGluIGB0ZXN0UHJveHlab25lYC4gVGhlIGB0ZXN0UHJveHlab25lYCB3aWxsIGJlIHJlc2V0IGJ5IHRoZSBgWm9uZVF1ZXVlUnVubmVyYFxuICAgKi9cbiAgZnVuY3Rpb24gd3JhcFRlc3RJblpvbmUodGVzdEJvZHk6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIC8vIFRoZSBgZG9uZWAgY2FsbGJhY2sgaXMgb25seSBwYXNzZWQgdGhyb3VnaCBpZiB0aGUgZnVuY3Rpb24gZXhwZWN0cyBhdCBsZWFzdCBvbmUgYXJndW1lbnQuXG4gICAgLy8gTm90ZSB3ZSBoYXZlIHRvIG1ha2UgYSBmdW5jdGlvbiB3aXRoIGNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cywgb3RoZXJ3aXNlIGphc21pbmUgd2lsbFxuICAgIC8vIHRoaW5rIHRoYXQgYWxsIGZ1bmN0aW9ucyBhcmUgc3luYyBvciBhc3luYy5cbiAgICByZXR1cm4gdGVzdEJvZHkgJiYgKHRlc3RCb2R5Lmxlbmd0aCA/IGZ1bmN0aW9uKGRvbmU6IEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgcmV0dXJuIHRlc3RQcm94eVpvbmUucnVuKHRlc3RCb2R5LCB0aGlzLCBbZG9uZV0pO1xuICAgICAgICAgICB9IDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgcmV0dXJuIHRlc3RQcm94eVpvbmUucnVuKHRlc3RCb2R5LCB0aGlzKTtcbiAgICAgICAgICAgfSk7XG4gIH1cbiAgaW50ZXJmYWNlIFF1ZXVlUnVubmVyIHtcbiAgICBleGVjdXRlKCk6IHZvaWQ7XG4gIH1cbiAgaW50ZXJmYWNlIFF1ZXVlUnVubmVyQXR0cnMge1xuICAgIHF1ZXVlYWJsZUZuczoge2ZuOiBGdW5jdGlvbn1bXTtcbiAgICBvbkNvbXBsZXRlOiAoKSA9PiB2b2lkO1xuICAgIGNsZWFyU3RhY2s6IChmbjogYW55KSA9PiB2b2lkO1xuICAgIG9uRXhjZXB0aW9uOiAoZXJyb3I6IGFueSkgPT4gdm9pZDtcbiAgICBjYXRjaEV4Y2VwdGlvbjogKCkgPT4gYm9vbGVhbjtcbiAgICB1c2VyQ29udGV4dDogYW55O1xuICAgIHRpbWVvdXQ6IHtzZXRUaW1lb3V0OiBGdW5jdGlvbiwgY2xlYXJUaW1lb3V0OiBGdW5jdGlvbn07XG4gICAgZmFpbDogKCkgPT4gdm9pZDtcbiAgfVxuXG4gIGNvbnN0IFF1ZXVlUnVubmVyID0gKGphc21pbmUgYXMgYW55KS5RdWV1ZVJ1bm5lciBhcyB7bmV3IChhdHRyczogUXVldWVSdW5uZXJBdHRycyk6IFF1ZXVlUnVubmVyfTtcbiAgKGphc21pbmUgYXMgYW55KS5RdWV1ZVJ1bm5lciA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWm9uZVF1ZXVlUnVubmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFpvbmVRdWV1ZVJ1bm5lcihhdHRyczoge29uQ29tcGxldGU6IEZ1bmN0aW9ufSkge1xuICAgICAgYXR0cnMub25Db21wbGV0ZSA9ICgoZm4pID0+ICgpID0+IHtcbiAgICAgICAgLy8gQWxsIGZ1bmN0aW9ucyBhcmUgZG9uZSwgY2xlYXIgdGhlIHRlc3Qgem9uZS5cbiAgICAgICAgdGVzdFByb3h5Wm9uZSA9IG51bGw7XG4gICAgICAgIGFtYmllbnRab25lLnNjaGVkdWxlTWljcm9UYXNrKCdqYXNtaW5lLm9uQ29tcGxldGUnLCBmbik7XG4gICAgICB9KShhdHRycy5vbkNvbXBsZXRlKTtcbiAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGF0dHJzKTtcbiAgICB9XG4gICAgWm9uZVF1ZXVlUnVubmVyLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoWm9uZS5jdXJyZW50ICE9PSBhbWJpZW50Wm9uZSkgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIFpvbmU6ICcgKyBab25lLmN1cnJlbnQubmFtZSk7XG4gICAgICB0ZXN0UHJveHlab25lID0gYW1iaWVudFpvbmUuZm9yayhuZXcgUHJveHlab25lU3BlYygpKTtcbiAgICAgIGlmICghWm9uZS5jdXJyZW50VGFzaykge1xuICAgICAgICAvLyBpZiB3ZSBhcmUgbm90IHJ1bm5pbmcgaW4gYSB0YXNrIHRoZW4gaWYgc29tZW9uZSB3b3VsZCByZWdpc3RlciBhXG4gICAgICAgIC8vIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBhbmQgdGhlbiBjYWxsaW5nIGVsZW1lbnQuY2xpY2soKSB0aGVcbiAgICAgICAgLy8gYWRkRXZlbnRMaXN0ZW5lciBjYWxsYmFjayB3b3VsZCB0aGluayB0aGF0IGl0IGlzIHRoZSB0b3AgbW9zdCB0YXNrIGFuZCB3b3VsZFxuICAgICAgICAvLyBkcmFpbiB0aGUgbWljcm90YXNrIHF1ZXVlIG9uIGVsZW1lbnQuY2xpY2soKSB3aGljaCB3b3VsZCBiZSBpbmNvcnJlY3QuXG4gICAgICAgIC8vIEZvciB0aGlzIHJlYXNvbiB3ZSBhbHdheXMgZm9yY2UgYSB0YXNrIHdoZW4gcnVubmluZyBqYXNtaW5lIHRlc3RzLlxuICAgICAgICBab25lLmN1cnJlbnQuc2NoZWR1bGVNaWNyb1Rhc2soXG4gICAgICAgICAgICAnamFzbWluZS5leGVjdXRlKCkuZm9yY2VUYXNrJywgKCkgPT4gUXVldWVSdW5uZXIucHJvdG90eXBlLmV4ZWN1dGUuY2FsbCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmV4ZWN1dGUuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBab25lUXVldWVSdW5uZXI7XG4gIH0oUXVldWVSdW5uZXIpKTtcbn0pKCk7XG4iXX0=