function onNavigatingTo(args) {
    var page = args.object;

    var tf = page.getViewById("tf");

    tf.borderWidth = 3;
    tf.borderColor = "red";
}

exports.onNavigatingTo = onNavigatingTo;