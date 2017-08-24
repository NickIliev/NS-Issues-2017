// link to camera example code weritten in java and used in this sample
// https://github.com/googlesamples/android-Camera2Basic/blob/master/Application/src/main/java/com/example/android/camera2basic/Camera2BasicFragment.java#L323

// link to example iOS native camera in Nativescript code used in this sample
// https://github.com/NativeScript/sample-iOS-CameraApp

var app = require('application');
// var fs = require('file-system');
// var frameModule = require('ui/frame');
// var permissions = require('nativescript-permissions');
// var photoModule = require('~/modules/photo');
// var formModule = require('~/modules/form');
// var storage = require('~/modules/storage');
// // var imageStamp = require('~/modules/image-stamp/image-stamp');

// var view = require("ui/core/view");

// // for android camera2
// var mCameraId;
// var mCameraManager;             // camera2.CameraManager            
// var mCameraDevice;              // camera2.Cameradevice
// var mTextureView;               // android.view.TextureView
// var mFlashSupported;
// var MAX_PREVIEW_WIDTH = 1920;   // maz preview width guarenteed by Camera2 API
// var MAX_PREVIEW_HEIGHT = 1080;  // maz preview HEIGHT guarenteed by Camera2 API
// var mPreviewSize;               // Size object

// var mCaptureSession;            // CameraCaptureSession    
// var mBackgroundHandler = null;  // Handler
// var mCameraOpenCloseLock = new java.util.concurrent.Semaphore(1);
// var mCaptureRequestBuilder;     // Capturerequest.Builder
// var mImageReader;
// var mAppContext;

// var mPhotoName;
// var mInspectionId;
// var mform;
// var mPhotoBucket;
// var mLocation;

// var ORIENTATION = [];
// var mPage;


function onLoaded(args) {
    // mPage = args.object;
    // ORIENTATION[android.view.Surface.ROTATION_0] = 90;
    // ORIENTATION[android.view.Surface.ROTATION_90] = 0;
    // ORIENTATION[android.view.Surface.ROTATION_180] = 270;
    // ORIENTATION[android.view.Surface.ROTATION_270] = 180;
    // if (args.object.navigationContext) {
    //     mPhotoName = args.object.navigationContext.PhotoName;
    //     mInspectionId = args.object.navigationContext.InspectionId;
    //     mform = args.object.navigationContext.Form;
    //     mLocation = args.object.navigationContext.Location;
    //     if (mform) {
    //         for (var i = 0; i < mform.PhotoBuckets.length; i++) {
    //             var pb = mform.PhotoBuckets.getItem(i);
    //             if (pb.Name == mPhotoName) {
    //                 mPhotoBucket = pb;
    //                 break;
    //             }
    //         }
    //     }
    // }
}
exports.onLoaded = onLoaded;

// function onTakeShot(args) {
//     takePicture();
// }
// exports.onTakeShot = onTakeShot;

function onTapFlash(args) {
    /*if (mCameraManager != null && mCameraId != null) {
        if (mCameraManager.getCameraCharacteristics(mCameraId).get(android.hardware.camera2.CameraCharacteristics.FLASH_INFO_AVAILABLE)) {
            let torchMode = new java.lang.Boolean("true");
            mCameraManager.setTorchMode(mCameraId, torchMode);
        }
        //var flashCtr = view.getViewById(mPage,"flashCtr");
        console.log("Turn on camera!");

    }*/

var hasFlash = app.android.context.getPackageManager().hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA_FLASH);
console.log(hasFlash);

    if (hasFlash) {
        if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.M){ 
            var camManager = app.android.context.getSystemService(android.content.Context.CAMERA_SERVICE);
            var cameraId = camManager.getCameraIdList()[0]; // Usually front camera is at 0 position. 

            try {
                camManager.setTorchMode(cameraId, true);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("API Level does not support android.hardware.camera2")
        }

    } else {
        console.log("No flash");
    }

    
}
exports.onTapFlash = onTapFlash;

// function takePicture() {
//     if (mCameraDevice == null || mCameraManager == null)
//         return;
//     try {
//         var currentCameraSpecs = mCameraManager.getCameraCharacteristics(mCameraId);

