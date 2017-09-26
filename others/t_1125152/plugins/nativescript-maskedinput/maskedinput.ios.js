"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./maskedinput-common");
var types_1 = require("utils/types");
var text_base_1 = require("ui/text-base");
var enums_1 = require("ui/enums");
global.moduleMerge(common, exports);
var MaskedInputDelegateImpl = (function (_super) {
    __extends(MaskedInputDelegateImpl, _super);
    function MaskedInputDelegateImpl() {
        _super.apply(this, arguments);
    }
    MaskedInputDelegateImpl.initWithOwner = function (owner) {
        var impl = MaskedInputDelegateImpl.new();
        impl._owner = owner;
        return impl;
    };
    MaskedInputDelegateImpl.prototype.textViewShouldBeginEditing = function (textView) {
        var owner = this._owner.get();
        if (owner) {
            owner._hideHint();
        }
        return true;
    };
    MaskedInputDelegateImpl.prototype.textViewDidBeginEditing = function (textView) {
        var owner = this._owner.get();
        if (owner) {
            var that_1 = this;
            textView.text = owner.stringBuilder;
            setTimeout(function () {
                that_1.setCursor(textView);
            }, 10);
            this.prevString = textView.text.toString();
            owner.setInputTypeBasedOnMask();
            textView.reloadInputViews();
        }
    };
    MaskedInputDelegateImpl.prototype.setCursor = function (textView) {
        var owner = this._owner.get();
        if (owner) {
            this.nextIdx = owner.findIndex();
            textView.selectedRange = NSMakeRange(this.nextIdx, 0);
        }
    };
    MaskedInputDelegateImpl.prototype.textViewDidEndEditing = function (textView) {
        var owner = this._owner.get();
        if (owner) {
            console.log(owner.updateTextTrigger);
            if (owner.updateTextTrigger === enums_1.UpdateTextTrigger.focusLost) {
                owner._onPropertyChangedFromNative(text_base_1.TextBase.textProperty, owner.FormattedText);
            }
            else if (owner.updateTextTrigger === enums_1.UpdateTextTrigger.textChanged) {
                owner._onPropertyChangedFromNative(text_base_1.TextBase.textProperty, owner.FormattedText);
            }
            owner.dismissSoftInput();
            owner._refreshHintState(owner.hint, textView.text);
            owner.ios.text = owner.FormattedText;
        }
    };
    MaskedInputDelegateImpl.prototype.textViewShouldChangeTextInRangeReplacementText = function (textView, range, replacementText) {
        var owner = this._owner.get();
        if (owner) {
            var newChar = replacementText.toString();
            if (range.length === 0) {
                if (owner.testCharAtIndex(newChar, range.location)) {
                    owner.replacePlaceholder(range.location, newChar);
                }
                else {
                    return false;
                }
            }
            else {
                owner.replacePlaceholder(range.location, owner.placeholder);
            }
        }
        return true;
    };
    MaskedInputDelegateImpl.prototype.textViewDidChange = function (textView) {
        var owner = this._owner.get();
        if (owner) {
            var s = textView.text.toString();
            var newChar = s.charAt(this.nextIdx);
            textView.text = owner.stringBuilder;
            this.setCursor(textView);
            owner.setInputTypeBasedOnMask();
            textView.reloadInputViews();
            this.prevString = textView.text.toString();
            var range = textView.selectedRange;
            textView.selectedRange = range;
            if (owner.updateTextTrigger === enums_1.UpdateTextTrigger.textChanged) {
                owner._onPropertyChangedFromNative(text_base_1.TextBase.textProperty, textView.text);
            }
        }
    };
    MaskedInputDelegateImpl.ObjCProtocols = [UITextViewDelegate];
    return MaskedInputDelegateImpl;
}(NSObject));
var MaskedInput = (function (_super) {
    __extends(MaskedInput, _super);
    function MaskedInput() {
        _super.call(this);
        this._ios = new UITextView();
        if (!this._ios.font) {
            this._ios.font = UIFont.systemFontOfSize(12);
        }
        this._delegate = MaskedInputDelegateImpl.initWithOwner(new WeakRef(this));
    }
    MaskedInput.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._delegate;
        this.buildRegEx();
    };
    MaskedInput.prototype.onUnloaded = function () {
        this._ios.delegate = null;
        _super.prototype.onUnloaded.call(this);
    };
    Object.defineProperty(MaskedInput.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    MaskedInput.prototype._onEditablePropertyChanged = function (data) {
        this._ios.editable = data.newValue;
    };
    MaskedInput.prototype._onHintPropertyChanged = function (data) {
        this._refreshHintState(data.newValue, this.text);
    };
    MaskedInput.prototype._onTextPropertyChanged = function (data) {
        var s = data.newValue.toString();
        var sbIdx = 0;
        if (s.length > 0) {
            for (var i = 0; i < s.length; i++) {
                if (this.testCharAtIndex(s.charAt(i), sbIdx)) {
                    this.replacePlaceholder(sbIdx, s.charAt(i));
                    sbIdx++;
                }
                else {
                    var nextIdx = this.findIndex();
                    if (this.testCharAtIndex(s.charAt(i), nextIdx)) {
                        this.replacePlaceholder(nextIdx, s.charAt(i));
                        sbIdx = nextIdx + 1;
                    }
                }
            }
            this._onPropertyChangedFromNative(text_base_1.TextBase.textProperty, this.FormattedText);
        }
    };
    MaskedInput.prototype._refreshHintState = function (hint, text) {
        if (hint && !text) {
            this._showHint(hint);
        }
        else {
            this._hideHint();
        }
    };
    MaskedInput.prototype._showHint = function (hint) {
        this.ios.textColor = this.ios.textColor ? this.ios.textColor.colorWithAlphaComponent(0.22) : UIColor.blackColor.colorWithAlphaComponent(0.22);
        this.ios.text = types_1.isNullOrUndefined(hint) ? "" : hint + "";
        this.ios.isShowingHint = true;
    };
    MaskedInput.prototype._hideHint = function () {
        this.ios.textColor = this.color ? this.color.ios : null;
        this.ios.text = types_1.isNullOrUndefined(this.FormattedText) ? "" : this.FormattedText + "";
        this.ios.isShowingHint = false;
    };
    return MaskedInput;
}(common.MaskedInput));
exports.MaskedInput = MaskedInput;
//# sourceMappingURL=maskedinput.ios.js.map