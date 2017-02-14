/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import fs = require('file-system')
import frame = require('ui/frame')
import utils = require('utils/utils')
import observableModule = require('data/observable')
import imageSource = require("image-source")
import camera = require('camera')
import image = require('ui/image')
import {
    ImageFormat
} from 'ui/enums'
import view = require("ui/core/view")
// import firebase = require('nativescript-plugin-firebase')
var dialog = require('nativescript-dialog')
var pd = new observableModule.Observable()

var imageContainer
var imageTaken = false
var fileLocation

exports.onLoaded = args => {
    var page = args.object
    imageContainer = view.getViewById(page, "img")

    pd.set('imageTaken', imageTaken)
    page.bindingContext = pd
}

exports.takePhoto = args => {
    const options = {
        width: 300,
        height: 300,
        keepAspectRatio: true
    }
    camera.takePicture().then((picture) => {
        console.log('Take Picture')
        var image = new image.Image()
        image.imageSource = picture
        imageContainer.imageSource = picture
        let savePath = fs.knownFolders.documents().path;
        let fileName = 'img_' + new Date().getTime() + '_' + this.currentUserId.getValue() + '.' + ImageFormat.jpeg
        let filePath = fs.path.join(savePath, fileName)
        console.log(filePath);
        picture.saveToFile(filePath, ImageFormat.jpeg)
        fileLocation = filePath
        imageTaken = true

    })
}

exports.sendPhoto = args => {
    console.log(imageTaken)
    console.log(fileLocation)
    //   imageTaken ? upload(Math.random() + '-' + Date.now()) : dialog.show({
    //     title: "Error",
    //     message: "Please take a photo first.",
    //     okButtonText: "OK"
    //   })
}

// const upload = (remoteFileName) => {
//   firebase.uploadFile({
//     remoteFullPath: 'uploads/images/' + remoteFileName,
//     localFile: fs.File.fromPath(fileLocation),
//     localFullPath: fileLocation,
//     onProgress: function (status) {
//       console.log("Uploaded fraction: " + status.fractionCompleted)
//       console.log("Percentage complete: " + status.percentageCompleted)
//     }
//   }).then(
//     uploadedFile => {
//       console.log("File uploaded: " + JSON.stringify(uploadedFile))
//     },
//     error => {
//       console.log("File upload error: " + error)
//     }
//   )
// }

