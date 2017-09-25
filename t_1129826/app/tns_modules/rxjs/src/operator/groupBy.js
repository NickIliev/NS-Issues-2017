"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = require("../Subscriber");
var Subscription_1 = require("../Subscription");
var Observable_1 = require("../Observable");
var Subject_1 = require("../Subject");
var Map_1 = require("../util/Map");
var FastMap_1 = require("../util/FastMap");
/* tslint:enable:max-line-length */
/**
 * Groups the items emitted by an Observable according to a specified criterion,
 * and emits these grouped items as `GroupedObservables`, one
 * {@link GroupedObservable} per group.
 *
 * <img src="./img/groupBy.png" width="100%">
 *
 * @example <caption>Group objects by id and return as array</caption>
 * Observable.of<Obj>({id: 1, name: 'aze1'},
 *                    {id: 2, name: 'sf2'},
 *                    {id: 2, name: 'dg2'},
 *                    {id: 1, name: 'erg1'},
 *                    {id: 1, name: 'df1'},
 *                    {id: 2, name: 'sfqfb2'},
 *                    {id: 3, name: 'qfs3'},
 *                    {id: 2, name: 'qsgqsfg2'}
 *     )
 *     .groupBy(p => p.id)
 *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], []))
 *     .subscribe(p => console.log(p));
 *
 * // displays:
 * // [ { id: 1, name: 'aze1' },
 * //   { id: 1, name: 'erg1' },
 * //   { id: 1, name: 'df1' } ]
 * //
 * // [ { id: 2, name: 'sf2' },
 * //   { id: 2, name: 'dg2' },
 * //   { id: 2, name: 'sfqfb2' },
 * //   { id: 2, name: 'qsgqsfg2' } ]
 * //
 * // [ { id: 3, name: 'qfs3' } ]
 *
 * @example <caption>Pivot data on the id field</caption>
 * Observable.of<Obj>({id: 1, name: 'aze1'},
 *                    {id: 2, name: 'sf2'},
 *                    {id: 2, name: 'dg2'},
 *                    {id: 1, name: 'erg1'},
 *                    {id: 1, name: 'df1'},
 *                    {id: 2, name: 'sfqfb2'},
 *                    {id: 3, name: 'qfs1'},
 *                    {id: 2, name: 'qsgqsfg2'}
 *                   )
 *     .groupBy(p => p.id, p => p.name)
 *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], ["" + group$.key]))
 *     .map(arr => ({'id': parseInt(arr[0]), 'values': arr.slice(1)}))
 *     .subscribe(p => console.log(p));
 *
 * // displays:
 * // { id: 1, values: [ 'aze1', 'erg1', 'df1' ] }
 * // { id: 2, values: [ 'sf2', 'dg2', 'sfqfb2', 'qsgqsfg2' ] }
 * // { id: 3, values: [ 'qfs1' ] }
 *
 * @param {function(value: T): K} keySelector A function that extracts the key
 * for each item.
 * @param {function(value: T): R} [elementSelector] A function that extracts the
 * return element for each item.
 * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
 * A function that returns an Observable to determine how long each group should
 * exist.
 * @return {Observable<GroupedObservable<K,R>>} An Observable that emits
 * GroupedObservables, each of which corresponds to a unique key value and each
 * of which emits those items from the source Observable that share that key
 * value.
 * @method groupBy
 * @owner Observable
 */
