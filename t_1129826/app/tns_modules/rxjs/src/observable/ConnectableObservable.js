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
        _this._isComplete = false;
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
            this._isComplete = false;
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
var connectableProto = ConnectableObservable.prototype;
exports.connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
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
        this.connectable._isComplete = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGFibGVPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29ubmVjdGFibGVPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdEO0FBRXhELDRDQUEyQztBQUMzQyw0Q0FBMkM7QUFDM0MsZ0RBQThEO0FBRTlEOztHQUVHO0FBQ0g7SUFBOEMseUNBQWE7SUFPekQsK0JBQXNCLE1BQXFCLEVBQ3JCLGNBQWdDO1FBRHRELFlBRUUsaUJBQU8sU0FDUjtRQUhxQixZQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG9CQUFjLEdBQWQsY0FBYyxDQUFrQjtRQUw1QyxlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRWhDLGlCQUFXLEdBQUcsS0FBSyxDQUFDOztJQUtwQixDQUFDO0lBRVMsMENBQVUsR0FBcEIsVUFBcUIsVUFBeUI7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVTLDBDQUFVLEdBQXBCO1FBQ0UsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFDRSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDJCQUFZ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LCBTdWJqZWN0U3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIEBjbGFzcyBDb25uZWN0YWJsZU9ic2VydmFibGU8VD5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuXG4gIHByb3RlY3RlZCBfc3ViamVjdDogU3ViamVjdDxUPjtcbiAgcHJvdGVjdGVkIF9yZWZDb3VudDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9jb25uZWN0aW9uOiBTdWJzY3JpcHRpb247XG4gIF9pc0NvbXBsZXRlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNvdXJjZTogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHN1YmplY3RGYWN0b3J5OiAoKSA9PiBTdWJqZWN0PFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTdWJqZWN0KCkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFN1YmplY3QoKTogU3ViamVjdDxUPiB7XG4gICAgY29uc3Qgc3ViamVjdCA9IHRoaXMuX3N1YmplY3Q7XG4gICAgaWYgKCFzdWJqZWN0IHx8IHN1YmplY3QuaXNTdG9wcGVkKSB7XG4gICAgICB0aGlzLl9zdWJqZWN0ID0gdGhpcy5zdWJqZWN0RmFjdG9yeSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc3ViamVjdDtcbiAgfVxuXG4gIGNvbm5lY3QoKTogU3Vic2NyaXB0aW9uIHtcbiAgICBsZXQgY29ubmVjdGlvbiA9IHRoaXMuX2Nvbm5lY3Rpb247XG4gICAgaWYgKCFjb25uZWN0aW9uKSB7XG4gICAgICB0aGlzLl9pc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICBjb25uZWN0aW9uID0gdGhpcy5fY29ubmVjdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgIGNvbm5lY3Rpb24uYWRkKHRoaXMuc291cmNlXG4gICAgICAgIC5zdWJzY3JpYmUobmV3IENvbm5lY3RhYmxlU3Vic2NyaWJlcih0aGlzLmdldFN1YmplY3QoKSwgdGhpcykpKTtcbiAgICAgIGlmIChjb25uZWN0aW9uLmNsb3NlZCkge1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgY29ubmVjdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcbiAgfVxuXG4gIHJlZkNvdW50KCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IFJlZkNvdW50T3BlcmF0b3I8VD4odGhpcykpO1xuICB9XG59XG5cbmNvbnN0IGNvbm5lY3RhYmxlUHJvdG8gPSA8YW55PkNvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGU7XG5cbmV4cG9ydCBjb25zdCBjb25uZWN0YWJsZU9ic2VydmFibGVEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3JNYXAgPSB7XG4gIG9wZXJhdG9yOiB7IHZhbHVlOiBudWxsIH0sXG4gIF9yZWZDb3VudDogeyB2YWx1ZTogMCwgd3JpdGFibGU6IHRydWUgfSxcbiAgX3N1YmplY3Q6IHsgdmFsdWU6IG51bGwsIHdyaXRhYmxlOiB0cnVlIH0sXG4gIF9jb25uZWN0aW9uOiB7IHZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSB9LFxuICBfc3Vic2NyaWJlOiB7IHZhbHVlOiBjb25uZWN0YWJsZVByb3RvLl9zdWJzY3JpYmUgfSxcbiAgX2lzQ29tcGxldGU6IHsgdmFsdWU6IGNvbm5lY3RhYmxlUHJvdG8uX2lzQ29tcGxldGUsIHdyaXRhYmxlOiB0cnVlIH0sXG4gIGdldFN1YmplY3Q6IHsgdmFsdWU6IGNvbm5lY3RhYmxlUHJvdG8uZ2V0U3ViamVjdCB9LFxuICBjb25uZWN0OiB7IHZhbHVlOiBjb25uZWN0YWJsZVByb3RvLmNvbm5lY3QgfSxcbiAgcmVmQ291bnQ6IHsgdmFsdWU6IGNvbm5lY3RhYmxlUHJvdG8ucmVmQ291bnQgfVxufTtcblxuY2xhc3MgQ29ubmVjdGFibGVTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3ViamVjdFN1YnNjcmliZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3ViamVjdDxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb25uZWN0YWJsZTogQ29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl91bnN1YnNjcmliZSgpO1xuICAgIHN1cGVyLl9lcnJvcihlcnIpO1xuICB9XG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5jb25uZWN0YWJsZS5faXNDb21wbGV0ZSA9IHRydWU7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgICBzdXBlci5fY29tcGxldGUoKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IGNvbm5lY3RhYmxlID0gPGFueT50aGlzLmNvbm5lY3RhYmxlO1xuICAgIGlmIChjb25uZWN0YWJsZSkge1xuICAgICAgdGhpcy5jb25uZWN0YWJsZSA9IG51bGw7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gY29ubmVjdGFibGUuX2Nvbm5lY3Rpb247XG4gICAgICBjb25uZWN0YWJsZS5fcmVmQ291bnQgPSAwO1xuICAgICAgY29ubmVjdGFibGUuX3N1YmplY3QgPSBudWxsO1xuICAgICAgY29ubmVjdGFibGUuX2Nvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgaWYgKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgY29ubmVjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBSZWZDb3VudE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3RhYmxlOiBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4pIHtcbiAgfVxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG5cbiAgICBjb25zdCB7IGNvbm5lY3RhYmxlIH0gPSB0aGlzO1xuICAgICg8YW55PiBjb25uZWN0YWJsZSkuX3JlZkNvdW50Kys7XG5cbiAgICBjb25zdCByZWZDb3VudGVyID0gbmV3IFJlZkNvdW50U3Vic2NyaWJlcihzdWJzY3JpYmVyLCBjb25uZWN0YWJsZSk7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gc291cmNlLnN1YnNjcmliZShyZWZDb3VudGVyKTtcblxuICAgIGlmICghcmVmQ291bnRlci5jbG9zZWQpIHtcbiAgICAgICg8YW55PiByZWZDb3VudGVyKS5jb25uZWN0aW9uID0gY29ubmVjdGFibGUuY29ubmVjdCgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gIH1cbn1cblxuY2xhc3MgUmVmQ291bnRTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG5cbiAgcHJpdmF0ZSBjb25uZWN0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29ubmVjdGFibGU6IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG5cbiAgICBjb25zdCB7IGNvbm5lY3RhYmxlIH0gPSB0aGlzO1xuICAgIGlmICghY29ubmVjdGFibGUpIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb25uZWN0YWJsZSA9IG51bGw7XG4gICAgY29uc3QgcmVmQ291bnQgPSAoPGFueT4gY29ubmVjdGFibGUpLl9yZWZDb3VudDtcbiAgICBpZiAocmVmQ291bnQgPD0gMCkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAoPGFueT4gY29ubmVjdGFibGUpLl9yZWZDb3VudCA9IHJlZkNvdW50IC0gMTtcbiAgICBpZiAocmVmQ291bnQgPiAxKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vIENvbXBhcmUgdGhlIGxvY2FsIFJlZkNvdW50U3Vic2NyaWJlcidzIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uIHRvIHRoZVxuICAgIC8vIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uIG9uIHRoZSBzaGFyZWQgQ29ubmVjdGFibGVPYnNlcnZhYmxlLiBJbiBjYXNlc1xuICAgIC8vIHdoZXJlIHRoZSBDb25uZWN0YWJsZU9ic2VydmFibGUgc291cmNlIHN5bmNocm9ub3VzbHkgZW1pdHMgdmFsdWVzLCBhbmRcbiAgICAvLyB0aGUgUmVmQ291bnRTdWJzY3JpYmVyJ3MgZG93bnN0cmVhbSBPYnNlcnZlcnMgc3luY2hyb25vdXNseSB1bnN1YnNjcmliZSxcbiAgICAvLyBleGVjdXRpb24gY29udGludWVzIHRvIGhlcmUgYmVmb3JlIHRoZSBSZWZDb3VudE9wZXJhdG9yIGhhcyBhIGNoYW5jZSB0b1xuICAgIC8vIHN1cHBseSB0aGUgUmVmQ291bnRTdWJzY3JpYmVyIHdpdGggdGhlIHNoYXJlZCBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbi5cbiAgICAvLyBGb3IgZXhhbXBsZTpcbiAgICAvLyBgYGBcbiAgICAvLyBPYnNlcnZhYmxlLnJhbmdlKDAsIDEwKVxuICAgIC8vICAgLnB1Ymxpc2goKVxuICAgIC8vICAgLnJlZkNvdW50KClcbiAgICAvLyAgIC50YWtlKDUpXG4gICAgLy8gICAuc3Vic2NyaWJlKCk7XG4gICAgLy8gYGBgXG4gICAgLy8gSW4gb3JkZXIgdG8gYWNjb3VudCBmb3IgdGhpcyBjYXNlLCBSZWZDb3VudFN1YnNjcmliZXIgc2hvdWxkIG9ubHkgZGlzcG9zZVxuICAgIC8vIHRoZSBDb25uZWN0YWJsZU9ic2VydmFibGUncyBzaGFyZWQgY29ubmVjdGlvbiBTdWJzY3JpcHRpb24gaWYgdGhlXG4gICAgLy8gY29ubmVjdGlvbiBTdWJzY3JpcHRpb24gZXhpc3RzLCAqYW5kKiBlaXRoZXI6XG4gICAgLy8gICBhLiBSZWZDb3VudFN1YnNjcmliZXIgZG9lc24ndCBoYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBzaGFyZWQgY29ubmVjdGlvblxuICAgIC8vICAgICAgU3Vic2NyaXB0aW9uIHlldCwgb3IsXG4gICAgLy8gICBiLiBSZWZDb3VudFN1YnNjcmliZXIncyBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbiByZWZlcmVuY2UgaXMgaWRlbnRpY2FsXG4gICAgLy8gICAgICB0byB0aGUgc2hhcmVkIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uXG4gICAgLy8vXG4gICAgY29uc3QgeyBjb25uZWN0aW9uIH0gPSB0aGlzO1xuICAgIGNvbnN0IHNoYXJlZENvbm5lY3Rpb24gPSAoPGFueT4gY29ubmVjdGFibGUpLl9jb25uZWN0aW9uO1xuICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG5cbiAgICBpZiAoc2hhcmVkQ29ubmVjdGlvbiAmJiAoIWNvbm5lY3Rpb24gfHwgc2hhcmVkQ29ubmVjdGlvbiA9PT0gY29ubmVjdGlvbikpIHtcbiAgICAgIHNoYXJlZENvbm5lY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==