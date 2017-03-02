var viewModule = require("ui/core/view");
var commonModule = require("./autocomplete-common");
var utilsModule = require("utils/utils");
var builder = require("ui/builder");
var imageModule = require("ui/image");
require("utils/module-merge").merge(commonModule, exports);
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.suggestionItemTemplate = "suggestionItemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var SuggestionView = (function (_super) {
    __extends(SuggestionView, _super);
    function SuggestionView(parent) {
        _super.call(this);
    }
    Object.defineProperty(SuggestionView.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    SuggestionView.prototype.onSuggestionViewHeightChanged = function (data) {
        this._ios.suggestionViewHeight = data.newValue;
    };
    SuggestionView.prototype.onSuggestionItemTemplateChanged = function (data) {
        this._ios.suggestionViewHeight = data.newValue;
    };
    return SuggestionView;
}(commonModule.SuggestionView));
exports.SuggestionView = SuggestionView;
var SuggestionViewCell = (function (_super) {
    __extends(SuggestionViewCell, _super);
    function SuggestionViewCell() {
        _super.apply(this, arguments);
    }
    SuggestionViewCell.new = function () {
        var instance = _super.new.call(this);
        return instance;
    };
    SuggestionViewCell.class = function () {
        return SuggestionViewCell;
    };
    SuggestionViewCell.prototype.systemLayoutSizeFittingSize = function (targetSize) {
        var dimensions = this.layoutCell(this, undefined);
        var size = new CGSize();
        size.width = dimensions.measuredWidth;
        size.height = dimensions.measuredHeight;
        return size;
    };
    SuggestionViewCell.prototype.layoutCell = function (cell, indexPath) {
        var itemViewDimensions = this.measureCell(this.view.itemView, indexPath);
        var cellView = this.view.itemView;
        viewModule.View.layoutChild(this.owner, cellView, 0, 0, itemViewDimensions.measuredWidth, itemViewDimensions.measuredHeight);
        return itemViewDimensions;
    };
    SuggestionViewCell.prototype.measureCell = function (cellView, sizeRestriction) {
        if (cellView) {
            var itemWidth = this.owner.getMeasuredWidth();
            var itemHeight = undefined;
            if (sizeRestriction !== undefined) {
                itemWidth = sizeRestriction.width;
                itemHeight = sizeRestriction.height;
            }
            var heightSpec, widthSpec;
            if (itemHeight === undefined) {
                heightSpec = utilsModule.layout.makeMeasureSpec(0, utilsModule.layout.UNSPECIFIED);
            }
            else {
                heightSpec = utilsModule.layout.makeMeasureSpec(itemHeight, utilsModule.layout.EXACTLY);
            }
            widthSpec = utilsModule.layout.makeMeasureSpec(itemWidth, utilsModule.layout.EXACTLY);
            return viewModule.View.measureChild(this.owner, cellView, widthSpec, heightSpec);
        }
        return undefined;
    };
    return SuggestionViewCell;
}(TKListViewCell));
var TokenModel = (function (_super) {
    __extends(TokenModel, _super);
    function TokenModel(text, image) {
        _super.call(this, text, image);
        this._ios = new TKAutoCompleteToken(NSString.stringWithCString(text));
        if (image) {
            if (image.startsWith("res://")) {
                var name = image.substring(6, image.length);
                this._ios.image = UIImage.imageNamed(name);
            }
            else {
                this._ios.image = UIImage.imageNamed(image);
            }
        }
    }
    Object.defineProperty(TokenModel.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return TokenModel;
}(commonModule.TokenModel));
exports.TokenModel = TokenModel;
var CompletionModeImpl = (function (_super) {
    __extends(CompletionModeImpl, _super);
    function CompletionModeImpl() {
        _super.apply(this, arguments);
    }
    CompletionModeImpl.new = function () {
        return _super.new.call(this);
    };
    ;
    CompletionModeImpl.StartsWith = function (input, suggestions, owner) {
        var result = new NSMutableArray(suggestions.length);
        var nsResult = new Array();
        for (var i = 0; i < suggestions.length; i++) {
            var current = suggestions.getItem(i);
            var upperCase = current.ios.text.toUpperCase();
            if (upperCase['startsWith'](input.toUpperCase())) {
                result.addObject(current.ios);
                nsResult.push(current);
            }
        }
        owner.filteredItems = nsResult;
        return result;
    };
    CompletionModeImpl.Contains = function (input, suggestions, owner) {
        var result = new NSMutableArray(suggestions.length);
        var nsResult = new Array();
        for (var i = 0; i < suggestions.length; i++) {
            var current = suggestions.getItem(i);
            var upperCase = current.ios.text.toUpperCase();
            if (upperCase.indexOf(input.toUpperCase()) != -1) {
                result.addObject(current.ios);
                nsResult.push(current);
            }
        }
        owner.filteredItems = nsResult;
        return result;
    };
    return CompletionModeImpl;
}(NSObject));
//suggestion view data source
var SuggestionViewDataSourceImpl = (function (_super) {
    __extends(SuggestionViewDataSourceImpl, _super);
    function SuggestionViewDataSourceImpl() {
        _super.apply(this, arguments);
    }
    SuggestionViewDataSourceImpl.new = function () {
        return _super.new.call(this);
    };
    SuggestionViewDataSourceImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    SuggestionViewDataSourceImpl.prototype.listViewNumberOfItemsInSection = function (listView, section) {
        return this._owner.suggestionView.ios.items ? this._owner.suggestionView.ios.items.count : 0; //todo: update to support custom DataSource object from owner
    };
    SuggestionViewDataSourceImpl.prototype.listViewCellForItemAtIndexPath = function (listView, indexPath) {
        var cell = listView.dequeueReusableCellWithReuseIdentifierForIndexPath("defaultCell", indexPath);
        if (!cell.owner) {
            cell.backgroundView.stroke = null;
            cell.selectedBackgroundView.stroke = null;
            cell.offsetContentViewInMultipleSelection = false;
            cell.owner = this._owner;
            var template = new Object();
            template.itemView = builder.parse(this._owner.suggestionView.suggestionItemTemplate, undefined);
            cell.view = template;
            cell.contentView.addSubview(template.itemView.ios);
        }
        cell.view.itemView.bindingContext = this._owner.filteredItems[indexPath.row];
        return cell;
    };
    SuggestionViewDataSourceImpl.prototype.numberOfSectionsInListView = function (listView) {
        return 1;
    };
    SuggestionViewDataSourceImpl.ObjCProtocols = [TKListViewDataSource];
    return SuggestionViewDataSourceImpl;
}(NSObject));
var AutoCompleteAsyncDataSourceImpl = (function (_super) {
    __extends(AutoCompleteAsyncDataSourceImpl, _super);
    function AutoCompleteAsyncDataSourceImpl() {
        _super.apply(this, arguments);
        this.currentCompletionMode = CompletionModeImpl.StartsWith;
    }
    AutoCompleteAsyncDataSourceImpl.new = function () {
        return _super.new.call(this);
    };
    AutoCompleteAsyncDataSourceImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    AutoCompleteAsyncDataSourceImpl.prototype.autoCompleteCompletionsForString = function (autocomplete, input) {
        var self = this;
        this._owner.asyncCall(input).then(function (items) {
            var result = NSMutableArray.new();
            var nsResult = new Array();
            if (self._owner.completionMode == commonModule.CompletionMode.StartsWith) {
                for (var i = 0; i < items.length; i++) {
                    var current = items[i];
                    var upperCase = current.ios.text.toUpperCase();
                    if (upperCase.startsWith(input.toUpperCase())) {
                        result.addObject(current.ios);
                        nsResult.push(current);
                    }
                }
            }
            else {
                for (var i = 0; i < items.length; i++) {
                    var current = items[i];
                    var upperCase = current.ios.text.toUpperCase();
                    if (upperCase.indexOf(input.toUpperCase()) != -1) {
                        result.addObject(current.ios);
                        nsResult.push(current);
                    }
                }
            }
            self._owner.filteredItems = nsResult;
            self._owner.ios.completeSuggestionViewPopulation(result);
        });
    };
    AutoCompleteAsyncDataSourceImpl.ObjCProtocols = [TKAutoCompleteDataSource];
    return AutoCompleteAsyncDataSourceImpl;
}(NSObject));
// AutoCompleteDataSource
var AutoCompleteDataSourceImpl = (function (_super) {
    __extends(AutoCompleteDataSourceImpl, _super);
    function AutoCompleteDataSourceImpl() {
        _super.apply(this, arguments);
        this.currentCompletionMode = CompletionModeImpl.StartsWith;
    }
    AutoCompleteDataSourceImpl.new = function () {
        return _super.new.call(this);
    };
    AutoCompleteDataSourceImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    AutoCompleteDataSourceImpl.prototype.autoCompleteCompletionForPrefix = function (autocomplete, prefix) {
        var suggestions = new NSMutableArray({ capacity: 0 });
        if (prefix == "") {
            this._owner.ios.suggestionView.hide();
            return suggestions;
        }
        else {
            return this.currentCompletionMode(prefix, this._owner.items, this._owner);
        }
    };
    AutoCompleteDataSourceImpl.ObjCProtocols = [TKAutoCompleteDataSource];
    return AutoCompleteDataSourceImpl;
}(NSObject));
//AutoCompleteDelagate
var AutoCompleteDelegateImpl = (function (_super) {
    __extends(AutoCompleteDelegateImpl, _super);
    function AutoCompleteDelegateImpl() {
        _super.apply(this, arguments);
    }
    AutoCompleteDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    AutoCompleteDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        this._firstInput = true;
        return this;
    };
    AutoCompleteDelegateImpl.prototype.autoCompleteWillShowSuggestionList = function (autocomplete, suggestionList) {
        var args = new commonModule.AutoCompleteEventData(commonModule.RadAutoCompleteTextView.suggestionViewBecameVisibleEvent, autocomplete, suggestionList);
        this._owner.notify(args);
    };
    AutoCompleteDelegateImpl.prototype.autoCompleteDidAddToken = function (autocomplete, token) {
        var args = new commonModule.AutoCompleteEventData(commonModule.RadAutoCompleteTextView.tokenAddedEvent, autocomplete, token);
        this._owner.notify(args);
    };
    AutoCompleteDelegateImpl.prototype.autoCompleteDidRemoveToken = function (autocomplete, token) {
        var args = new commonModule.AutoCompleteEventData(commonModule.RadAutoCompleteTextView.tokenRemovedEvent, autocomplete, token);
        this._owner.notify(args);
    };
    AutoCompleteDelegateImpl.prototype.autoCompleteDidSelectToken = function (autocomplete, token) {
        var args = new commonModule.AutoCompleteEventData(commonModule.RadAutoCompleteTextView.tokenSelectedEvent, autocomplete, token);
        this._owner.notify(args);
    };
    AutoCompleteDelegateImpl.ObjCProtocols = [TKAutoCompleteDelegate];
    return AutoCompleteDelegateImpl;
}(NSObject));
var RadAutoCompleteTextView = (function (_super) {
    __extends(RadAutoCompleteTextView, _super);
    function RadAutoCompleteTextView() {
        _super.call(this);
        this.filteredItems = new Array();
        this._ios = TKAutoCompleteTextView.new();
        this._ios.minimumCharactersToSearch = 1;
        this._dataSource = AutoCompleteDataSourceImpl.new().initWithOwner(this);
        this._dataSource.currentCompletionMode = CompletionModeImpl.StartsWith;
        this._ios.suggestionView.registerClassForCellWithReuseIdentifier(SuggestionViewCell.class(), "defaultCell");
        this._suggestionViewDataSource = SuggestionViewDataSourceImpl.new().initWithOwner(this);
        this._ios.suggestionView.dataSource = this._suggestionViewDataSource;
        this._ios.dataSource = this._dataSource;
        this._delegate = AutoCompleteDelegateImpl.new().initWithOwner(this);
        this._ios.delegate = this._delegate;
    }
    Object.defineProperty(RadAutoCompleteTextView.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadAutoCompleteTextView.prototype.resetAutocomplete = function () {
        this._ios.resetAutocompleteState();
    };
    RadAutoCompleteTextView.prototype.addToken = function (token) {
        var native = new TKAutoCompleteToken(NSString.stringWithCString(token.text));
        this._ios.addToken(native);
    };
    RadAutoCompleteTextView.prototype.insertTokenAtIndex = function (token, index) {
        var native = new TKAutoCompleteToken(NSString.stringWithCString(token.text));
        this._ios.insertTokenAtIndex(native, index);
    };
    RadAutoCompleteTextView.prototype.removeToken = function (token) {
        var native = new TKAutoCompleteToken(NSString.stringWithCString(token.text));
        this._ios.removeToken(native);
    };
    RadAutoCompleteTextView.prototype.removeTokenAtIndex = function (index) {
        this._ios.removeTokenAtIndex(index);
    };
    RadAutoCompleteTextView.prototype.removeAllTokens = function () {
        this._ios.removeAllTokens();
    };
    RadAutoCompleteTextView.prototype.tokens = function () {
        return this._ios.tokens;
    };
    RadAutoCompleteTextView.prototype.tokenAtIndex = function (index) {
        return this._ios.tokenAtIndex(index);
    };
    RadAutoCompleteTextView.prototype.onDisplayModeChanged = function (data) {
        this.adjustDisplayMode(data.newValue);
    };
    RadAutoCompleteTextView.prototype.onLayoutModeChanged = function (data) {
        this.adjustLayoutMode(data.newValue);
    };
    RadAutoCompleteTextView.prototype.onSuggestModeChanged = function (data) {
        this.adjustSuggestMode(data.newValue);
    };
    RadAutoCompleteTextView.prototype.onLoadSuggestionsAsyncChanged = function (data) {
        this.asyncCall = data.newValue;
        this._dataSource = AutoCompleteAsyncDataSourceImpl.new().initWithOwner(this);
        this._dataSource.currentCompletionMode = CompletionModeImpl.StartsWith;
        this._ios.dataSource = this._dataSource;
    };
    RadAutoCompleteTextView.prototype.onCompletionModeChanged = function (data) {
        this.adjustCompletionMode(data.newValue);
    };
    RadAutoCompleteTextView.prototype.onSuggestionViewChanged = function (data) {
        var suggestionView = data.newValue;
        suggestionView.ios = this._ios.suggestionView;
        this._ios.suggestionViewHeight = suggestionView.suggestionViewHeight;
        this._ios.suggestionView.reloadData();
    };
    RadAutoCompleteTextView.prototype.onMinimumCharactersToSearchChanged = function (data) {
        this._ios.minimumCharactersToSearch = data.newValue;
    };
    RadAutoCompleteTextView.prototype.onShowCloseButtonChanged = function (data) {
        this.updateCloseButton();
    };
    RadAutoCompleteTextView.prototype.onCloseButtonImageSrcChanged = function (data) {
        this.updateCloseButton();
    };
    RadAutoCompleteTextView.prototype.updateCloseButton = function () {
        if (!this.closeButtonImageSrc && this.showCloseButton) {
            return;
        }
        var image = new imageModule.Image();
        image.src = this.closeButtonImageSrc;
        if (image) {
            this.ios.closeButton.setImageForState(image.ios.image, 0 /* Normal */);
        }
    };
    RadAutoCompleteTextView.prototype.adjustCompletionMode = function (value) {
        if (this._ios && value) {
            if (value == commonModule.CompletionMode.StartsWith) {
                this._dataSource.currentCompletionMode = CompletionModeImpl.StartsWith;
            }
            else {
                this._dataSource.currentCompletionMode = CompletionModeImpl.Contains;
            }
        }
    };
    RadAutoCompleteTextView.prototype.adjustDisplayMode = function (value) {
        if (this._ios && value) {
            this._ios.displayMode = (value === commonModule.DisplayMode.Plain) ?
                0 /* Plain */ :
                1 /* Tokens */;
        }
    };
    RadAutoCompleteTextView.prototype.adjustSuggestMode = function (value) {
        if (this._ios && value) {
            if (value == commonModule.SuggestMode.Suggest) {
                this.ios.suggestMode = 0 /* Suggest */;
            }
            else if (value == commonModule.SuggestMode.Append) {
                this.ios.suggestMode = 1 /* Append */;
            }
            else {
                this.ios.suggestMode = 2 /* SuggestAppend */;
            }
        }
    };
    RadAutoCompleteTextView.prototype.adjustLayoutMode = function (value) {
        if (value && this._ios) {
            this._ios.layoutMode = (value === commonModule.LayoutMode.Horizontal) ?
                0 /* Horizontal */ :
                1 /* Wrap */;
        }
    };
    return RadAutoCompleteTextView;
}(commonModule.RadAutoCompleteTextView));
exports.RadAutoCompleteTextView = RadAutoCompleteTextView;
//# sourceMappingURL=autocomplete.js.map