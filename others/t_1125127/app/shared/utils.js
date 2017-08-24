"use strict";
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}
exports.addDays = addDays;
function getPropertyValue(object, property) {
    if (object && object != "&nbsp;" && object.get(property)) {
        return object.get(property);
    }
    else {
        return "";
    }
}
exports.getPropertyValue = getPropertyValue;
function getPropertyValueHTML(object, property, prefix, suffix) {
    var value = this.getPropertyValue(object, property);
    if (value != "") {
        if (prefix) {
            value = prefix + value;
        }
        if (suffix) {
            value = value + suffix;
        }
        return value;
    }
    else {
        return "&nbsp;"; // Use with #= in templates and data-bind html, not text, or will be rendered as &amp;nbsp;
    }
}
exports.getPropertyValueHTML = getPropertyValueHTML;
function isDefined(obj) {
    return obj !== null && obj !== undefined;
}
exports.isDefined = isDefined;
//# sourceMappingURL=utils.js.map