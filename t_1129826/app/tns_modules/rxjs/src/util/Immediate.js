"use strict";
/**
Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/
Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("./root");
var ImmediateDefinition = (function () {
    function ImmediateDefinition(root) {
        this.root = root;
        if (root.setImmediate && typeof root.setImmediate === 'function') {
            this.setImmediate = root.setImmediate.bind(root);
            this.clearImmediate = root.clearImmediate.bind(root);
        }
        else {
            this.nextHandle = 1;
            this.tasksByHandle = {};
            this.currentlyRunningATask = false;
            // Don't get fooled by e.g. browserify environments.
            if (this.canUseProcessNextTick()) {
                // For Node.js before 0.9
                this.setImmediate = this.createProcessNextTickSetImmediate();
            }
            else if (this.canUsePostMessage()) {
                // For non-IE10 modern browsers
                this.setImmediate = this.createPostMessageSetImmediate();
            }
            else if (this.canUseMessageChannel()) {
                // For web workers, where supported
                this.setImmediate = this.createMessageChannelSetImmediate();
            }
            else if (this.canUseReadyStateChange()) {
                // For IE 6–8
                this.setImmediate = this.createReadyStateChangeSetImmediate();
            }
            else {
                // For older browsers
                this.setImmediate = this.createSetTimeoutSetImmediate();
            }
            var ci = function clearImmediate(handle) {
                delete clearImmediate.instance.tasksByHandle[handle];
            };
            ci.instance = this;
            this.clearImmediate = ci;
        }
    }
    ImmediateDefinition.prototype.identify = function (o) {
        return this.root.Object.prototype.toString.call(o);
    };
    ImmediateDefinition.prototype.canUseProcessNextTick = function () {
        return this.identify(this.root.process) === '[object process]';
    };
    ImmediateDefinition.prototype.canUseMessageChannel = function () {
        return Boolean(this.root.MessageChannel);
    };
    ImmediateDefinition.prototype.canUseReadyStateChange = function () {
        var document = this.root.document;
        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
    };
    ImmediateDefinition.prototype.canUsePostMessage = function () {
        var root = this.root;
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `root.postMessage` means something completely different and can't be used for this purpose.
        if (root.postMessage && !root.importScripts) {
            var postMessageIsAsynchronous_1 = true;
            var oldOnMessage = root.onmessage;
            root.onmessage = function () {
                postMessageIsAsynchronous_1 = false;
            };
            root.postMessage('', '*');
            root.onmessage = oldOnMessage;
            return postMessageIsAsynchronous_1;
        }
        return false;
    };
    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    ImmediateDefinition.prototype.partiallyApplied = function (handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var fn = function result() {
            var _a = result, handler = _a.handler, args = _a.args;
            if (typeof handler === 'function') {
                handler.apply(undefined, args);
            }
            else {
                (new Function('' + handler))();
            }
        };
        fn.handler = handler;
        fn.args = args;
        return fn;
    };
    ImmediateDefinition.prototype.addFromSetImmediateArguments = function (args) {
        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
        return this.nextHandle++;
    };
    ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createPostMessageSetImmediate = function () {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
        var root = this.root;
        var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
        var onGlobalMessage = function globalMessageHandler(event) {
            var instance = globalMessageHandler.instance;
            if (event.source === root &&
                typeof event.data === 'string' &&
                event.data.indexOf(messagePrefix) === 0) {
                instance.runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };
        onGlobalMessage.instance = this;
        root.addEventListener('message', onGlobalMessage, false);
        var fn = function setImmediate() {
            var _a = setImmediate, messagePrefix = _a.messagePrefix, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.postMessage(messagePrefix + handle, '*');
            return handle;
        };
        fn.instance = this;
        fn.messagePrefix = messagePrefix;
        return fn;
    };
    ImmediateDefinition.prototype.runIfPresent = function (handle) {
        // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
        // So if we're currently running a task, we'll need to delay this invocation.
        if (this.currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // 'too much recursion' error.
            this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
        }
        else {
            var task = this.tasksByHandle[handle];
            if (task) {
                this.currentlyRunningATask = true;
                try {
                    task();
                }
                finally {
                    this.clearImmediate(handle);
                    this.currentlyRunningATask = false;
                }
            }
        }
    };
    ImmediateDefinition.prototype.createMessageChannelSetImmediate = function () {
        var _this = this;
        var channel = new this.root.MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            _this.runIfPresent(handle);
        };
        var fn = function setImmediate() {
            var _a = setImmediate, channel = _a.channel, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
        fn.channel = channel;
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var root = instance.root;
            var doc = root.document;
            var html = doc.documentElement;
            var handle = instance.addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement('script');
            script.onreadystatechange = function () {
                instance.runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    return ImmediateDefinition;
}());
exports.ImmediateDefinition = ImmediateDefinition;
exports.Immediate = new ImmediateDefinition(root_1.root);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1tZWRpYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW1tZWRpYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7RUFFRTs7QUFFRiwrQkFBZ0M7QUFFaEM7SUFlRSw2QkFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztZQUVuQyxvREFBb0Q7WUFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyx5QkFBeUI7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7WUFDL0QsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLCtCQUErQjtnQkFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUMzRCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMs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QyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUQsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEYsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFSSxFQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUUxQixNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXRPRCxJQXNPQztBQXRPWSxrREFBbUI7QUF1T25CLFFBQUEsU0FBUyxHQUFHLElBQUksbUJBQW1CLENBQUMsV0FBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcblNvbWUgY3JlZGl0IGZvciB0aGlzIGhlbHBlciBnb2VzIHRvIGh0dHA6Ly9naXRodWIuY29tL1l1enVKUy9zZXRJbW1lZGlhdGVcbiovXG5cbmltcG9ydCB7ICByb290ICB9IGZyb20gJy4vcm9vdCc7XG5cbmV4cG9ydCBjbGFzcyBJbW1lZGlhdGVEZWZpbml0aW9uIHtcbiAgc2V0SW1tZWRpYXRlOiAoY2I6ICgpID0+IHZvaWQpID0+IG51bWJlcjtcblxuICBjbGVhckltbWVkaWF0ZTogKGhhbmRsZTogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIHByaXZhdGUgaWRlbnRpZnkobzogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5yb290Lk9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbiAgfVxuXG4gIHRhc2tzQnlIYW5kbGU6IGFueTtcblxuICBuZXh0SGFuZGxlOiBudW1iZXI7XG5cbiAgY3VycmVudGx5UnVubmluZ0FUYXNrOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm9vdDogYW55KSB7XG4gICAgaWYgKHJvb3Quc2V0SW1tZWRpYXRlICYmIHR5cGVvZiByb290LnNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5zZXRJbW1lZGlhdGUgPSByb290LnNldEltbWVkaWF0ZS5iaW5kKHJvb3QpO1xuICAgICAgdGhpcy5jbGVhckltbWVkaWF0ZSA9IHJvb3QuY2xlYXJJbW1lZGlhdGUuYmluZChyb290KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uZXh0SGFuZGxlID0gMTtcbiAgICAgIHRoaXMudGFza3NCeUhhbmRsZSA9IHt9O1xuICAgICAgdGhpcy5jdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcblxuICAgICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgICAgaWYgKHRoaXMuY2FuVXNlUHJvY2Vzc05leHRUaWNrKCkpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICB0aGlzLnNldEltbWVkaWF0ZSA9IHRoaXMuY3JlYXRlUHJvY2Vzc05leHRUaWNrU2V0SW1tZWRpYXRlKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIHRoaXMuc2V0SW1tZWRpYXRlID0gdGhpcy5jcmVhdGVQb3N0TWVzc2FnZVNldEltbWVkaWF0ZSgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNhblVzZU1lc3NhZ2VDaGFubmVsKCkpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgdGhpcy5zZXRJbW1lZGlhdGUgPSB0aGlzLmNyZWF0ZU1lc3NhZ2VDaGFubmVsU2V0SW1tZWRpYXRlKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2FuVXNlUmVhZHlTdGF0ZUNoYW5nZSgpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICB0aGlzLnNldEltbWVkaWF0ZSA9IHRoaXMuY3JlYXRlUmVhZHlTdGF0ZUNoYW5nZVNldEltbWVkaWF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIHRoaXMuc2V0SW1tZWRpYXRlID0gdGhpcy5jcmVhdGVTZXRUaW1lb3V0U2V0SW1tZWRpYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBjaSA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZTogYW55KSB7XG4gICAgICAgIGRlbGV0ZSAoPGFueT5jbGVhckltbWVkaWF0ZSkuaW5zdGFuY2UudGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgfTtcblxuICAgICAgKDxhbnk+Y2kpLmluc3RhbmNlID0gdGhpcztcblxuICAgICAgdGhpcy5jbGVhckltbWVkaWF0ZSA9IGNpO1xuICAgIH1cbiAgfVxuXG4gIGNhblVzZVByb2Nlc3NOZXh0VGljaygpIHtcbiAgICByZXR1cm4gdGhpcy5pZGVudGlmeSh0aGlzLnJvb3QucHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcbiAgfVxuXG4gIGNhblVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMucm9vdC5NZXNzYWdlQ2hhbm5lbCk7XG4gIH1cblxuICBjYW5Vc2VSZWFkeVN0YXRlQ2hhbmdlKCkge1xuICAgIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5yb290LmRvY3VtZW50O1xuICAgIHJldHVybiBCb29sZWFuKGRvY3VtZW50ICYmICdvbnJlYWR5c3RhdGVjaGFuZ2UnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKTtcbiAgfVxuXG4gIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLnJvb3Q7XG4gICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgIC8vIHdoZXJlIGByb290LnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICBpZiAocm9vdC5wb3N0TWVzc2FnZSAmJiAhcm9vdC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICBsZXQgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICBsZXQgb2xkT25NZXNzYWdlID0gcm9vdC5vbm1lc3NhZ2U7XG4gICAgICByb290Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICB9O1xuICAgICAgcm9vdC5wb3N0TWVzc2FnZSgnJywgJyonKTtcbiAgICAgIHJvb3Qub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGhpcyBmdW5jdGlvbiBhY2NlcHRzIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBzZXRJbW1lZGlhdGUsIGJ1dFxuICAvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCByZXF1aXJlcyBubyBhcmd1bWVudHMuXG4gIHBhcnRpYWxseUFwcGxpZWQoaGFuZGxlcjogYW55LCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGxldCBmbiA9IGZ1bmN0aW9uIHJlc3VsdCAoKSB7XG4gICAgICBjb25zdCB7IGhhbmRsZXIsIGFyZ3MgfSA9IDxhbnk+cmVzdWx0O1xuICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChuZXcgRnVuY3Rpb24oJycgKyBoYW5kbGVyKSkoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgKDxhbnk+Zm4pLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICg8YW55PmZuKS5hcmdzID0gYXJncztcblxuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIGFkZEZyb21TZXRJbW1lZGlhdGVBcmd1bWVudHMoYXJnczogYW55W10pIHtcbiAgICB0aGlzLnRhc2tzQnlIYW5kbGVbdGhpcy5uZXh0SGFuZGxlXSA9IHRoaXMucGFydGlhbGx5QXBwbGllZC5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIHJldHVybiB0aGlzLm5leHRIYW5kbGUrKztcbiAgfVxuXG4gIGNyZWF0ZVByb2Nlc3NOZXh0VGlja1NldEltbWVkaWF0ZSgpIHtcbiAgICBsZXQgZm4gPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoKSB7XG4gICAgICBjb25zdCB7IGluc3RhbmNlIH0gPSAoPGFueT5zZXRJbW1lZGlhdGUpO1xuICAgICAgbGV0IGhhbmRsZSA9IGluc3RhbmNlLmFkZEZyb21TZXRJbW1lZGlhdGVBcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgICAgIGluc3RhbmNlLnJvb3QucHJvY2Vzcy5uZXh0VGljayhpbnN0YW5jZS5wYXJ0aWFsbHlBcHBsaWVkKGluc3RhbmNlLnJ1bklmUHJlc2VudCwgaGFuZGxlKSk7XG4gICAgICByZXR1cm4gaGFuZGxlO1xuICAgIH07XG5cbiAgICAoPGFueT5mbikuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgY3JlYXRlUG9zdE1lc3NhZ2VTZXRJbW1lZGlhdGUoKSB7XG4gICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLnJvb3Q7XG5cbiAgICBsZXQgbWVzc2FnZVByZWZpeCA9ICdzZXRJbW1lZGlhdGUkJyArIHJvb3QuTWF0aC5yYW5kb20oKSArICckJztcbiAgICBsZXQgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24gZ2xvYmFsTWVzc2FnZUhhbmRsZXIoZXZlbnQ6IGFueSkge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSAoPGFueT5nbG9iYWxNZXNzYWdlSGFuZGxlcikuaW5zdGFuY2U7XG4gICAgICBpZiAoZXZlbnQuc291cmNlID09PSByb290ICYmXG4gICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgaW5zdGFuY2UucnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICAoPGFueT5vbkdsb2JhbE1lc3NhZ2UpLmluc3RhbmNlID0gdGhpcztcblxuICAgIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuXG4gICAgbGV0IGZuID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKCkge1xuICAgICAgY29uc3QgeyBtZXNzYWdlUHJlZml4LCBpbnN0YW5jZSB9ID0gKDxhbnk+c2V0SW1tZWRpYXRlKTtcbiAgICAgIGxldCBoYW5kbGUgPSBpbnN0YW5jZS5hZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgICBpbnN0YW5jZS5yb290LnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsICcqJyk7XG4gICAgICByZXR1cm4gaGFuZGxlO1xuICAgIH07XG5cbiAgICAoPGFueT5mbikuaW5zdGFuY2UgPSB0aGlzO1xuICAgICg8YW55PmZuKS5tZXNzYWdlUHJlZml4ID0gbWVzc2FnZVByZWZpeDtcblxuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHJ1bklmUHJlc2VudChoYW5kbGU6IGFueSkge1xuICAgIC8vIEZyb20gdGhlIHNwZWM6ICdXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC4nXG4gICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICBpZiAodGhpcy5jdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAvLyAndG9vIG11Y2ggcmVjdXJzaW9uJyBlcnJvci5cbiAgICAgIHRoaXMucm9vdC5zZXRUaW1lb3V0KHRoaXMucGFydGlhbGx5QXBwbGllZCh0aGlzLnJ1bklmUHJlc2VudCwgaGFuZGxlKSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0YXNrID0gdGhpcy50YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICBpZiAodGFzaykge1xuICAgICAgICB0aGlzLmN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGFzaygpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRoaXMuY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTWVzc2FnZUNoYW5uZWxTZXRJbW1lZGlhdGUoKSB7XG4gICAgbGV0IGNoYW5uZWwgPSBuZXcgdGhpcy5yb290Lk1lc3NhZ2VDaGFubmVsKCk7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgbGV0IGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICB0aGlzLnJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgIH07XG5cbiAgICBsZXQgZm4gPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoKSB7XG4gICAgICBjb25zdCB7IGNoYW5uZWwsIGluc3RhbmNlIH0gPSAoPGFueT5zZXRJbW1lZGlhdGUpO1xuICAgICAgbGV0IGhhbmRsZSA9IGluc3RhbmNlLmFkZEZyb21TZXRJbW1lZGlhdGVBcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgIHJldHVybiBoYW5kbGU7XG4gICAgfTtcblxuICAgICg8YW55PmZuKS5jaGFubmVsID0gY2hhbm5lbDtcbiAgICAoPGFueT5mbikuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgY3JlYXRlUmVhZHlTdGF0ZUNoYW5nZVNldEltbWVkaWF0ZSgpIHtcbiAgICBsZXQgZm4gPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9ICg8YW55PnNldEltbWVkaWF0ZSkuaW5zdGFuY2U7XG4gICAgICBjb25zdCByb290ID0gaW5zdGFuY2Uucm9vdDtcbiAgICAgIGNvbnN0IGRvYyA9IHJvb3QuZG9jdW1lbnQ7XG4gICAgICBjb25zdCBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgbGV0IGhhbmRsZSA9IGluc3RhbmNlLmFkZEZyb21TZXRJbW1lZGlhdGVBcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgIGxldCBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBpbnN0YW5jZS5ydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgIH07XG4gICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICByZXR1cm4gaGFuZGxlO1xuICAgIH07XG5cbiAgICAoPGFueT5mbikuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgY3JlYXRlU2V0VGltZW91dFNldEltbWVkaWF0ZSgpIHtcbiAgICBsZXQgZm4gPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9ICg8YW55PnNldEltbWVkaWF0ZSkuaW5zdGFuY2U7XG4gICAgICBsZXQgaGFuZGxlID0gaW5zdGFuY2UuYWRkRnJvbVNldEltbWVkaWF0ZUFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgICAgaW5zdGFuY2Uucm9vdC5zZXRUaW1lb3V0KGluc3RhbmNlLnBhcnRpYWxseUFwcGxpZWQoaW5zdGFuY2UucnVuSWZQcmVzZW50LCBoYW5kbGUpLCAwKTtcbiAgICAgIHJldHVybiBoYW5kbGU7XG4gICAgfTtcblxuICAgICg8YW55PmZuKS5pbnN0YW5jZSA9IHRoaXM7XG5cbiAgICByZXR1cm4gZm47XG4gIH1cbn1cbmV4cG9ydCBjb25zdCBJbW1lZGlhdGUgPSBuZXcgSW1tZWRpYXRlRGVmaW5pdGlvbihyb290KTtcbiJdfQ==