//         var map = currentCameraSpecs.get(android.hardware.camera2.CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
//         var format = map.getOutputSizes(android.graphics.ImageFormat.JPEG);
//         if (format && format !== null) {
//             var dimensions = format[0].toString().split('x');
//             var largestWidth = +dimensions[0];
//             var largestHeight = +dimensions[1];
//         }
//         // set the output image characteristics
//         var lImageReader = new android.media.ImageReader.newInstance(largestWidth, largestHeight, android.graphics.ImageFormat.JPEG, 1);

//         var surfaceList = new java.util.ArrayList();
//         surfaceList.add(new android.view.Surface(mTextureView.getSurfaceTexture()));
//         surfaceList.add(lImageReader.getSurface());

//         mCaptureRequestBuilder = mCameraDevice.createCaptureRequest(android.hardware.camera2.CameraDevice.TEMPLATE_STILL_CAPTURE);
//         mCaptureRequestBuilder.addTarget(lImageReader.getSurface());

//         /*************************/
//         let cmode = new java.lang.Integer(android.hardware.camera2.CameraMetadata.CONTROL_MODE_AUTO);
//         mCaptureRequestBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_MODE, cmode);

//         var windowmanager = mAppContext.getSystemService(android.content.Context.WINDOW_SERVICE);
//         var rotation = windowmanager.getDefaultDisplay().getRotation();
//         let rot = new java.lang.Integer(ORIENTATION[rotation]);
//         mCaptureRequestBuilder.set(android.hardware.camera2.CaptureRequest.JPEG_ORIENTATION, rot);

//         /*if(mFlashSupported) {
//              console.log("Flash set to auto mode");
//              mCaptureRequestBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_AE_MODE, android.hardware.camera2.CaptureRequest.CONTROL_AE_MODE_ALWAYS_FLASH);
//          }
//          else {
//              console.log("Flash not available");
//          }*/

//         /*************************/
//         lImageReader.setOnImageAvailableListener(mOnImageAvailableListener, mBackgroundHandler);
//         mCameraDevice.createCaptureSession(surfaceList, new MyCameraCaptureSessionStateCallback1(), mBackgroundHandler);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// function createCameraPreview() {
//     console.log("createCameraPreview");
//     try {
//         var texture = mTextureView.getSurfaceTexture();

//         // We configure the size of default buffer to be the size of camera preview we want.
//         texture.setDefaultBufferSize(480, 640);

//         // This is the output Surface we need to start preview.
//         var surface = new android.view.Surface(texture);

//         // // We set up a CaptureRequest.Builder with the output Surface.
//         mCaptureRequestBuilder = mCameraDevice.createCaptureRequest(android.hardware.camera2.CameraDevice.TEMPLATE_PREVIEW);
//         mCaptureRequestBuilder.addTarget(surface);


//         var surfaceList = new java.util.ArrayList();
//         surfaceList.add(surface);
//         mCameraDevice.createCaptureSession(surfaceList, new MyCameraCaptureSessionStateCallback(), null);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// function closeCamera() {
//     if (mCameraDevice != null) {
//         mCameraDevice.close();
//         mCameraDevice = null;
//     }
//     if (mImageReader != null) {
//         mImageReader.close();
//         mImageReader = null;
//     }
//     if (mCaptureSession != null) {
//         mCaptureSession.close();
//         mCaptureSession = null;
//     }

//     frameModule.topmost().goBack();
// }
// exports.onCancel = closeCamera;

// function onCreatingView(args) {
//     mAppContext = app.android.context;
//     mTextureView = new AutoFitTextureView(mAppContext);
//     //mTextureView = new android.view.TextureView(mAppContext);
//     mTextureView.setSurfaceTextureListener(mSurfaceTextureListener);
//     args.view = mTextureView;
// }
// exports.onCreatingView = onCreatingView;

// function updatePreview() {
//     if (mCameraDevice == null || mCaptureSession == null)
//         return;
//     mCaptureSession.setRepeatingRequest(mCaptureRequestBuilder.build(), null, mBackgroundHandler);
// }

