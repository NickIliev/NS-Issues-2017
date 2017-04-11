var createViewModel = require("./main-view-model").createViewModel;
var app = require("application");

function onNavigatingTo(args) {
    var page = args.object;

    page.bindingContext = createViewModel();

    var camManager = app.android.context.getSystemService(android.content.Context.CAMERA_SERVICE);
    var cameraId = camManager.getCameraIdList()[0]; // Usually front camera is at 0 position.
    camManager.setTorchMode(cameraId, true);
}
exports.onNavigatingTo = onNavigatingTo;