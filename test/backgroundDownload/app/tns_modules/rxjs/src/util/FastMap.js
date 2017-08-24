"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FastMap = (function () {
    function FastMap() {
        this.values = {};
    }
    FastMap.prototype.delete = function (key) {
        this.values[key] = null;
        return true;
    };
    FastMap.prototype.set = function (key, value) {
        this.values[key] = value;
        return this;
    };
    FastMap.prototype.get = function (key) {
        return this.values[key];
    };
    FastMap.prototype.forEach = function (cb, thisArg) {
        var values = this.values;
        for (var key in values) {
            if (values.hasOwnProperty(key) && values[key] !== null) {
                cb.call(thisArg, values[key], key);
            }
        }
    };
    FastMap.prototype.clear = function () {
        this.values = {};
    };
    return FastMap;
}());
exports.FastMap = FastMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFzdE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZhc3RNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO1FBQ1UsV0FBTSxHQUFXLEVBQUUsQ0FBQztJQTRCOUIsQ0FBQztJQTFCQyx3QkFBTSxHQUFOLFVBQU8sR0FBVztRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHFCQUFHLEdBQUgsVUFBSSxHQUFXLEVBQUUsS0FBVTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHFCQUFHLEdBQUgsVUFBSSxHQUFXO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELHlCQUFPLEdBQVAsVUFBUSxFQUFrQyxFQUFFLE9BQWE7UUFDdkQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCx1QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEZhc3RNYXAge1xuICBwcml2YXRlIHZhbHVlczogT2JqZWN0ID0ge307XG5cbiAgZGVsZXRlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhpcy52YWx1ZXNba2V5XSA9IG51bGw7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBGYXN0TWFwIHtcbiAgICB0aGlzLnZhbHVlc1trZXldID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlc1trZXldO1xuICB9XG5cbiAgZm9yRWFjaChjYjogKHZhbHVlOiBhbnksIGtleTogYW55KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy52YWx1ZXM7XG4gICAgZm9yIChsZXQga2V5IGluIHZhbHVlcykge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHZhbHVlc1trZXldICE9PSBudWxsKSB7XG4gICAgICAgIGNiLmNhbGwodGhpc0FyZywgdmFsdWVzW2tleV0sIGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZXMgPSB7fTtcbiAgfVxufSJdfQ==