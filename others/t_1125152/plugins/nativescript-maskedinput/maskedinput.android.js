"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./maskedinput-common");
global.moduleMerge(common, exports);
var MaskedInput = (function (_super) {
    __extends(MaskedInput, _super);
    function MaskedInput() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(MaskedInput.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    MaskedInput.prototype._createUI = function () {
        this._android = new android.widget.EditText(this._context);
        this._configureEditText();
        var that = new WeakRef(this);
        var focusChangeListener = new android.view.View.OnFocusChangeListener({
            onFocusChange: function (view, hasFocus) {
                var owner = that.get();
                if (!owner) {
                    return;
                }
                if (!hasFocus) {
                    owner.dismissSoftInput();
                    owner.bypassEvent = true;
                    owner.text = owner.FormattedText;
                }
                else {
                    owner.initialText = false;
                    owner.focus();
                    owner.editTextChange = true;
                    owner.text = owner.stringBuilder;
                }
            }
        });
        this.android.setOnFocusChangeListener(focusChangeListener);
        this.buildRegEx();
    };
    MaskedInput.prototype._configureEditText = function () {
        var that = new WeakRef(this);
        this.initialText = true;
        this.android.addTextChangedListener(new android.text.TextWatcher({
            beforeTextChanged: function (s, index, toBeReplaced, addedCount) {
                var owner = that.get();
                owner.textBefore = s.toString();
                owner.selectionBefore = owner.android.getSelectionEnd();
            },
            onTextChanged: function (s, index, replacedCount, addedCount) {
                var owner = that.get();
                if (owner.bypassEvent) {
                    owner.initialText = false;
                    owner.editTextChange = false;
                    owner.bypassEvent = false;
                    return;
                }
                else if (owner.initialText) {
                    var sbIdx = 0;
                    var s1 = s.toString();
                    for (var i = 0; i < s1.length; i++) {
                        if (owner.testCharAtIndex(s1.charAt(i), sbIdx)) {
                            owner.replacePlaceholder(sbIdx, s1.charAt(i));
                            sbIdx++;
                        }
                        else {
                            var nextIdx = owner.findIndex();
                            if (owner.testCharAtIndex(s1.charAt(i), nextIdx)) {
                                owner.replacePlaceholder(nextIdx, s1.charAt(i));
                                sbIdx = nextIdx + 1;
                            }
                        }
                    }
                    owner.bypassEvent = true;
                    owner.text = owner.FormattedText;
                    return;
                }
                else if (owner.editTextChange) {
                    if (owner.newIndex) {
                        owner.android.setSelection(owner.newIndex);
                    }
                    else {
                        owner.android.setSelection(owner.findIndex());
                    }
                    owner.setInputTypeBasedOnMask();
                    owner.editTextChange = false;
                    return;
                }
                try {
                    if (replacedCount > 0 && addedCount === 0) {
                        owner.editTextChange = true;
                        owner.replacePlaceholder(index, owner.placeholder);
                        return;
                    }
                    else if (index + replacedCount === owner.stringBuilder.length) {
                        owner.editTextChange = true;
                        if (s.toString().length > owner.stringBuilder.length) {
                            owner.android.setText(owner.textBefore);
                        }
                        else {
                            owner.replacePlaceholder(owner.stringBuilder.length - 1, owner.placeholder);
                        }
                        return;
                    }
                    if (!owner.editTextChange) {
                        owner.editTextChange = true;
                        var newChar = s.charAt(index);
                        if (owner.testCharAtIndex(newChar, index)) {
                            owner.replacePlaceholder(index, newChar);
                        }
                        else {
                            owner.android.setText(owner.textBefore);
                        }
                    }
                    else {
                        owner.editTextChange = false;
                    }
                }
                catch (e) {
                    owner.editTextChange = true;
                    owner.newIndex = owner.selectionBefore;
                    owner.android.setText(owner.textBefore);
                }
            },
            afterTextChanged: function (s) {
                var owner = that.get();
                if (owner.initialText) {
                    owner.initialText = false;
                    return;
                }
                if (owner.editTextChange) {
                    owner.text = owner.stringBuilder;
                    owner.android.setSelection(owner.findIndex());
                    owner.setInputTypeBasedOnMask();
                }
            }
        }));
    };
    return MaskedInput;
}(common.MaskedInput));
exports.MaskedInput = MaskedInput;
//# sourceMappingURL=maskedinput.android.js.map