"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = require("./util/isArray");
var isObject_1 = require("./util/isObject");
var isFunction_1 = require("./util/isFunction");
var tryCatch_1 = require("./util/tryCatch");
var errorObject_1 = require("./util/errorObject");
var UnsubscriptionError_1 = require("./util/UnsubscriptionError");
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    return Subscription;
}());
Subscription.EMPTY = (function (empty) {
    empty.closed = true;
    return empty;
}(new Subscription()));
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vic2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3Vic2NyaXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXlDO0FBQ3pDLDRDQUEyQztBQUMzQyxnREFBK0M7QUFDL0MsNENBQTJDO0FBQzNDLGtEQUFpRDtBQUNqRCxrRUFBaUU7QUFhakU7Ozs7Ozs7Ozs7O0dBV0c7QUFDSDtJQWdCRTs7O09BR0c7SUFDSCxzQkFBWSxXQUF3QjtRQWRwQzs7O1dBR0c7UUFDSSxXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXJCLFlBQU8sR0FBaUIsSUFBSSxDQUFDO1FBQzdCLGFBQVEsR0FBbUIsSUFBSSxDQUFDO1FBQ2xDLG1CQUFjLEdBQW9CLElBQUksQ0FBQztRQU83QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtDQUFXLEdBQVg7UUFDRSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxNQUFhLENBQUM7UUFFbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVHLElBQUEsU0FBa0UsRUFBaEUsb0JBQU8sRUFBRSxzQkFBUSxFQUFFLDhCQUFZLEVBQUUsa0NBQWMsQ0FBa0I7UUFFdkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsd0VBQXdFO1FBQ3hFLHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUUzQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUks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QVMsS0FBVTtJQUN0RCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBSlosb0NBQVk7QUE2THpCLHFDQUFxQyxNQUFhO0lBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSyxPQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFlBQVkseUNBQW1CLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFwRSxDQUFvRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9HLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuL3V0aWwvaXNPYmplY3QnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi91dGlsL3RyeUNhdGNoJztcbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7IFVuc3Vic2NyaXB0aW9uRXJyb3IgfSBmcm9tICcuL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5vbnltb3VzU3Vic2NyaXB0aW9uIHtcbiAgdW5zdWJzY3JpYmUoKTogdm9pZDtcbn1cblxuZXhwb3J0IHR5cGUgVGVhcmRvd25Mb2dpYyA9IEFub255bW91c1N1YnNjcmlwdGlvbiB8IEZ1bmN0aW9uIHwgdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBJU3Vic2NyaXB0aW9uIGV4dGVuZHMgQW5vbnltb3VzU3Vic2NyaXB0aW9uIHtcbiAgdW5zdWJzY3JpYmUoKTogdm9pZDtcbiAgcmVhZG9ubHkgY2xvc2VkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkaXNwb3NhYmxlIHJlc291cmNlLCBzdWNoIGFzIHRoZSBleGVjdXRpb24gb2YgYW4gT2JzZXJ2YWJsZS4gQVxuICogU3Vic2NyaXB0aW9uIGhhcyBvbmUgaW1wb3J0YW50IG1ldGhvZCwgYHVuc3Vic2NyaWJlYCwgdGhhdCB0YWtlcyBubyBhcmd1bWVudFxuICogYW5kIGp1c3QgZGlzcG9zZXMgdGhlIHJlc291cmNlIGhlbGQgYnkgdGhlIHN1YnNjcmlwdGlvbi5cbiAqXG4gKiBBZGRpdGlvbmFsbHksIHN1YnNjcmlwdGlvbnMgbWF5IGJlIGdyb3VwZWQgdG9nZXRoZXIgdGhyb3VnaCB0aGUgYGFkZCgpYFxuICogbWV0aG9kLCB3aGljaCB3aWxsIGF0dGFjaCBhIGNoaWxkIFN1YnNjcmlwdGlvbiB0byB0aGUgY3VycmVudCBTdWJzY3JpcHRpb24uXG4gKiBXaGVuIGEgU3Vic2NyaXB0aW9uIGlzIHVuc3Vic2NyaWJlZCwgYWxsIGl0cyBjaGlsZHJlbiAoYW5kIGl0cyBncmFuZGNoaWxkcmVuKVxuICogd2lsbCBiZSB1bnN1YnNjcmliZWQgYXMgd2VsbC5cbiAqXG4gKiBAY2xhc3MgU3Vic2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb24gaW1wbGVtZW50cyBJU3Vic2NyaXB0aW9uIHtcbiAgcHVibGljIHN0YXRpYyBFTVBUWTogU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uKGVtcHR5OiBhbnkpe1xuICAgIGVtcHR5LmNsb3NlZCA9IHRydWU7XG4gICAgcmV0dXJuIGVtcHR5O1xuICB9KG5ldyBTdWJzY3JpcHRpb24oKSkpO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdG8gaW5kaWNhdGUgd2hldGhlciB0aGlzIFN1YnNjcmlwdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHVuc3Vic2NyaWJlZC5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBwdWJsaWMgY2xvc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIF9wYXJlbnQ6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIHByb3RlY3RlZCBfcGFyZW50czogU3Vic2NyaXB0aW9uW10gPSBudWxsO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBJU3Vic2NyaXB0aW9uW10gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFt1bnN1YnNjcmliZV0gQSBmdW5jdGlvbiBkZXNjcmliaW5nIGhvdyB0b1xuICAgKiBwZXJmb3JtIHRoZSBkaXNwb3NhbCBvZiByZXNvdXJjZXMgd2hlbiB0aGUgYHVuc3Vic2NyaWJlYCBtZXRob2QgaXMgY2FsbGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IodW5zdWJzY3JpYmU/OiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKHVuc3Vic2NyaWJlKSB7XG4gICAgICAoPGFueT4gdGhpcykuX3Vuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2VzIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLiBNYXksIGZvciBpbnN0YW5jZSwgY2FuY2VsXG4gICAqIGFuIG9uZ29pbmcgT2JzZXJ2YWJsZSBleGVjdXRpb24gb3IgY2FuY2VsIGFueSBvdGhlciB0eXBlIG9mIHdvcmsgdGhhdFxuICAgKiBzdGFydGVkIHdoZW4gdGhlIFN1YnNjcmlwdGlvbiB3YXMgY3JlYXRlZC5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHVuc3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIGxldCBoYXNFcnJvcnMgPSBmYWxzZTtcbiAgICBsZXQgZXJyb3JzOiBhbnlbXTtcblxuICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB7IF9wYXJlbnQsIF9wYXJlbnRzLCBfdW5zdWJzY3JpYmUsIF9zdWJzY3JpcHRpb25zIH0gPSAoPGFueT4gdGhpcyk7XG5cbiAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLl9wYXJlbnRzID0gbnVsbDtcbiAgICAvLyBudWxsIG91dCBfc3Vic2NyaXB0aW9ucyBmaXJzdCBzbyBhbnkgY2hpbGQgc3Vic2NyaXB0aW9ucyB0aGF0IGF0dGVtcHRcbiAgICAvLyB0byByZW1vdmUgdGhlbXNlbHZlcyBmcm9tIHRoaXMgc3Vic2NyaXB0aW9uIHdpbGwgbm9vcFxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuXG4gICAgbGV0IGluZGV4ID0gLTE7XG4gICAgbGV0IGxlbiA9IF9wYXJlbnRzID8gX3BhcmVudHMubGVuZ3RoIDogMDtcblxuICAgIC8vIGlmIHRoaXMuX3BhcmVudCBpcyBudWxsLCB0aGVuIHNvIGlzIHRoaXMuX3BhcmVudHMsIGFuZCB3ZVxuICAgIC8vIGRvbid0IGhhdmUgdG8gcmVtb3ZlIG91cnNlbHZlcyBmcm9tIGFueSBwYXJlbnQgc3Vic2NyaXB0aW9ucy5cbiAgICB3aGlsZSAoX3BhcmVudCkge1xuICAgICAgX3BhcmVudC5yZW1vdmUodGhpcyk7XG4gICAgICAvLyBpZiB0aGlzLl9wYXJlbnRzIGlzIG51bGwgb3IgaW5kZXggPj0gbGVuLFxuICAgICAgLy8gdGhlbiBfcGFyZW50IGlzIHNldCB0byBudWxsLCBhbmQgdGhlIGxvb3AgZXhpdHNcbiAgICAgIF9wYXJlbnQgPSArK2luZGV4IDwgbGVuICYmIF9wYXJlbnRzW2luZGV4XSB8fCBudWxsO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKF91bnN1YnNjcmliZSkpIHtcbiAgICAgIGxldCB0cmlhbCA9IHRyeUNhdGNoKF91bnN1YnNjcmliZSkuY2FsbCh0aGlzKTtcbiAgICAgIGlmICh0cmlhbCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IChcbiAgICAgICAgICBlcnJvck9iamVjdC5lIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvciA/XG4gICAgICAgICAgICBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyb3JPYmplY3QuZS5lcnJvcnMpIDogW2Vycm9yT2JqZWN0LmVdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkoX3N1YnNjcmlwdGlvbnMpKSB7XG5cbiAgICAgIGluZGV4ID0gLTE7XG4gICAgICBsZW4gPSBfc3Vic2NyaXB0aW9ucy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuKSB7XG4gICAgICAgIGNvbnN0IHN1YiA9IF9zdWJzY3JpcHRpb25zW2luZGV4XTtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHN1YikpIHtcbiAgICAgICAgICBsZXQgdHJpYWwgPSB0cnlDYXRjaChzdWIudW5zdWJzY3JpYmUpLmNhbGwoc3ViKTtcbiAgICAgICAgICBpZiAodHJpYWwgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IFtdO1xuICAgICAgICAgICAgbGV0IGVyciA9IGVycm9yT2JqZWN0LmU7XG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnIuZXJyb3JzKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNFcnJvcnMpIHtcbiAgICAgIHRocm93IG5ldyBVbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0ZWFyIGRvd24gdG8gYmUgY2FsbGVkIGR1cmluZyB0aGUgdW5zdWJzY3JpYmUoKSBvZiB0aGlzXG4gICAqIFN1YnNjcmlwdGlvbi5cbiAgICpcbiAgICogSWYgdGhlIHRlYXIgZG93biBiZWluZyBhZGRlZCBpcyBhIHN1YnNjcmlwdGlvbiB0aGF0IGlzIGFscmVhZHlcbiAgICogdW5zdWJzY3JpYmVkLCBpcyB0aGUgc2FtZSByZWZlcmVuY2UgYGFkZGAgaXMgYmVpbmcgY2FsbGVkIG9uLCBvciBpc1xuICAgKiBgU3Vic2NyaXB0aW9uLkVNUFRZYCwgaXQgd2lsbCBub3QgYmUgYWRkZWQuXG4gICAqXG4gICAqIElmIHRoaXMgc3Vic2NyaXB0aW9uIGlzIGFscmVhZHkgaW4gYW4gYGNsb3NlZGAgc3RhdGUsIHRoZSBwYXNzZWRcbiAgICogdGVhciBkb3duIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgaW1tZWRpYXRlbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7VGVhcmRvd25Mb2dpY30gdGVhcmRvd24gVGhlIGFkZGl0aW9uYWwgbG9naWMgdG8gZXhlY3V0ZSBvblxuICAgKiB0ZWFyZG93bi5cbiAgICogQHJldHVybiB7U3Vic2NyaXB0aW9ufSBSZXR1cm5zIHRoZSBTdWJzY3JpcHRpb24gdXNlZCBvciBjcmVhdGVkIHRvIGJlXG4gICAqIGFkZGVkIHRvIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zIGxpc3QuIFRoaXMgU3Vic2NyaXB0aW9uIGNhbiBiZSB1c2VkIHdpdGhcbiAgICogYHJlbW92ZSgpYCB0byByZW1vdmUgdGhlIHBhc3NlZCB0ZWFyZG93biBsb2dpYyBmcm9tIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zXG4gICAqIGxpc3QuXG4gICAqL1xuICBhZGQodGVhcmRvd246IFRlYXJkb3duTG9naWMpOiBTdWJzY3JpcHRpb24ge1xuICAgIGlmICghdGVhcmRvd24gfHwgKHRlYXJkb3duID09PSBTdWJzY3JpcHRpb24uRU1QVFkpKSB7XG4gICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cblxuICAgIGlmICh0ZWFyZG93biA9PT0gdGhpcykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGV0IHN1YnNjcmlwdGlvbiA9ICg8U3Vic2NyaXB0aW9uPiB0ZWFyZG93bik7XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiB0ZWFyZG93bikge1xuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKDwoKCkgPT4gdm9pZCkgPiB0ZWFyZG93bik7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uLmNsb3NlZCB8fCB0eXBlb2Ygc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN1YnNjcmlwdGlvbi5fYWRkUGFyZW50ICE9PSAnZnVuY3Rpb24nIC8qIHF1YWNrIHF1YWNrICovKSB7XG4gICAgICAgICAgY29uc3QgdG1wID0gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICBzdWJzY3JpcHRpb24uX3N1YnNjcmlwdGlvbnMgPSBbdG1wXTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHRlYXJkb3duICcgKyB0ZWFyZG93biArICcgYWRkZWQgdG8gU3Vic2NyaXB0aW9uLicpO1xuICAgIH1cblxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zIHx8ICh0aGlzLl9zdWJzY3JpcHRpb25zID0gW10pO1xuXG4gICAgc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgc3Vic2NyaXB0aW9uLl9hZGRQYXJlbnQodGhpcyk7XG5cbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBTdWJzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWwgbGlzdCBvZiBzdWJzY3JpcHRpb25zIHRoYXQgd2lsbFxuICAgKiB1bnN1YnNjcmliZSBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlIHByb2Nlc3Mgb2YgdGhpcyBTdWJzY3JpcHRpb24uXG4gICAqIEBwYXJhbSB7U3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb24gVGhlIHN1YnNjcmlwdGlvbiB0byByZW1vdmUuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICByZW1vdmUoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucztcbiAgICBpZiAoc3Vic2NyaXB0aW9ucykge1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uSW5kZXggPSBzdWJzY3JpcHRpb25zLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICAgIGlmIChzdWJzY3JpcHRpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9ucy5zcGxpY2Uoc3Vic2NyaXB0aW9uSW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZFBhcmVudChwYXJlbnQ6IFN1YnNjcmlwdGlvbikge1xuICAgIGxldCB7IF9wYXJlbnQsIF9wYXJlbnRzIH0gPSB0aGlzO1xuICAgIGlmICghX3BhcmVudCB8fCBfcGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBwYXJlbnQsIG9yIHRoZSBuZXcgcGFyZW50IGlzIHRoZSBzYW1lIGFzIHRoZVxuICAgICAgLy8gY3VycmVudCBwYXJlbnQsIHRoZW4gc2V0IHRoaXMuX3BhcmVudCB0byB0aGUgbmV3IHBhcmVudC5cbiAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB9IGVsc2UgaWYgKCFfcGFyZW50cykge1xuICAgICAgLy8gSWYgdGhlcmUncyBhbHJlYWR5IG9uZSBwYXJlbnQsIGJ1dCBub3QgbXVsdGlwbGUsIGFsbG9jYXRlIGFuIEFycmF5IHRvXG4gICAgICAvLyBzdG9yZSB0aGUgcmVzdCBvZiB0aGUgcGFyZW50IFN1YnNjcmlwdGlvbnMuXG4gICAgICB0aGlzLl9wYXJlbnRzID0gW3BhcmVudF07XG4gICAgfSBlbHNlIGlmIChfcGFyZW50cy5pbmRleE9mKHBhcmVudCkgPT09IC0xKSB7XG4gICAgICAvLyBPbmx5IGFkZCB0aGUgbmV3IHBhcmVudCB0byB0aGUgX3BhcmVudHMgbGlzdCBpZiBpdCdzIG5vdCBhbHJlYWR5IHRoZXJlLlxuICAgICAgX3BhcmVudHMucHVzaChwYXJlbnQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyb3JzOiBhbnlbXSkge1xuIHJldHVybiBlcnJvcnMucmVkdWNlKChlcnJzLCBlcnIpID0+IGVycnMuY29uY2F0KChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yKSA/IGVyci5lcnJvcnMgOiBlcnIpLCBbXSk7XG59XG4iXX0=