"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("utils/types");
var imageAssetModule = require("image-asset");
var trace = require("trace");
var UIImagePickerControllerDelegateImpl = (function (_super) {
    __extends(UIImagePickerControllerDelegateImpl, _super);
    function UIImagePickerControllerDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIImagePickerControllerDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    UIImagePickerControllerDelegateImpl.prototype.initWithCallback = function (callback) {
        this._callback = callback;
        return this;
    };
    UIImagePickerControllerDelegateImpl.prototype.initWithCallbackAndOptions = function (callback, options) {
        this._callback = callback;
        if (options) {
            this._width = options.width;
            this._height = options.height;
            this._saveToGallery = options.saveToGallery;
            this._keepAspectRatio = types.isNullOrUndefined(options.keepAspectRatio) ? true : options.keepAspectRatio;
        }
        return this;
    };
    UIImagePickerControllerDelegateImpl.prototype.createDateFromString = function (value) {
        var year = parseInt(value.substr(0, 4));
        var month = parseInt(value.substr(5, 2));
        var date = parseInt(value.substr(8, 2));
        var hour = parseInt(value.substr(11, 2));
        var minutes = parseInt(value.substr(14, 2));
        var seconds = parseInt(value.substr(17, 2));
        return new Date(year, month - 1, date, hour, minutes, seconds);
    };
    UIImagePickerControllerDelegateImpl.prototype.imagePickerControllerDidFinishPickingMediaWithInfo = function (picker, info) {
        var _this = this;
        if (info) {
            var creationDate_1 = new Date();
            var picInfo = info.valueForKey(UIImagePickerControllerMediaMetadata);
            if (picInfo) {
                var tiff = picInfo.valueForKey("{TIFF}");
                if (tiff) {
                    var creationDateStr = tiff.valueForKey("DateTime");
                    creationDate_1 = this.createDateFromString(creationDateStr);
                }
            }
            var source = info.valueForKey(UIImagePickerControllerOriginalImage);
            if (source) {
                var image = null;
                var imageSource = require("image-source");
                var imageSourceResult_1 = imageSource.fromNativeSource(source);
                if (this._callback) {
                    var imageAsset_1;
                    if (this._saveToGallery) {
                        PHPhotoLibrary.sharedPhotoLibrary().performChangesCompletionHandler(function () { PHAssetChangeRequest.creationRequestForAssetFromImage(imageSourceResult_1.ios); }, function (success, err) {
                            if (success) {
                                var fetchOptions = PHFetchOptions.alloc().init();
                                var sortDescriptors = NSArray.arrayWithObject(NSSortDescriptor.sortDescriptorWithKeyAscending("creationDate", false));
                                fetchOptions.sortDescriptors = sortDescriptors;
                                fetchOptions.predicate = NSPredicate.predicateWithFormatArgumentArray("mediaType = %d", NSArray.arrayWithObject(PHAssetMediaType.Image));
                                var fetchResult = PHAsset.fetchAssetsWithOptions(fetchOptions);
                                for (var i = 0; i < fetchResult.count; i++) {
                                    if (creationDate_1.valueOf() < fetchResult[i].creationDate.valueOf()) {
                                        var asset = fetchResult[i];
                                        imageAsset_1 = new imageAssetModule.ImageAsset(asset);
                                        break;
                                    }
                                }
                                _this.setImageAssetAndCallCallback(imageAsset_1);
                            }
                            else {
                                trace.write("An error ocured while saving image to gallery: " + err, trace.categories.Error, trace.messageType.error);
                            }
                        });
                    }
                    else {
                        imageAsset_1 = new imageAssetModule.ImageAsset(imageSourceResult_1.ios);
                        this.setImageAssetAndCallCallback(imageAsset_1);
                    }
                }
            }
        }
        picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
        listener = null;
    };
    UIImagePickerControllerDelegateImpl.prototype.setImageAssetAndCallCallback = function (imageAsset) {
        imageAsset.options = {
            width: this._width,
            height: this._height,
            keepAspectRatio: this._keepAspectRatio
        };
        this._callback(imageAsset);
    };
    UIImagePickerControllerDelegateImpl.prototype.imagePickerControllerDidCancel = function (picker) {
        picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
        listener = null;
    };
    return UIImagePickerControllerDelegateImpl;
}(NSObject));
UIImagePickerControllerDelegateImpl.ObjCProtocols = [UIImagePickerControllerDelegate];
var listener;
exports.takePicture = function (options) {
    return new Promise(function (resolve, reject) {
        listener = null;
        var imagePickerController = UIImagePickerController.new();
        var reqWidth = 0;
        var reqHeight = 0;
        var keepAspectRatio = true;
        var saveToGallery = true;
        if (options) {
            reqWidth = options.width || 0;
            reqHeight = options.height || reqWidth;
            keepAspectRatio = types.isNullOrUndefined(options.keepAspectRatio) ? true : options.keepAspectRatio;
            saveToGallery = options.saveToGallery ? true : false;
        }
        var authStatus = PHPhotoLibrary.authorizationStatus();
        if (authStatus !== PHAuthorizationStatus.Authorized) {
            saveToGallery = false;
        }
        if (reqWidth && reqHeight) {
            listener = UIImagePickerControllerDelegateImpl.new().initWithCallbackAndOptions(resolve, { width: reqWidth, height: reqHeight, keepAspectRatio: keepAspectRatio, saveToGallery: saveToGallery });
        }
        else if (saveToGallery) {
            listener = UIImagePickerControllerDelegateImpl.new().initWithCallbackAndOptions(resolve, { saveToGallery: saveToGallery, keepAspectRatio: keepAspectRatio });
        }
        else {
            listener = UIImagePickerControllerDelegateImpl.new().initWithCallback(resolve);
        }
        imagePickerController.delegate = listener;
        var sourceType = UIImagePickerControllerSourceType.Camera;
        var mediaTypes = UIImagePickerController.availableMediaTypesForSourceType(sourceType);
        if (mediaTypes) {
            imagePickerController.mediaTypes = mediaTypes;
            imagePickerController.sourceType = sourceType;
        }
        imagePickerController.modalPresentationStyle = UIModalPresentationStyle.CurrentContext;
        var frame = require("ui/frame");
        var topMostFrame = frame.topmost();
        if (topMostFrame) {
            var viewController = topMostFrame.currentPage && topMostFrame.currentPage.ios;
            if (viewController) {
                viewController.presentViewControllerAnimatedCompletion(imagePickerController, true, null);
            }
        }
    });
};
exports.isAvailable = function () {
    return UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.Camera);
};
exports.requestPermissions = function () {
    var authStatus = PHPhotoLibrary.authorizationStatus();
    if (authStatus === PHAuthorizationStatus.NotDetermined) {
        PHPhotoLibrary.requestAuthorization(function (auth) {
            if (auth === PHAuthorizationStatus.Authorized) {
                if (trace.isEnabled()) {
                    trace.write("Application can access photo library assets.", trace.categories.Debug);
                }
                return;
            }
        });
    }
    else if (authStatus !== PHAuthorizationStatus.Authorized) {
        if (trace.isEnabled()) {
            trace.write("Application can not access photo library assets.", trace.categories.Debug);
        }
    }
};