// function chooseOptimalSize(choices, textureViewWidth, textureViewHeight, maxWidth, maxHeight, aspectRatio) {
//     var bigEnough = [];
//     var notBigEnough = [];
//     var w = aspectRatio.getWidth();
//     var h = aspectRatio.getHeight();
//     for (var i = 0; i < choices.length; i++) {
//         if (choices[i].getWidth() <= maxWidth && choices[i].getHeight() <= maxHeight &&
//             choices[i].getHeight() == choices[i].getWidth() * h / w) {
//             if (choices[i].getWidth() >= textureViewWidth && choices[i].getHeight() >= textureViewHeight) {
//                 bigEnough.push(choices[i]);
//             }
//             else {
//                 notBigEnough.push(choices[i]);
//             }
//         }
//     }
//     if (bigEnough.length > 0) {
//         return bigEnough[bigEnough.length - 1];  // min should be last one
//     }
//     else if (notBigEnough.length > 0)
//         return notBigEnough[0];             // max should be first one
//     else
//         choices[0];
// }

// function openCamera(width, height) {

//     mCameraManager = mAppContext.getSystemService(android.content.Context.CAMERA_SERVICE);
//     try {
//         var cameras = mCameraManager.getCameraIdList();
//         for (var index = 0; index < cameras.length; index++) {
//             var currentCamera = cameras[index];
//             var currentCameraSpecs = mCameraManager.getCameraCharacteristics(currentCamera);

//             // get available lenses and set the camera-type (front or back)
//             var facing = currentCameraSpecs.get(android.hardware.camera2.CameraCharacteristics.LENS_FACING);

//             if (facing !== null && facing == android.hardware.camera2.CameraCharacteristics.LENS_FACING_FRONT) {
//                 continue;
//             }

//             if (facing !== null && facing == android.hardware.camera2.CameraCharacteristics.LENS_FACING_BACK) {
//                 mCameraId = currentCamera;
//             }

//             /************************************************************************************* */
//             if (mCameraId != null) {
//                 // get all available sizes ad set the format
//                 var map = currentCameraSpecs.get(android.hardware.camera2.CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
//                 if (map == null)
//                     continue;
//                 var format = map.getOutputSizes(android.graphics.ImageFormat.JPEG);

//                 // we are taking not the largest possible but some of the 5th in the list of resolutions
//                 var largest;
//                 if (format && format !== null) {
//                     largest = format[0];
//                     var dimensions = format[0].toString().split('x');
//                     var largestWidth = +dimensions[0];
//                     var largestHeight = +dimensions[1];
//                     //largest = new java.util.Size(parseInt(largestWidth),parseInt(largestHeight));

//                     // set the output image characteristics
//                     mImageReader = new android.media.ImageReader.newInstance(largestWidth, largestHeight, android.graphics.ImageFormat.JPEG, 1);
//                     mImageReader.setOnImageAvailableListener(mOnImageAvailableListener, mBackgroundHandler);
//                 }
//                 var windowmanager = mAppContext.getSystemService(android.content.Context.WINDOW_SERVICE);
//                 var rotation = windowmanager.getDefaultDisplay().getRotation();
//                 var sensorOrientation = currentCameraSpecs.get(android.hardware.camera2.CameraCharacteristics.SENSOR_ORIENTATION);
//                 var swappedDimensions = false;
//                 switch (rotation) {
//                     case android.view.Surface.ROTATION_0:
//                     case android.view.Surface.ROTATION_180:
//                         if (sensorOrientation == 90 || sensorOrientation == 270) {
//                             swappedDimensions = true;
//                         }
//                         break;
//                     case android.view.Surface.ROTATION_90:
//                     case android.view.Surface.ROTATION_360:
//                         if (sensorOrientation == 0 || sensorOrientation == 180) {
//                             swappedDimensions = true;
//                         }
//                         break;
//                 }

//                 var displaySize = new android.graphics.Point();
//                 windowmanager.getDefaultDisplay().getSize(displaySize);
//                 var rotatedPreviewWidth = width;
//                 var rotatedPreviewHeight = height;
//                 var maxPreviewWidth = displaySize.x;
//                 var maxPreviewHeight = displaySize.y;

//                 if (swappedDimensions) {
//                     rotatedPreviewWidth = height;
//                     rotatedPreviewHeight = width;
//                     maxPreviewWidth = displaySize.y;
//                     maxPreviewHeight = displaySize.x;
//                 }
//                 if (maxPreviewWidth > MAX_PREVIEW_WIDTH) {
//                     maxPreviewWidth = MAX_PREVIEW_WIDTH;
//                 }
//                 if (maxPreviewHeight > MAX_PREVIEW_HEIGHT) {
//                     maxPreviewHeight = MAX_PREVIEW_HEIGHT;
//                 }

