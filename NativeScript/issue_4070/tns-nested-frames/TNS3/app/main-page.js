let page;
let navFrame;

var frame = require("ui/frame");

exports.onNavigatingTo = function(args) {
  page = args.object;
};

exports.navFrameLoaded = function(args) {
  navFrame = args.object;

  console.log("navFrame: " + navFrame)

  navFrame.navigate("frame/frame");
};