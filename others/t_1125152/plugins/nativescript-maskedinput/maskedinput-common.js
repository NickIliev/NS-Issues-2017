"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var textView = require("ui/text-view");
var textBase = require("ui/text-base");
var enums = require("ui/enums");
global.moduleMerge(textBase, exports);
var MaskedInput = (function (_super) {
    __extends(MaskedInput, _super);
    function MaskedInput(options) {
        _super.call(this, options);
        this._mask = "";
        this._stringBuilder = [];
        this._sbIsPlaceholder = [];
        this._regexArr = [];
        this._regexOptionalArr = [];
        this._placeholder = "_";
        this._regexReady = false;
        this.initialText = false;
        this.bypassEvent = false;
    }
    Object.defineProperty(MaskedInput.prototype, "mask", {
        get: function () {
            return this._mask;
        },
        set: function (value) {
            this._mask = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedInput.prototype, "stringBuilder", {
        get: function () {
            return this._stringBuilder.join("");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedInput.prototype, "regEx", {
        get: function () {
            var regex;
            regex = "^";
            for (var c = 0; c < this._regexArr.length; c++) {
                regex += this._regexArr[c] + this._regexOptionalArr[c];
            }
            regex += "$";
            return regex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedInput.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedInput.prototype, "RawText", {
        get: function () {
            var s = "";
            for (var c = 0; c < this._sbIsPlaceholder.length; c++) {
                if (this._sbIsPlaceholder[c]) {
                    if (this._stringBuilder[c] !== this._placeholder) {
                        s += this._stringBuilder[c];
                    }
                }
            }
            return s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedInput.prototype, "FormattedText", {
        get: function () {
            var s = "";
            var emptyOptionalPlaceholderIndex;
            var firstOptionalPlaceholderIndex;
            for (var i = 0; i < this._sbIsPlaceholder.length; i++) {
                if (this._regexOptionalArr[i] && this._sbIsPlaceholder[i]) {
                    if (!firstOptionalPlaceholderIndex) {
                        firstOptionalPlaceholderIndex = i;
                    }
                    if (!emptyOptionalPlaceholderIndex) {
                        if (this._stringBuilder[i] === this._placeholder) {
                            emptyOptionalPlaceholderIndex = i;
                        }
                    }
                }
            }
            for (var c = 0; c < this._sbIsPlaceholder.length; c++) {
                if (this._regexOptionalArr[c]) {
                    if (firstOptionalPlaceholderIndex === emptyOptionalPlaceholderIndex) {
                        break;
                    }
                }
                if (this._stringBuilder[c] !== this._placeholder) {
                    s += this._stringBuilder[c];
                }
            }
            return s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedInput.prototype, "text", {
        get: function () {
            return this.FormattedText;
        },
        set: function (value) {
            var s = value.toString();
            this._setValue(textBase.TextBase.textProperty, s);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedInput.prototype, "valid", {
        get: function () {
            var r = false;
            var pattern = new RegExp(this.regEx, "i");
            if (pattern.test(this.FormattedText)) {
                r = true;
            }
            return r;
        },
        enumerable: true,
        configurable: true
    });
    MaskedInput.prototype.buildRegEx = function () {
        if (this._regexReady) {
            return;
        }
        var foundOptional = false;
        var stringArr = this._mask.split("");
        for (var _i = 0, stringArr_1 = stringArr; _i < stringArr_1.length; _i++) {
            var s = stringArr_1[_i];
            if (s === "9") {
                this._regexArr.push("[0-9]");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(this._placeholder);
                this._sbIsPlaceholder.push(true);
            }
            else if (s === "a") {
                this._regexArr.push("[A-Za-z]");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(this._placeholder);
                this._sbIsPlaceholder.push(true);
            }
            else if (s === "*") {
                this._regexArr.push("[A-Za-z0-9]");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(this._placeholder);
                this._sbIsPlaceholder.push(true);
            }
            else if (s === "(") {
                this._regexArr.push("\(");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === ")") {
                this._regexArr.push("\)");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === ".") {
                this._regexArr.push("\.");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "$") {
                this._regexArr.push("\$");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "\\") {
                this._regexArr.push("\\");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "/") {
                this._regexArr.push("\/");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "+") {
                this._regexArr.push("\+");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "[") {
                this._regexArr.push("\[");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "]") {
                this._regexArr.push("\]");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "{") {
                this._regexArr.push("\{");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "}") {
                this._regexArr.push("\}");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "|") {
                this._regexArr.push("\|");
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
            else if (s === "?") {
                foundOptional = true;
            }
            else {
                this._regexArr.push(s);
                this._regexOptionalArr.push(foundOptional ? "?" : "");
                this._stringBuilder.push(s);
                this._sbIsPlaceholder.push(false);
            }
        }
        this._regexReady = true;
    };
    MaskedInput.prototype.findIndex = function () {
        var idx;
        idx = this._stringBuilder.indexOf(this._placeholder);
        if (idx < 0) {
            idx = this._stringBuilder.length;
        }
        return idx;
    };
    MaskedInput.prototype.getNextCharType = function (idx) {
        var s = this._regexArr[idx];
        if (s && s.replace("?", "") === "[0-9]") {
            return "9";
        }
        return "";
    };
    MaskedInput.prototype.testCharAtIndex = function (c, idx) {
        var valid = false;
        if (idx <= this._regexArr.length - 1) {
            var rx = new RegExp(this._regexArr[idx], "g");
            valid = rx.test(c);
        }
        return valid;
    };
    MaskedInput.prototype.findPreviousPlaceholder = function (currentIndex) {
        var previousIdx = this._sbIsPlaceholder.lastIndexOf(true, currentIndex - 1);
        return previousIdx;
    };
    MaskedInput.prototype.replacePlaceholder = function (idx, c) {
        if (idx <= this._stringBuilder.length - 1) {
            if (c === this._placeholder) {
                if (this._sbIsPlaceholder[idx]) {
                    this._stringBuilder[idx] = c;
                }
                else {
                    var startIdx = idx - this._stringBuilder.length - 1;
                    var previousIdx = this._sbIsPlaceholder.lastIndexOf(true, startIdx);
                    if (previousIdx >= 0) {
                        this._stringBuilder[previousIdx] = c;
                    }
                }
            }
            else {
                this._stringBuilder[idx] = c;
            }
        }
    };
    MaskedInput.prototype.setInputTypeBasedOnMask = function () {
        var idx = this.findIndex();
        var char = this.getNextCharType(idx);
        this.getKeyboardTypeForChar(char);
    };
    MaskedInput.prototype.getKeyboardTypeForChar = function (char) {
        switch (char) {
            case "9":
                this.keyboardType = enums.KeyboardType.phone;
                break;
            default:
                this.keyboardType = "";
        }
    };
    return MaskedInput;
}(textView.TextView));
exports.MaskedInput = MaskedInput;
//# sourceMappingURL=maskedinput-common.js.map