//                 mPreviewSize = chooseOptimalSize(map.getOutputSizes(android.graphics.SurfaceTexture.class),
//                     rotatedPreviewWidth, rotatedPreviewHeight, maxPreviewWidth, maxPreviewHeight, largest);
//                 var orientation = mAppContext.getResources().getConfiguration().orientation;
//                 if (orientation == android.content.res.Configuration.ORIENTATION_LANDSCAPE) {
//                     mTextureView.setAspectRatio(mPreviewSize.getWidth(), mPreviewSize.getHeight());
//                 } else {
//                     mTextureView.setAspectRatio(mPreviewSize.getHeight(), mPreviewSize.getWidth());
//                 }
//                 var available = currentCameraSpecs.get(android.hardware.camera2.CameraCharacteristics.FLASH_INFO_AVAILABLE);
//                 mFlashSupported = available == null ? false : available;

//                 /******************************* */

//                 if (mCameraId != null)
//                     break;
//             }
//         }
//         configureTransform(width, height);
//         permissions.requestPermission(android.Manifest.permission.CAMERA, 'Please provide permissions for Camera')
//             .then(function () {
//                 console.log("Got permissions!!!!");
//                 if (mCameraId != null) {
//                     mCameraManager.openCamera(mCameraId, new MyStateCallback(), null);
//                 }
//             })
//             .catch(function () {
//                 console.log("Error in getting permissions");
//             });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// function configureTransform(viewWidth, viewHeight) {
//     if (mTextureView == null || mPreviewSize == null || mAppContext == null)
//         return;
//     var windowmanager = mAppContext.getSystemService(android.content.Context.WINDOW_SERVICE);
//     var rotation = windowmanager.getDefaultDisplay().getRotation();
//     var matrix = new android.graphics.Matrix();
//     var viewRect = new android.graphics.RectF(0, 0, viewWidth, viewHeight);
//     var bufferRect = new android.graphics.RectF(0, 0, mPreviewSize.getHeight(), mPreviewSize.getWidth());
//     var centerX = viewRect.centerX();
//     var centerY = viewRect.centerY();
//     if (android.view.Surface.ROTATION_90 == rotation || android.view.Surface.ROTATION_270 == rotation) {
//         bufferRect.offset(centerX - bufferRect.centerX(), centerY - bufferRect.centerY());
//         matrix.setRectToRect(viewRect, bufferRect, android.graphics.Matrix.ScaleToFit.FILL);
//         var scale = Math.max(viewHeight / mPreviewSize.getHeight(), viewWidth / mPreviewSize.getWidth());
//         matrix.postScale(scale, scale, centerX, centerY);
//         matrix.postRotate(90 * (rotation - 2), centerX, centerY);
//     } else if (android.view.Surface.ROTATION_180 == rotation) {
//         matrix.postRotate(180, centerX, centerY);
//     }
//     mTextureView.setTransform(matrix);
// }

// from Java ; public static abstract class
// var MyCameraCaptureSessionStateCallback1 = android.hardware.camera2.CameraCaptureSession.StateCallback.extend({
//     onConfigured: function (cameraCaptureSession) {
//         console.log("----onConfigured (1) " + cameraCaptureSession);

//         if (mCameraDevice === null) {
//             return;
//         }

//         mCaptureSession = cameraCaptureSession;
//         mCaptureSession.capture(mCaptureRequestBuilder.build(), new MyCaptureSessionCaptureCallback(), mBackgroundHandler);
//     },
//     onConfigureFailed: function (cameraCaptureSession) {
//         console.log("onConfigureFailed " + cameraCaptureSession);
//     },
//     onClosed: function (session) {
//         console.log("----onClosed (1)");
//     }

// });

// from Java ; public static abstract class
// var MyCameraCaptureSessionStateCallback = android.hardware.camera2.CameraCaptureSession.StateCallback.extend({
//     onConfigured: function (cameraCaptureSession) {
//         console.log("----onConfigured " + cameraCaptureSession);

//         if (mCameraDevice === null) {
//             return;
//         }

//         mCaptureSession = cameraCaptureSession;

//         if (mFlashSupported) {
//             let cmode = new java.lang.Integer(android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE_CONTINUOUS_PICTURE);
//             mCaptureRequestBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE, cmode);

//             cmode = new java.lang.Integer(android.hardware.camera2.CaptureRequest.CONTROL_AE_MODE_ON_AUTO_FLASH);
//             mCaptureRequestBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_AE_MODE, cmode);

//             console.log("Flash set to auto mode");
//             //let mode = new java.lang.Integer(android.hardware.camera2.CaptureRequest.FLASH_MODE_AUTO);
//             //mCaptureRequestBuilder.set(android.hardware.camera2.CaptureRequest.FLASH_MODE, android.hardware.camera2.CaptureRequest.FLASH_MODE_TORCH);
//         }
//         else {
//             console.log("Flash not available");
//         }

//         updatePreview();
//     },
//     onConfigureFailed: function (cameraCaptureSession) {
//         console.log("onConfigureFailed " + cameraCaptureSession);
//     },
//     onClosed: function (session) {
//         console.log("----onClosed");
//     }
// });

// from Java : public static abstract class
// var MyCaptureSessionCaptureCallback = android.hardware.camera2.CameraCaptureSession.CaptureCallback.extend({
//     onCaptureCompleted: function (session, request, result) {
//         // console.log("onCaptureCompleted");
//         createCameraPreview();
//     },
//     onCaptureFailed: function (session, request, failure) {
//         // console.log("onCaptureFailed");
//         console.log(failure);
//     }
// });

// var calculateInSampleSize = function (imageWidth, imageHeight, reqWidth, reqHeight) {
//     var sampleSize = 1;
//     if (imageWidth > reqWidth && imageHeight > reqHeight) {
//         var halfWidth = imageWidth / 2;
//         var halfHeight = imageHeight / 2;
//         while ((halfWidth / sampleSize) > reqWidth && (halfHeight / sampleSize) > reqHeight) {
//             sampleSize *= 2;
//         }
//     }
//     return sampleSize;
// };

// var mOnImageAvailableListener = new android.media.ImageReader.OnImageAvailableListener({
//     onImageAvailable: function (reader) {

//         // here we should save our image to file when image is available
//         var image = reader.acquireLatestImage();
//         var buffer = image.getPlanes()[0].getBuffer();
//         var bytes = Array.create("byte", buffer.remaining());
//         buffer.get(bytes);

//         var options = new android.graphics.BitmapFactory.Options();
//         options.inJustDecodeBounds = true;
//         var bitmap = android.graphics.BitmapFactory.decodeByteArray(bytes, 0, bytes.length, options);

//         var reqWidth = 480;
//         var reqHeight = 640;
//         var shouldKeepAspectRatio = true;
//         if (options.outWidth < options.outHeight) {
//             var tempHeight = reqHeight;
//             reqHeight = reqWidth;
//             reqWidth = tempHeight;
//         }
//         var sampleSize = calculateInSampleSize(options.outWidth, options.outHeight, reqWidth, reqHeight);
//         var finalBitmapOptions = new android.graphics.BitmapFactory.Options();
//         finalBitmapOptions.inSampleSize = sampleSize;
//         bitmap = android.graphics.BitmapFactory.decodeByteArray(bytes, 0, bytes.length, finalBitmapOptions);

//         var scaledSizeImage = null;
//         if (reqHeight > 0 && reqWidth > 0) {
//             if (shouldKeepAspectRatio) {
//                 var common = require("camera/camera-common")
//                 var aspectSafeSize = common.getAspectSafeDimensions(bitmap.getWidth(), bitmap.getHeight(), reqWidth, reqHeight);
//                 scaledSizeImage = android.graphics.Bitmap.createScaledBitmap(bitmap, aspectSafeSize.width, aspectSafeSize.height, true);
//             }
//             else {
//                 scaledSizeImage = android.graphics.Bitmap.createScaledBitmap(bitmap, reqWidth, reqHeight, true);
//             }
//         }
//         else {
//             scaledSizeImage = bitmap;
//         }

//         var compressedOutPutStream = new java.io.ByteArrayOutputStream();
//         scaledSizeImage.compress(android.graphics.Bitmap.CompressFormat.JPEG, 80, compressedOutPutStream);
//         var newFinalImage = android.graphics.BitmapFactory.decodeStream(new java.io.ByteArrayInputStream(compressedOutPutStream.toByteArray()));