function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return this.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
}
exports.groupBy = groupBy;
var GroupByOperator = (function () {
    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
    }
    GroupByOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
    };
    return GroupByOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var GroupBySubscriber = (function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
    }
    GroupBySubscriber.prototype._next = function (value) {
        var key;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;
        if (!groups) {
            groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            }
            catch (err) {
                this.error(err);
            }
        }
        else {
            element = value;
        }
        if (!group) {
            group = this.subjectSelector ? this.subjectSelector() : new Subject_1.Subject();
            groups.set(key, group);
            var groupedObservable = new GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                var duration = void 0;
                try {
                    duration = this.durationSelector(new GroupedObservable(key, group));
                }
                catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
            }
        }
    };
    return GroupBySubscriber;
}(Subscriber_1.Subscriber));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var GroupDurationSubscriber = (function (_super) {
    __extends(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        var _this = _super.call(this, group) || this;
        _this.key = key;
        _this.group = group;
        _this.parent = parent;
        return _this;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this.complete();
    };
    GroupDurationSubscriber.prototype._unsubscribe = function () {
        var _a = this, parent = _a.parent, key = _a.key;
        this.key = this.parent = null;
        if (parent) {
            parent.removeGroup(key);
        }
    };
    return GroupDurationSubscriber;
}(Subscriber_1.Subscriber));
/**
 * An Observable representing values belonging to the same group represented by
 * a common key. The values emitted by a GroupedObservable come from the source
 * Observable. The common key is available as the field `key` on a
 * GroupedObservable instance.
 *
 * @class GroupedObservable<K, T>
 */
