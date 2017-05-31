import viewModel = require("./main-view-model");

declare var android: any;
var actualValue;

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new viewModel.PersonViewModel();
}

export function editorNeedsView(args) {
    var editorView = new android.widget.Button(args.context);
    editorView.setOnClickListener(new android.view.View.OnClickListener({
        onClick(view: any) {
            handleTap(view, args.object);
        }
    }));
    args.view = editorView;
}

export function editorHasToApplyValue(args) {
    updateEditorValue(args.view, args.value);
}

export function editorNeedsValue(args) {
    args.value = actualValue;
}

export function updateEditorValue(editorView, value) {
    actualValue = value.age;
    editorView.setText(actualValue + " (tap to increase)");
}

export function handleTap(editorView, editor) {
    var newValue = actualValue + 1;
    updateEditorValue(editorView, newValue);
    editor.notifyValueChanged();
}