//         var thumbDir = storage.getFolder(mInspectionId.toString());
//         var imageDir = storage.getPublicPictureDirectory().getFolder(mInspectionId.toString());

//         var photo = new photoModule.Photo();
//         photo.Name = mPhotoName;
//         photo.InspectionId = mInspectionId;
//         photo.DateTime = new Date().toString();
//         photo.Location = { latitude: 0, longitude: 0, accuracy: 0 };
//         photo.Path = fs.path.join(imageDir.path, photo.getFileName() + '.jpg');
//         photo.Thumb = fs.path.join(thumbDir.path, photo.getFileName() + '_thumb.jpg');
//         var imageSource = require("image-source");
//         var imgSrc = imageSource.fromNativeSource(newFinalImage);
//         // imageStamp.addText({
//         //     image: imgSrc,
//         //     text: photo.getImageTimestamp(),
//         //     path: photo.Path,
//         //     thumb: photo.Thumb
//         // });

//         try {
//             var fi = new android.media.ExifInterface(photo.Path);
//             fi.setAttribute("GPSLongitude", mLocation.longitude.toString());
//             fi.setAttribute("GPSLatitude", mLocation.latitude.toString());
//             fi.saveAttributes();
//             var gps = fi.getAttribute(android.media.ExifInterface.TAG_GPS_LATITUDE);

//         } catch (err) {
//             console.log(err);
//         }

//         mPhotoBucket.Photos.push(photo);
//         formModule.saveForm(mform);
//         image.close();
//         reader.close();
//     }
// });

// from Java : public static interface    
// var mSurfaceTextureListener = new android.view.TextureView.SurfaceTextureListener({

//     onSurfaceTextureAvailable: function (texture, width, height) {
//         console.log('----onSurfaceTextureAvailable----');
//         openCamera(width, height);
//     },

//     onSurfaceTextureSizeChanged: function (texture, width, height) {
//         configureTransform(width, height);
//         console.log('----onSurfaceTextureSizeChanged----');
//     },

//     onSurfaceTextureDestroyed: function (texture) {
//         return false;
//     },

//     onSurfaceTextureUpdated: function (texture) {
//     },

// });

// from Java : public static abstract class
// var MyStateCallback = android.hardware.camera2.CameraDevice.StateCallback.extend({
//     onOpened: function (cameraDevice) {
//         console.log("----onOpened " + cameraDevice);

//         mCameraOpenCloseLock.release();
//         mCameraDevice = cameraDevice;
//         createCameraPreview();
//     },
//     onDisconnected: function (cameraDevice) {
//         console.log("----onDisconnected");

//         mCameraOpenCloseLock.release();
//         cameraDevice.close();
//         mCameraDevice = null;
//     },
//     onError: function (cameraDevice, error) {
//         console.log("-----onError");
//         console.log("onError: device = " + cameraDevice);
//         console.log("onError: error =  " + error);

//         mCameraOpenCloseLock.release();
//         cameraDevice.close();
//         mCameraDevice = null;
//     },
//     onClosed: function (cameraDevice) {
//         console.log("-----onClosed");
//     }
// });

// var AutoFitTextureView = android.view.TextureView.extend({
//     mRatioWidth: 0,
//     mRatioHeight: 0,
//     init: function (context) {
//         console.log('*************************');
//         // how to call supper contructor with context?
//     },
//     setAspectRatio: function (width, height) {
//         if (width < 0 || height < 0)
//             throw "Error";
//         mRatioWidth = width;
//         mRatioHeight = height;
//         this.requestLayout();
//     },
//     onMeasure: function (widthMeasureSpec, heightMeasureSpec) {
//         this.super.onMeasure(widthMeasureSpec, heightMeasureSpec);
//         var width = android.view.View.MeasureSpec.getSize(widthMeasureSpec);
//         var height = android.view.View.MeasureSpec.getSize(heightMeasureSpec);
//         if (this.mRatioWidth == 0 || this.mRatioHeight == 0) {
//             this.setMeasuredDimension(width, height);
//         } else {
//             if (width < height * mRatioWidth / mRatioHeight) {
//                 this.setMeasureDimension(width, height * mRatioHeight / mRatioWidth);
//             } else {
//                 this.setMeasureDimension(height * mRatioWidth / mRatioHeight, height);
//             }
//         }
//     }
// });