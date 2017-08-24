"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("../Subject");
var Observable_1 = require("../Observable");
var Subscriber_1 = require("../Subscriber");
var Subscription_1 = require("../Subscription");
/**
 * @class ConnectableObservable<T>
 */
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription_1.Subscription();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return this.lift(new RefCountOperator(this));
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;
exports.connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: ConnectableObservable.prototype._subscribe },
    getSubject: { value: ConnectableObservable.prototype.getSubject },
    connect: { value: ConnectableObservable.prototype.connect },
    refCount: { value: ConnectableObservable.prototype.refCount }
};
var ConnectableSubscriber = (function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(Subject_1.SubjectSubscriber));
var RefCountOperator = (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGFibGVPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29ubmVjdGFibGVPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdEO0FBRXhELDRDQUEyQztBQUMzQyw0Q0FBMkM7QUFDM0MsZ0RBQThEO0FBRTlEOztHQUVHO0FBQ0g7SUFBOEMseUNBQWE7SUFNekQsK0JBQXNCLE1BQXFCLEVBQ3JCLGNBQWdDO1FBRHRELFlBRUUsaUJBQU8sU0FDUjtRQUhxQixZQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG9CQUFjLEdBQWQsY0FBYyxDQUFrQjtRQUo1QyxlQUFTLEdBQVcsQ0FBQyxDQUFDOztJQU1oQyxDQUFDO0lBRVMsMENBQVUsR0FBcEIsVUFBcUIsVUFBeUI7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVTLDBDQUFVLEdBQXBCO1FBQ0UsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFDRSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNoQixVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztZQUNuRCxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO2lCQUN2QixTQUFT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QVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxHQUFHO1FBQ0gsd0VBQXdFO1FBQ3hFLHdFQUF3RTtRQUN4RSx5RUFBeUU7UUFDekUsMkVBQTJFO1FBQzNFLDBFQUEwRTtRQUMxRSx5RUFBeUU7UUFDekUsZUFBZTtRQUNmLE1BQU07UUFDTiwwQkFBMEI7UUFDMUIsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLE1BQU07UUFDTiw0RUFBNEU7UUFDNUUsb0VBQW9FO1FBQ3BFLGdEQUFnRDtRQUNoRCw0RUFBNEU7UUFDNUUsNkJBQTZCO1FBQzdCLDJFQUEyRTtRQUMzRSw2Q0FBNkM7UUFDN0MsR0FBRztRQUNLLElBQUEsNEJBQVUsQ0FBVTtRQUM1QixJQUFNLGdCQUFnQixHQUFVLFdBQVksQ0FBQyxXQUFXLENBQUM7UUFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxnQkFBZ0IsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsQ0FBQztJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUE3REQsQ0FBb0MsdUJBQVUsR0E2RDdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCwgU3ViamVjdFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJqZWN0JztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBAY2xhc3MgQ29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcblxuICBwcm90ZWN0ZWQgX3N1YmplY3Q6IFN1YmplY3Q8VD47XG4gIHByb3RlY3RlZCBfcmVmQ291bnQ6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfY29ubmVjdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzb3VyY2U6IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBzdWJqZWN0RmFjdG9yeTogKCkgPT4gU3ViamVjdDxUPikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U3ViamVjdCgpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTdWJqZWN0KCk6IFN1YmplY3Q8VD4ge1xuICAgIGNvbnN0IHN1YmplY3QgPSB0aGlzLl9zdWJqZWN0O1xuICAgIGlmICghc3ViamVjdCB8fCBzdWJqZWN0LmlzU3RvcHBlZCkge1xuICAgICAgdGhpcy5fc3ViamVjdCA9IHRoaXMuc3ViamVjdEZhY3RvcnkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3N1YmplY3Q7XG4gIH1cblxuICBjb25uZWN0KCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgbGV0IGNvbm5lY3Rpb24gPSB0aGlzLl9jb25uZWN0aW9uO1xuICAgIGlmICghY29ubmVjdGlvbikge1xuICAgICAgY29ubmVjdGlvbiA9IHRoaXMuX2Nvbm5lY3Rpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICBjb25uZWN0aW9uLmFkZCh0aGlzLnNvdXJjZVxuICAgICAgICAuc3Vic2NyaWJlKG5ldyBDb25uZWN0YWJsZVN1YnNjcmliZXIodGhpcy5nZXRTdWJqZWN0KCksIHRoaXMpKSk7XG4gICAgICBpZiAoY29ubmVjdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgIGNvbm5lY3Rpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gIH1cblxuICByZWZDb3VudCgpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBSZWZDb3VudE9wZXJhdG9yPFQ+KHRoaXMpKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY29ubmVjdGFibGVPYnNlcnZhYmxlRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yTWFwID0ge1xuICBvcGVyYXRvcjogeyB2YWx1ZTogbnVsbCB9LFxuICBfcmVmQ291bnQ6IHsgdmFsdWU6IDAsIHdyaXRhYmxlOiB0cnVlIH0sXG4gIF9zdWJqZWN0OiB7IHZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSB9LFxuICBfY29ubmVjdGlvbjogeyB2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUgfSxcbiAgX3N1YnNjcmliZTogeyB2YWx1ZTogKDxhbnk+IENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUpLl9zdWJzY3JpYmUgfSxcbiAgZ2V0U3ViamVjdDogeyB2YWx1ZTogKDxhbnk+IENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUpLmdldFN1YmplY3QgfSxcbiAgY29ubmVjdDogeyB2YWx1ZTogKDxhbnk+IENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUpLmNvbm5lY3QgfSxcbiAgcmVmQ291bnQ6IHsgdmFsdWU6ICg8YW55PiBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlKS5yZWZDb3VudCB9XG59O1xuXG5jbGFzcyBDb25uZWN0YWJsZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJqZWN0U3Vic2NyaWJlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJqZWN0PFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RhYmxlOiBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gICAgc3VwZXIuX2Vycm9yKGVycik7XG4gIH1cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl91bnN1YnNjcmliZSgpO1xuICAgIHN1cGVyLl9jb21wbGV0ZSgpO1xuICB9XG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG4gICAgY29uc3QgeyBjb25uZWN0YWJsZSB9ID0gdGhpcztcbiAgICBpZiAoY29ubmVjdGFibGUpIHtcbiAgICAgIHRoaXMuY29ubmVjdGFibGUgPSBudWxsO1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9ICg8YW55PiBjb25uZWN0YWJsZSkuX2Nvbm5lY3Rpb247XG4gICAgICAoPGFueT4gY29ubmVjdGFibGUpLl9yZWZDb3VudCA9IDA7XG4gICAgICAoPGFueT4gY29ubmVjdGFibGUpLl9zdWJqZWN0ID0gbnVsbDtcbiAgICAgICg8YW55PiBjb25uZWN0YWJsZSkuX2Nvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgaWYgKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgY29ubmVjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBSZWZDb3VudE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3RhYmxlOiBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4pIHtcbiAgfVxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG5cbiAgICBjb25zdCB7IGNvbm5lY3RhYmxlIH0gPSB0aGlzO1xuICAgICg8YW55PiBjb25uZWN0YWJsZSkuX3JlZkNvdW50Kys7XG5cbiAgICBjb25zdCByZWZDb3VudGVyID0gbmV3IFJlZkNvdW50U3Vic2NyaWJlcihzdWJzY3JpYmVyLCBjb25uZWN0YWJsZSk7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gc291cmNlLnN1YnNjcmliZShyZWZDb3VudGVyKTtcblxuICAgIGlmICghcmVmQ291bnRlci5jbG9zZWQpIHtcbiAgICAgICg8YW55PiByZWZDb3VudGVyKS5jb25uZWN0aW9uID0gY29ubmVjdGFibGUuY29ubmVjdCgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gIH1cbn1cblxuY2xhc3MgUmVmQ291bnRTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG5cbiAgcHJpdmF0ZSBjb25uZWN0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29ubmVjdGFibGU6IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG5cbiAgICBjb25zdCB7IGNvbm5lY3RhYmxlIH0gPSB0aGlzO1xuICAgIGlmICghY29ubmVjdGFibGUpIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb25uZWN0YWJsZSA9IG51bGw7XG4gICAgY29uc3QgcmVmQ291bnQgPSAoPGFueT4gY29ubmVjdGFibGUpLl9yZWZDb3VudDtcbiAgICBpZiAocmVmQ291bnQgPD0gMCkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAoPGFueT4gY29ubmVjdGFibGUpLl9yZWZDb3VudCA9IHJlZkNvdW50IC0gMTtcbiAgICBpZiAocmVmQ291bnQgPiAxKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vIENvbXBhcmUgdGhlIGxvY2FsIFJlZkNvdW50U3Vic2NyaWJlcidzIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uIHRvIHRoZVxuICAgIC8vIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uIG9uIHRoZSBzaGFyZWQgQ29ubmVjdGFibGVPYnNlcnZhYmxlLiBJbiBjYXNlc1xuICAgIC8vIHdoZXJlIHRoZSBDb25uZWN0YWJsZU9ic2VydmFibGUgc291cmNlIHN5bmNocm9ub3VzbHkgZW1pdHMgdmFsdWVzLCBhbmRcbiAgICAvLyB0aGUgUmVmQ291bnRTdWJzY3JpYmVyJ3MgZG93bnN0cmVhbSBPYnNlcnZlcnMgc3luY2hyb25vdXNseSB1bnN1YnNjcmliZSxcbiAgICAvLyBleGVjdXRpb24gY29udGludWVzIHRvIGhlcmUgYmVmb3JlIHRoZSBSZWZDb3VudE9wZXJhdG9yIGhhcyBhIGNoYW5jZSB0b1xuICAgIC8vIHN1cHBseSB0aGUgUmVmQ291bnRTdWJzY3JpYmVyIHdpdGggdGhlIHNoYXJlZCBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbi5cbiAgICAvLyBGb3IgZXhhbXBsZTpcbiAgICAvLyBgYGBcbiAgICAvLyBPYnNlcnZhYmxlLnJhbmdlKDAsIDEwKVxuICAgIC8vICAgLnB1Ymxpc2goKVxuICAgIC8vICAgLnJlZkNvdW50KClcbiAgICAvLyAgIC50YWtlKDUpXG4gICAgLy8gICAuc3Vic2NyaWJlKCk7XG4gICAgLy8gYGBgXG4gICAgLy8gSW4gb3JkZXIgdG8gYWNjb3VudCBmb3IgdGhpcyBjYXNlLCBSZWZDb3VudFN1YnNjcmliZXIgc2hvdWxkIG9ubHkgZGlzcG9zZVxuICAgIC8vIHRoZSBDb25uZWN0YWJsZU9ic2VydmFibGUncyBzaGFyZWQgY29ubmVjdGlvbiBTdWJzY3JpcHRpb24gaWYgdGhlXG4gICAgLy8gY29ubmVjdGlvbiBTdWJzY3JpcHRpb24gZXhpc3RzLCAqYW5kKiBlaXRoZXI6XG4gICAgLy8gICBhLiBSZWZDb3VudFN1YnNjcmliZXIgZG9lc24ndCBoYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBzaGFyZWQgY29ubmVjdGlvblxuICAgIC8vICAgICAgU3Vic2NyaXB0aW9uIHlldCwgb3IsXG4gICAgLy8gICBiLiBSZWZDb3VudFN1YnNjcmliZXIncyBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbiByZWZlcmVuY2UgaXMgaWRlbnRpY2FsXG4gICAgLy8gICAgICB0byB0aGUgc2hhcmVkIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uXG4gICAgLy8vXG4gICAgY29uc3QgeyBjb25uZWN0aW9uIH0gPSB0aGlzO1xuICAgIGNvbnN0IHNoYXJlZENvbm5lY3Rpb24gPSAoPGFueT4gY29ubmVjdGFibGUpLl9jb25uZWN0aW9uO1xuICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG5cbiAgICBpZiAoc2hhcmVkQ29ubmVjdGlvbiAmJiAoIWNvbm5lY3Rpb24gfHwgc2hhcmVkQ29ubmVjdGlvbiA9PT0gY29ubmVjdGlvbikpIHtcbiAgICAgIHNoYXJlZENvbm5lY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==