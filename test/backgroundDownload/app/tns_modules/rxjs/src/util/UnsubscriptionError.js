"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        var _this = _super.call(this) || this;
        _this.errors = errors;
        var err = Error.call(_this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '');
        _this.name = err.name = 'UnsubscriptionError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVuc3Vic2NyaXB0aW9uRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0dBR0c7QUFDSDtJQUF5Qyx1Q0FBSztJQUM1Qyw2QkFBbUIsTUFBYTtRQUFoQyxZQUNFLGlCQUFPLFNBT1I7UUFSa0IsWUFBTSxHQUFOLE1BQU0sQ0FBTztRQUU5QixJQUFNLEdBQUcsR0FBUSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksRUFBRSxNQUFNO1lBQ25DLE1BQU0sQ0FBQyxNQUFNLG1EQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsSUFBSyxPQUFHLENBQUMsR0FBRyxDQUFDLFVBQUssR0FBRyxDQUFDLFFBQVEsRUFBSSxFQUE3QixDQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQztRQUM5QyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDeEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDOztJQUNyQyxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBeUMsS0FBSyxHQVU3QztBQVZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gb25lIG9yIG1vcmUgZXJyb3JzIGhhdmUgb2NjdXJyZWQgZHVyaW5nIHRoZVxuICogYHVuc3Vic2NyaWJlYCBvZiBhIHtAbGluayBTdWJzY3JpcHRpb259LlxuICovXG5leHBvcnQgY2xhc3MgVW5zdWJzY3JpcHRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVycm9yczogYW55W10pIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IGVycjogYW55ID0gRXJyb3IuY2FsbCh0aGlzLCBlcnJvcnMgP1xuICAgICAgYCR7ZXJyb3JzLmxlbmd0aH0gZXJyb3JzIG9jY3VycmVkIGR1cmluZyB1bnN1YnNjcmlwdGlvbjpcbiAgJHtlcnJvcnMubWFwKChlcnIsIGkpID0+IGAke2kgKyAxfSkgJHtlcnIudG9TdHJpbmcoKX1gKS5qb2luKCdcXG4gICcpfWAgOiAnJyk7XG4gICAgKDxhbnk+IHRoaXMpLm5hbWUgPSBlcnIubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAoPGFueT4gdGhpcykuc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgKDxhbnk+IHRoaXMpLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgfVxufVxuIl19