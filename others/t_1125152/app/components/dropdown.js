var ValueList = (function () {
    function ValueList(array, displayField) {
        this._array = array;
        this._displayField = displayField;
    }
    Object.defineProperty(ValueList.prototype, "length", {
        get: function () { return this._array.length; },
        enumerable: true,
        configurable: true
    });
    ValueList.prototype.getItem = function (index) {
        return this.getText(index);
    };
    ValueList.prototype.getText = function (index) {
        if (index < 0
            || index >= this._array.length) {
            return "";
        }
        return this._array[index][this._displayField];
    };
    ValueList.prototype.getValue = function (index) {
        if (index < 0
            || index >= this._array.length) {
            return null;
        }
        return this._array[index].ValueMember;
    };
    ValueList.prototype.getIndex = function (value) {
        var loop;
        for (loop = 0; loop < this._array.length; loop++) {
            if (this.getValue(loop) == value) {
                return loop;
            }
        }
        return -1;
    };
    return ValueList;
})();
module.exports = ValueList;