import * as fs from "file-system";
import * as trace from "trace";
import * as frame from "ui/frame";
import * as types from "utils/types";

import { Color } from "color";

declare interface UIViewController {
    presentViewControllerAnimatedCompletion(a, b, c);

}

declare interface UIImagePickerController {
    presentingViewController;
    dismissViewControllerAnimatedCompletion(a, b);
}

declare interface UIImagePickerControllerDelegate {

}
declare interface NSDictionary<K, V> {
    objectForKey(k: K): V;
}

declare class NSObject {
}

declare var NSURL;
declare var AVAsset;
declare var kUTTypeMovie;
declare var PHPhotoLibrary;
declare var ALAssetsLibrary;
declare var AVFileTypeMPEG4;
declare var UIViewController;
declare var AVAssetExportSession;
declare var PHAuthorizationStatus;
declare var UIImagePickerController;
declare var UIModalPresentationStyle;
declare var AVAssetExportPresetLowQuality
declare var UIImagePickerControllerMediaURL;
declare var UIImagePickerControllerDelegate;
declare var AVAssetExportPresetHighestQuality;
declare var UIImagePickerControllerSourceType;
declare var UIImagePickerControllerQualityType;
declare var UIImagePickerControllerCameraCaptureMode;

let listener;

export type VideoFormat = "default" | "mp4";


export class VideoRecorderOptions {
    // public duration?: number;
    // public videoFormat?: VideoFormat;

    // public hd: boolean;
    // public saveToGallery: boolean;
}

export class VideoRecorder {
    async record(): Promise<any> {
        return new Promise((resolve, reject) => {
            debugger;
            listener = null;

            let picker = UIImagePickerController.new();
            let sourceType = UIImagePickerControllerSourceType.Camera;

            picker.sourceType = sourceType;
            picker.mediaTypes = [kUTTypeMovie];

            // options.hd = Boolean(options.hd) ? true : false;
            // options.saveToGallery = Boolean(options.saveToGallery) ? true : false;

            picker.allowsEditing = false;
            picker.cameraCaptureMode = UIImagePickerControllerCameraCaptureMode.Video;
            picker.videoQuality = UIImagePickerControllerQualityType.TypeHigh; // options.hd ? UIImagePickerControllerQualityType.TypeHigh : UIImagePickerControllerQualityType.TypeLow;
            picker.videoMaximumDuration = Number.POSITIVE_INFINITY; // types.isNumber(options.duration) ? Number(options.duration) : Number.POSITIVE_INFINITY;

            // if (options && options.saveToGallery) {
            //     let authStatus = PHPhotoLibrary.authorizationStatus();

            //     if (authStatus === PHAuthorizationStatus.Authorized) {
            //         options.saveToGallery = true;
            //     }
            // }

            // if (options) {
            //     listener = UIImagePickerControllerDelegateImpl.initWithOwnerCallbackOptions(new WeakRef(this), resolve, options);
            // } else {
            listener = UIImagePickerControllerDelegateImpl.initWithCallback(resolve);
            // }

            picker.delegate = listener;
            picker.modalPresentationStyle = UIModalPresentationStyle.CurrentContext;


            let topMostFrame = frame.topmost();

            if (topMostFrame) {
                let viewController: UIViewController = topMostFrame.currentPage && topMostFrame.currentPage.ios;

                if (viewController) {
                    viewController.presentViewControllerAnimatedCompletion(picker, false, null);
                    let res2 = picker.startVideoCapture();
                }
            }
        });
    }
}


class UIImagePickerControllerDelegateImpl extends NSObject implements UIImagePickerControllerDelegate {
    public static ObjCProtocols = [UIImagePickerControllerDelegate];
    
    // private hd: boolean;
    // private saveToGallery: boolean;
    private callback: (result?) => void;
    // private format: VideoFormat = "default";

    public static initWithCallback(callback: (result?) => void): UIImagePickerControllerDelegateImpl {
        debugger;
        let delegate = new UIImagePickerControllerDelegateImpl();
        delegate.callback = callback;
        return delegate;
    }