var GroupedObservable = (function (_super) {
    __extends(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.groupSubject = groupSubject;
        _this.refCountSubscription = refCountSubscription;
        return _this;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new Subscription_1.Subscription();
        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
}(Observable_1.Observable));
exports.GroupedObservable = GroupedObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerRefCountSubscription = (function (_super) {
    __extends(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        parent.count++;
        return _this;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
}(Subscription_1.Subscription));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBCeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdyb3VwQnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBMkM7QUFDM0MsZ0RBQStDO0FBQy9DLDRDQUEyQztBQUUzQyxzQ0FBcUM7QUFDckMsbUNBQWtDO0FBQ2xDLDJDQUEwQztBQU8xQyxtQ0FBbUM7QUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtFRztBQUNILGlCQUFzRCxXQUE0QixFQUNqRCxlQUEwQyxFQUMxQyxnQkFBd0UsRUFDeEUsZUFBa0M7SUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3pHLENBQUM7QUFMRCwwQkFLQztBQVNEO0lBQ0UseUJBQW9CLFdBQTRCLEVBQzVCLGVBQTBDLEVBQzFDLGdCQUF3RSxFQUN4RSxlQUFrQztRQUhsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsb0JBQWUsR0FBZixlQUFlLENBQTJCO1FBQzFDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBd0Q7UUFDeEUsb0JBQWUsR0FBZixlQUFlLENBQW1CO0lBQ3RELENBQUM7SUFFRCw4QkFBSSxHQUFKLFVBQUssVUFBK0MsRUFBRSxNQUFXO1FBQy9ELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksaUJBQWlCLENBQzNDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQ2hHLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXlDLHFDQUFhO0lB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QyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDSCxnQ0FBQztBQUFELENBQUMsQUFoQkQsQ0FBd0MsMkJBQVksR0FnQm5EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnLi4vdXRpbC9NYXAnO1xuaW1wb3J0IHsgRmFzdE1hcCB9IGZyb20gJy4uL3V0aWwvRmFzdE1hcCc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VCwgSz4odGhpczogT2JzZXJ2YWJsZTxUPiwga2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSyk6IE9ic2VydmFibGU8R3JvdXBlZE9ic2VydmFibGU8SywgVD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VCwgSz4odGhpczogT2JzZXJ2YWJsZTxUPiwga2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSywgZWxlbWVudFNlbGVjdG9yOiB2b2lkLCBkdXJhdGlvblNlbGVjdG9yOiAoZ3JvdXBlZDogR3JvdXBlZE9ic2VydmFibGU8SywgVD4pID0+IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8R3JvdXBlZE9ic2VydmFibGU8SywgVD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VCwgSywgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwga2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSywgZWxlbWVudFNlbGVjdG9yPzogKHZhbHVlOiBUKSA9PiBSLCBkdXJhdGlvblNlbGVjdG9yPzogKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+KSA9PiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+PjtcbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5PFQsIEssIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIGtleVNlbGVjdG9yOiAodmFsdWU6IFQpID0+IEssIGVsZW1lbnRTZWxlY3Rvcj86ICh2YWx1ZTogVCkgPT4gUiwgZHVyYXRpb25TZWxlY3Rvcj86IChncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPikgPT4gT2JzZXJ2YWJsZTxhbnk+LCBzdWJqZWN0U2VsZWN0b3I/OiAoKSA9PiBTdWJqZWN0PFI+KTogT2JzZXJ2YWJsZTxHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIEdyb3VwcyB0aGUgaXRlbXMgZW1pdHRlZCBieSBhbiBPYnNlcnZhYmxlIGFjY29yZGluZyB0byBhIHNwZWNpZmllZCBjcml0ZXJpb24sXG4gKiBhbmQgZW1pdHMgdGhlc2UgZ3JvdXBlZCBpdGVtcyBhcyBgR3JvdXBlZE9ic2VydmFibGVzYCwgb25lXG4gKiB7QGxpbmsgR3JvdXBlZE9ic2VydmFibGV9IHBlciBncm91cC5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2dyb3VwQnkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+R3JvdXAgb2JqZWN0cyBieSBpZCBhbmQgcmV0dXJuIGFzIGFycmF5PC9jYXB0aW9uPlxuICogT2JzZXJ2YWJsZS5vZjxPYmo+KHtpZDogMSwgbmFtZTogJ2F6ZTEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDIsIG5hbWU6ICdzZjInfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDIsIG5hbWU6ICdkZzInfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDEsIG5hbWU6ICdlcmcxJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAxLCBuYW1lOiAnZGYxJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAyLCBuYW1lOiAnc2ZxZmIyJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAzLCBuYW1lOiAncWZzMyd9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ3FzZ3FzZmcyJ31cbiAqICAgICApXG4gKiAgICAgLmdyb3VwQnkocCA9PiBwLmlkKVxuICogICAgIC5mbGF0TWFwKCAoZ3JvdXAkKSA9PiBncm91cCQucmVkdWNlKChhY2MsIGN1cikgPT4gWy4uLmFjYywgY3VyXSwgW10pKVxuICogICAgIC5zdWJzY3JpYmUocCA9PiBjb25zb2xlLmxvZyhwKSk7XG4gKlxuICogLy8gZGlzcGxheXM6XG4gKiAvLyBbIHsgaWQ6IDEsIG5hbWU6ICdhemUxJyB9LFxuICogLy8gICB7IGlkOiAxLCBuYW1lOiAnZXJnMScgfSxcbiAqIC8vICAgeyBpZDogMSwgbmFtZTogJ2RmMScgfSBdXG4gKiAvL1xuICogLy8gWyB7IGlkOiAyLCBuYW1lOiAnc2YyJyB9LFxuICogLy8gICB7IGlkOiAyLCBuYW1lOiAnZGcyJyB9LFxuICogLy8gICB7IGlkOiAyLCBuYW1lOiAnc2ZxZmIyJyB9LFxuICogLy8gICB7IGlkOiAyLCBuYW1lOiAncXNncXNmZzInIH0gXVxuICogLy9cbiAqIC8vIFsgeyBpZDogMywgbmFtZTogJ3FmczMnIH0gXVxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlBpdm90IGRhdGEgb24gdGhlIGlkIGZpZWxkPC9jYXB0aW9uPlxuICogT2JzZXJ2YWJsZS5vZjxPYmo+KHtpZDogMSwgbmFtZTogJ2F6ZTEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDIsIG5hbWU6ICdzZjInfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDIsIG5hbWU6ICdkZzInfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDEsIG5hbWU6ICdlcmcxJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAxLCBuYW1lOiAnZGYxJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAyLCBuYW1lOiAnc2ZxZmIyJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAzLCBuYW1lOiAncWZzMSd9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ3FzZ3FzZmcyJ31cbiAqICAgICAgICAgICAgICAgICAgIClcbiAqICAgICAuZ3JvdXBCeShwID0+IHAuaWQsIHAgPT4gcC5uYW1lKVxuICogICAgIC5mbGF0TWFwKCAoZ3JvdXAkKSA9PiBncm91cCQucmVkdWNlKChhY2MsIGN1cikgPT4gWy4uLmFjYywgY3VyXSwgW1wiXCIgKyBncm91cCQua2V5XSkpXG4gKiAgICAgLm1hcChhcnIgPT4gKHsnaWQnOiBwYXJzZUludChhcnJbMF0pLCAndmFsdWVzJzogYXJyLnNsaWNlKDEpfSkpXG4gKiAgICAgLnN1YnNjcmliZShwID0+IGNvbnNvbGUubG9nKHApKTtcbiAqXG4gKiAvLyBkaXNwbGF5czpcbiAqIC8vIHsgaWQ6IDEsIHZhbHVlczogWyAnYXplMScsICdlcmcxJywgJ2RmMScgXSB9XG4gKiAvLyB7IGlkOiAyLCB2YWx1ZXM6IFsgJ3NmMicsICdkZzInLCAnc2ZxZmIyJywgJ3FzZ3FzZmcyJyBdIH1cbiAqIC8vIHsgaWQ6IDMsIHZhbHVlczogWyAncWZzMScgXSB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCk6IEt9IGtleVNlbGVjdG9yIEEgZnVuY3Rpb24gdGhhdCBleHRyYWN0cyB0aGUga2V5XG4gKiBmb3IgZWFjaCBpdGVtLlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCk6IFJ9IFtlbGVtZW50U2VsZWN0b3JdIEEgZnVuY3Rpb24gdGhhdCBleHRyYWN0cyB0aGVcbiAqIHJldHVybiBlbGVtZW50IGZvciBlYWNoIGl0ZW0uXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssUj4pOiBPYnNlcnZhYmxlPGFueT59IFtkdXJhdGlvblNlbGVjdG9yXVxuICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0byBkZXRlcm1pbmUgaG93IGxvbmcgZWFjaCBncm91cCBzaG91bGRcbiAqIGV4aXN0LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxHcm91cGVkT2JzZXJ2YWJsZTxLLFI+Pn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzXG4gKiBHcm91cGVkT2JzZXJ2YWJsZXMsIGVhY2ggb2Ygd2hpY2ggY29ycmVzcG9uZHMgdG8gYSB1bmlxdWUga2V5IHZhbHVlIGFuZCBlYWNoXG4gKiBvZiB3aGljaCBlbWl0cyB0aG9zZSBpdGVtcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0IHNoYXJlIHRoYXQga2V5XG4gKiB2YWx1ZS5cbiAqIEBtZXRob2QgZ3JvdXBCeVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VCwgSywgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwga2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRTZWxlY3Rvcj86ICgodmFsdWU6IFQpID0+IFIpIHwgdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uU2VsZWN0b3I/OiAoZ3JvdXBlZDogR3JvdXBlZE9ic2VydmFibGU8SywgUj4pID0+IE9ic2VydmFibGU8YW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3RTZWxlY3Rvcj86ICgpID0+IFN1YmplY3Q8Uj4pOiBPYnNlcnZhYmxlPEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEdyb3VwQnlPcGVyYXRvcihrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBkdXJhdGlvblNlbGVjdG9yLCBzdWJqZWN0U2VsZWN0b3IpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWZDb3VudFN1YnNjcmlwdGlvbiB7XG4gIGNvdW50OiBudW1iZXI7XG4gIHVuc3Vic2NyaWJlOiAoKSA9PiB2b2lkO1xuICBjbG9zZWQ6IGJvb2xlYW47XG4gIGF0dGVtcHRlZFRvVW5zdWJzY3JpYmU6IGJvb2xlYW47XG59XG5cbmNsYXNzIEdyb3VwQnlPcGVyYXRvcjxULCBLLCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+PiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUga2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50U2VsZWN0b3I/OiAoKHZhbHVlOiBUKSA9PiBSKSB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgZHVyYXRpb25TZWxlY3Rvcj86IChncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPikgPT4gT2JzZXJ2YWJsZTxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHN1YmplY3RTZWxlY3Rvcj86ICgpID0+IFN1YmplY3Q8Uj4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgR3JvdXBCeVN1YnNjcmliZXIoXG4gICAgICBzdWJzY3JpYmVyLCB0aGlzLmtleVNlbGVjdG9yLCB0aGlzLmVsZW1lbnRTZWxlY3RvciwgdGhpcy5kdXJhdGlvblNlbGVjdG9yLCB0aGlzLnN1YmplY3RTZWxlY3RvclxuICAgICkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBHcm91cEJ5U3Vic2NyaWJlcjxULCBLLCBSPiBleHRlbmRzIFN1YnNjcmliZXI8VD4gaW1wbGVtZW50cyBSZWZDb3VudFN1YnNjcmlwdGlvbiB7XG4gIHByaXZhdGUgZ3JvdXBzOiBNYXA8SywgU3ViamVjdDxUfFI+PiA9IG51bGw7XG4gIHB1YmxpYyBhdHRlbXB0ZWRUb1Vuc3Vic2NyaWJlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBjb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPj4sXG4gICAgICAgICAgICAgIHByaXZhdGUga2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50U2VsZWN0b3I/OiAoKHZhbHVlOiBUKSA9PiBSKSB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgZHVyYXRpb25TZWxlY3Rvcj86IChncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPikgPT4gT2JzZXJ2YWJsZTxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHN1YmplY3RTZWxlY3Rvcj86ICgpID0+IFN1YmplY3Q8Uj4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBsZXQga2V5OiBLO1xuICAgIHRyeSB7XG4gICAgICBrZXkgPSB0aGlzLmtleVNlbGVjdG9yKHZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9ncm91cCh2YWx1ZSwga2V5KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dyb3VwKHZhbHVlOiBULCBrZXk6IEspIHtcbiAgICBsZXQgZ3JvdXBzID0gdGhpcy5ncm91cHM7XG5cbiAgICBpZiAoIWdyb3Vwcykge1xuICAgICAgZ3JvdXBzID0gdGhpcy5ncm91cHMgPSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyA/IG5ldyBGYXN0TWFwKCkgOiBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgbGV0IGdyb3VwID0gZ3JvdXBzLmdldChrZXkpO1xuXG4gICAgbGV0IGVsZW1lbnQ6IFI7XG4gICAgaWYgKHRoaXMuZWxlbWVudFNlbGVjdG9yKSB7XG4gICAgICB0cnkge1xuICAgICAgICBlbGVtZW50ID0gdGhpcy5lbGVtZW50U2VsZWN0b3IodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudCA9IDxhbnk+dmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKCFncm91cCkge1xuICAgICAgZ3JvdXAgPSB0aGlzLnN1YmplY3RTZWxlY3RvciA/IHRoaXMuc3ViamVjdFNlbGVjdG9yKCkgOiBuZXcgU3ViamVjdDxSPigpO1xuICAgICAgZ3JvdXBzLnNldChrZXksIGdyb3VwKTtcbiAgICAgIGNvbnN0IGdyb3VwZWRPYnNlcnZhYmxlID0gbmV3IEdyb3VwZWRPYnNlcnZhYmxlKGtleSwgZ3JvdXAsIHRoaXMpO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGdyb3VwZWRPYnNlcnZhYmxlKTtcbiAgICAgIGlmICh0aGlzLmR1cmF0aW9uU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IGR1cmF0aW9uOiBhbnk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uU2VsZWN0b3IobmV3IEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+KGtleSwgPFN1YmplY3Q8Uj4+Z3JvdXApKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgdGhpcy5lcnJvcihlcnIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZChkdXJhdGlvbi5zdWJzY3JpYmUobmV3IEdyb3VwRHVyYXRpb25TdWJzY3JpYmVyKGtleSwgZ3JvdXAsIHRoaXMpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFncm91cC5jbG9zZWQpIHtcbiAgICAgIGdyb3VwLm5leHQoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuZ3JvdXBzO1xuICAgIGlmIChncm91cHMpIHtcbiAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCwga2V5KSA9PiB7XG4gICAgICAgIGdyb3VwLmVycm9yKGVycik7XG4gICAgICB9KTtcblxuICAgICAgZ3JvdXBzLmNsZWFyKCk7XG4gICAgfVxuICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdXBzID0gdGhpcy5ncm91cHM7XG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwLCBrZXkpID0+IHtcbiAgICAgICAgZ3JvdXAuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBncm91cHMuY2xlYXIoKTtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXAoa2V5OiBLKTogdm9pZCB7XG4gICAgdGhpcy5ncm91cHMuZGVsZXRlKGtleSk7XG4gIH1cblxuICB1bnN1YnNjcmliZSgpIHtcbiAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICB0aGlzLmF0dGVtcHRlZFRvVW5zdWJzY3JpYmUgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuY291bnQgPT09IDApIHtcbiAgICAgICAgc3VwZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEdyb3VwRHVyYXRpb25TdWJzY3JpYmVyPEssIFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUga2V5OiBLLFxuICAgICAgICAgICAgICBwcml2YXRlIGdyb3VwOiBTdWJqZWN0PFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHBhcmVudDogR3JvdXBCeVN1YnNjcmliZXI8YW55LCBLLCBUPikge1xuICAgIHN1cGVyKGdyb3VwKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG4gICAgY29uc3QgeyBwYXJlbnQsIGtleSB9ID0gdGhpcztcbiAgICB0aGlzLmtleSA9IHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlR3JvdXAoa2V5KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBPYnNlcnZhYmxlIHJlcHJlc2VudGluZyB2YWx1ZXMgYmVsb25naW5nIHRvIHRoZSBzYW1lIGdyb3VwIHJlcHJlc2VudGVkIGJ5XG4gKiBhIGNvbW1vbiBrZXkuIFRoZSB2YWx1ZXMgZW1pdHRlZCBieSBhIEdyb3VwZWRPYnNlcnZhYmxlIGNvbWUgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgY29tbW9uIGtleSBpcyBhdmFpbGFibGUgYXMgdGhlIGZpZWxkIGBrZXlgIG9uIGFcbiAqIEdyb3VwZWRPYnNlcnZhYmxlIGluc3RhbmNlLlxuICpcbiAqIEBjbGFzcyBHcm91cGVkT2JzZXJ2YWJsZTxLLCBUPlxuICovXG5leHBvcnQgY2xhc3MgR3JvdXBlZE9ic2VydmFibGU8SywgVD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGtleTogSyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBncm91cFN1YmplY3Q6IFN1YmplY3Q8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVmQ291bnRTdWJzY3JpcHRpb24/OiBSZWZDb3VudFN1YnNjcmlwdGlvbikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIGNvbnN0IHtyZWZDb3VudFN1YnNjcmlwdGlvbiwgZ3JvdXBTdWJqZWN0fSA9IHRoaXM7XG4gICAgaWYgKHJlZkNvdW50U3Vic2NyaXB0aW9uICYmICFyZWZDb3VudFN1YnNjcmlwdGlvbi5jbG9zZWQpIHtcbiAgICAgIHN1YnNjcmlwdGlvbi5hZGQobmV3IElubmVyUmVmQ291bnRTdWJzY3JpcHRpb24ocmVmQ291bnRTdWJzY3JpcHRpb24pKTtcbiAgICB9XG4gICAgc3Vic2NyaXB0aW9uLmFkZChncm91cFN1YmplY3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpKTtcbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBJbm5lclJlZkNvdW50U3Vic2NyaXB0aW9uIGV4dGVuZHMgU3Vic2NyaXB0aW9uIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJlbnQ6IFJlZkNvdW50U3Vic2NyaXB0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgICBwYXJlbnQuY291bnQrKztcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgIGlmICghcGFyZW50LmNsb3NlZCAmJiAhdGhpcy5jbG9zZWQpIHtcbiAgICAgIHN1cGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICBwYXJlbnQuY291bnQgLT0gMTtcbiAgICAgIGlmIChwYXJlbnQuY291bnQgPT09IDAgJiYgcGFyZW50LmF0dGVtcHRlZFRvVW5zdWJzY3JpYmUpIHtcbiAgICAgICAgcGFyZW50LnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=