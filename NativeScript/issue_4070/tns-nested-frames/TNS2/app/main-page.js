let page;
let navFrame;

exports.onNavigatingTo = function(args) {
  page = args.object;
};

exports.navFrameLoaded = function(args) {
  navFrame = args.object;

  console.log("navFrame: " + navFrame);

  navFrame.navigate({
    moduleName: "frame/frame"
  });
};