    // public static initWithOwnerCallbackOptions(owner: WeakRef<VideoRecorder>, callback: (result?) => void, options?: VideoRecorderOptions): UIImagePickerControllerDelegateImpl {
    //     debugger;

    //     let delegate = new UIImagePickerControllerDelegateImpl();

    //     // if (options) {
    //     //     delegate.hd = options.hd;
    //     //     delegate.saveToGallery = options.saveToGallery;
    //     //     // delegate.format = options.videoFormat;
    //     // }

    //     delegate.callback = callback;

    //     return delegate;
    // }

    imagePickerControllerDidCancel(picker: UIImagePickerController) {
        picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
        listener = null;
    }

    imagePickerControllerDidFinishPickingMediaWithInfo(picker: UIImagePickerController, info: NSDictionary<string, any>) {
        debugger;
        if (info) {
            // let currentDate: Date = new Date();

            // if (this.saveToGallery) {
            //     let source = info.objectForKey(UIImagePickerControllerMediaURL);

            //     if (this.format === "mp4") {
            //         let asset = AVAsset.assetWithURL(source);
            //         let preset = this.hd ? AVAssetExportPresetHighestQuality : AVAssetExportPresetLowQuality;
            //         let session = AVAssetExportSession.exportSessionWithAssetPresetName(asset, preset);
            //         session.outputFileType = AVFileTypeMPEG4;
            //         let fileName = `videoCapture_${ +new Date() }.mp4`;
            //         let path = fs.path.join(fs.knownFolders.documents().path, fileName);
            //         let nativePath = NSURL.fileURLWithPath(path);
            //         session.outputURL = nativePath;
            //         session.exportAsynchronouslyWithCompletionHandler(() => {
            //             let assetLibrary = ALAssetsLibrary.alloc().init();
            //             assetLibrary.writeVideoAtPathToSavedPhotosAlbumCompletionBlock(nativePath, (file, error) => {
            //                 if (!error) {
            //                     this.callback();
            //                 }
            //                 fs.File.fromPath(path).remove();
            //             });
            //         });

            //     } else {
            //         let assetLibrary = ALAssetsLibrary.alloc().init();
            //         assetLibrary.writeVideoAtPathToSavedPhotosAlbumCompletionBlock(source, (file, error) => {
            //             if (!error) {
            //                 this.callback();
            //             } else {
            //                 console.log(error.localizedDescription);
            //             }
            //             //fs.File.fromPath(source.path).remove();
            //         });
            //     }
            // } else {
            let source = info.objectForKey(UIImagePickerControllerMediaURL);

            // if (this.format === "mp4") {
            //     let asset = AVAsset.assetWithURL(source);
            //     let preset = this.hd ? AVAssetExportPresetHighestQuality : AVAssetExportPresetLowQuality;
            //     let session = AVAssetExportSession.exportSessionWithAssetPresetName(asset, preset);
            //     session.outputFileType = AVFileTypeMPEG4;
            //     let fileName = `videoCapture_${ +new Date() }.mp4`;
            //     let path = fs.path.join(fs.knownFolders.documents().path, fileName);
            //     let nativePath = NSURL.fileURLWithPath(path);
            //     session.outputURL = nativePath;
            //     session.exportAsynchronouslyWithCompletionHandler(() => {
            //         fs.File.fromPath(source.path).remove();
            //         this.callback({ file: path });
            //     });
            // } else {
            this.callback({ file: source.path });
            // }
            // }
            picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);

            listener = null;
        }
    };
}

export var requestPermissions = function () {
    let authStatus = PHPhotoLibrary.authorizationStatus();
    if (authStatus === PHAuthorizationStatus.NotDetermined) {
        PHPhotoLibrary.requestAuthorization((auth) => {
            if (auth === PHAuthorizationStatus.Authorized) {
                trace.write("Application can access photo library assets.", trace.categories.Debug);
                return;
            }
        })
    } else if (authStatus !== PHAuthorizationStatus.Authorized) {
        trace.write("Application can not access photo library assets.", trace.categories.Debug);
    }
}
