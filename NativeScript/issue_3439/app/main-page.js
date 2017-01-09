"use strict";
var enums = require("ui/enums");
var lbl;
var animation;
function navigatingTo(args) {
    var page = args.object;
    lbl = page.getViewById("lbl");
}
exports.navigatingTo = navigatingTo;
var animation_1 = require("ui/animation");
function startAnimation() {
    animation = new animation_1.Animation([{ translate: { x: 0, y: 300 }, duration: 5000, curve: enums.AnimationCurve.easeIn, target: lbl }], false);
    animation.play();
}
exports.startAnimation = startAnimation;
function cancelAnimation() {
    animation.cancel();
}
exports.cancelAnimation = cancelAnimation;
//# sourceMappingURL=main-page.js.map