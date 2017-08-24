"use strict";
var observable_1 = require("data/observable");
var worker = new Worker('./workers/image-processor');
var image_source_1 = require("image-source");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.imageSource = image_source_1.fromResource("res://icon");
        // Initialize default values.
        _this._counter = 42;
        _this.updateMessage();
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            if (this._message !== value) {
                this._message = value;
                this.notifyPropertyChange('message', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.onTap = function () {
        this._counter--;
        this.updateMessage();
    };
    HelloWorldModel.prototype.updateMessage = function () {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        }
        else {
            this.message = this._counter + " taps left";
        }
    };
    HelloWorldModel.prototype.workerInit = function () {
        worker.postMessage({ src: this.imageSource, mode: 'scale' });
        worker.onmessage = function (msg) {
            if (msg.data.success) {
                // Stop idle animation
                // Update Image View
                // Terminate worker or send another message
                worker.terminate();
            }
            else {
            }
        };
        worker.onerror = function (err) {
            console.log("An unhandled error occurred in worker: " + err.filename + ", line: " + err.lineno + " :");
            console.log(err.message);
        };
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBNkM7QUFDN0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNyRCw2Q0FBNEM7QUFFNUM7SUFBcUMsbUNBQVU7SUFPM0M7UUFBQSxZQUNJLGlCQUFPLFNBS1Y7UUFYTSxpQkFBVyxHQUFHLDJCQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFRNUMsNkJBQTZCO1FBQzdCLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUVELHNCQUFJLG9DQUFPO2FBQVg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBWSxLQUFhO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDL0MsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU00sK0JBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVPLHVDQUFhLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsK0RBQStELENBQUM7UUFDbkYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sR0FBTSxJQUFJLENBQUMsUUFBUSxlQUFZLENBQUM7UUFDaEQsQ0FBQztJQUNMLENBQUM7SUFFTSxvQ0FBVSxHQUFqQjtRQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUU3RCxNQUFNLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRztZQUM1QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLHNCQUFzQjtnQkFDdEIsb0JBQW9CO2dCQUNwQiwyQ0FBMkM7Z0JBRTNDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN2QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7WUFJUixDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLEdBQUc7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBMEMsR0FBRyxDQUFDLFFBQVEsZ0JBQVcsR0FBRyxDQUFDLE1BQU0sT0FBSSxDQUFDLENBQUM7WUFDN0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTdERCxDQUFxQyx1QkFBVSxHQTZEOUM7QUE3RFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbnZhciB3b3JrZXIgPSBuZXcgV29ya2VyKCcuL3dvcmtlcnMvaW1hZ2UtcHJvY2Vzc29yJyk7XG5pbXBvcnQgeyBmcm9tUmVzb3VyY2UgfSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIHB1YmxpYyBpbWFnZVNvdXJjZSA9IGZyb21SZXNvdXJjZShcInJlczovL2ljb25cIik7XG5cbiAgICBwcml2YXRlIF9jb3VudGVyOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IHZhbHVlcy5cbiAgICAgICAgdGhpcy5fY291bnRlciA9IDQyO1xuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoKTtcbiAgICB9XG5cbiAgICBnZXQgbWVzc2FnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcbiAgICB9XG5cbiAgICBzZXQgbWVzc2FnZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl9tZXNzYWdlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWVzc2FnZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnbWVzc2FnZScsIHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGFwKCkge1xuICAgICAgICB0aGlzLl9jb3VudGVyLS07XG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTWVzc2FnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvdW50ZXIgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ0hvb3JyYWFheSEgWW91IHVubG9ja2VkIHRoZSBOYXRpdmVTY3JpcHQgY2xpY2tlciBhY2hpZXZlbWVudCEnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gYCR7dGhpcy5fY291bnRlcn0gdGFwcyBsZWZ0YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB3b3JrZXJJbml0KCkge1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoeyBzcmM6IHRoaXMuaW1hZ2VTb3VyY2UsIG1vZGU6ICdzY2FsZScgfSk7XG5cbiAgICAgICAgd29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgIGlmIChtc2cuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgLy8gU3RvcCBpZGxlIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBJbWFnZSBWaWV3XG4gICAgICAgICAgICAgICAgLy8gVGVybWluYXRlIHdvcmtlciBvciBzZW5kIGFub3RoZXIgbWVzc2FnZVxuXG4gICAgICAgICAgICAgICAgd29ya2VyLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTdG9wIGlkbGUgYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgLy8gRGlzcGxheSBtZWFuaW5nZnVsIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICAvLyBUZXJtaW5hdGUgd29ya2VyIG9yIHNlbmQgbWVzc2FnZSB3aXRoIGRpZmZlcmVudCBwYXJhbWV0ZXJzXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3b3JrZXIub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBbiB1bmhhbmRsZWQgZXJyb3Igb2NjdXJyZWQgaW4gd29ya2VyOiAke2Vyci5maWxlbmFtZX0sIGxpbmU6ICR7ZXJyLmxpbmVub30gOmApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==