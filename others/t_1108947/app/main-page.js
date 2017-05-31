"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var viewModel = require("./main-view-model");
var actualValue;
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new viewModel.PersonViewModel();
}
exports.navigatingTo = navigatingTo;
function editorNeedsView(args) {
    var editorView = new android.widget.Button(args.context);
    editorView.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function (view) {
            handleTap(view, args.object);
        }
    }));
    args.view = editorView;
}
exports.editorNeedsView = editorNeedsView;
function editorHasToApplyValue(args) {
    updateEditorValue(args.view, args.value);
}
exports.editorHasToApplyValue = editorHasToApplyValue;
function editorNeedsValue(args) {
    args.value = actualValue;
}
exports.editorNeedsValue = editorNeedsValue;
function updateEditorValue(editorView, value) {
    actualValue = value.age;
    editorView.setText(actualValue + " (tap to increase)");
}
exports.updateEditorValue = updateEditorValue;
function handleTap(editorView, editor) {
    var newValue = actualValue + 1;
    updateEditorValue(editorView, newValue);
    editor.notifyValueChanged();
}
exports.handleTap = handleTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQWdEO0FBR2hELElBQUksV0FBVyxDQUFDO0FBRWhCLHNCQUE2QixJQUFJO0lBQzdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUMxRCxDQUFDO0FBSEQsb0NBR0M7QUFFRCx5QkFBZ0MsSUFBSTtJQUNoQyxJQUFJLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6RCxVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDaEUsT0FBTyxZQUFDLElBQVM7WUFDYixTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUMzQixDQUFDO0FBUkQsMENBUUM7QUFFRCwrQkFBc0MsSUFBSTtJQUN0QyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRkQsc0RBRUM7QUFFRCwwQkFBaUMsSUFBSTtJQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztBQUM3QixDQUFDO0FBRkQsNENBRUM7QUFFRCwyQkFBa0MsVUFBVSxFQUFFLEtBQUs7SUFDL0MsV0FBVyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDeEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBSEQsOENBR0M7QUFFRCxtQkFBMEIsVUFBVSxFQUFFLE1BQU07SUFDeEMsSUFBSSxRQUFRLEdBQUcsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUMvQixpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDaEMsQ0FBQztBQUpELDhCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHZpZXdNb2RlbCA9IHJlcXVpcmUoXCIuL21haW4tdmlldy1tb2RlbFwiKTtcblxuZGVjbGFyZSB2YXIgYW5kcm9pZDogYW55O1xudmFyIGFjdHVhbFZhbHVlO1xuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3MpIHtcbiAgICB2YXIgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgdmlld01vZGVsLlBlcnNvblZpZXdNb2RlbCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWRpdG9yTmVlZHNWaWV3KGFyZ3MpIHtcbiAgICB2YXIgZWRpdG9yVmlldyA9IG5ldyBhbmRyb2lkLndpZGdldC5CdXR0b24oYXJncy5jb250ZXh0KTtcbiAgICBlZGl0b3JWaWV3LnNldE9uQ2xpY2tMaXN0ZW5lcihuZXcgYW5kcm9pZC52aWV3LlZpZXcuT25DbGlja0xpc3RlbmVyKHtcbiAgICAgICAgb25DbGljayh2aWV3OiBhbnkpIHtcbiAgICAgICAgICAgIGhhbmRsZVRhcCh2aWV3LCBhcmdzLm9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KSk7XG4gICAgYXJncy52aWV3ID0gZWRpdG9yVmlldztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRvckhhc1RvQXBwbHlWYWx1ZShhcmdzKSB7XG4gICAgdXBkYXRlRWRpdG9yVmFsdWUoYXJncy52aWV3LCBhcmdzLnZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRvck5lZWRzVmFsdWUoYXJncykge1xuICAgIGFyZ3MudmFsdWUgPSBhY3R1YWxWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVkaXRvclZhbHVlKGVkaXRvclZpZXcsIHZhbHVlKSB7XG4gICAgYWN0dWFsVmFsdWUgPSB2YWx1ZS5hZ2U7XG4gICAgZWRpdG9yVmlldy5zZXRUZXh0KGFjdHVhbFZhbHVlICsgXCIgKHRhcCB0byBpbmNyZWFzZSlcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVUYXAoZWRpdG9yVmlldywgZWRpdG9yKSB7XG4gICAgdmFyIG5ld1ZhbHVlID0gYWN0dWFsVmFsdWUgKyAxO1xuICAgIHVwZGF0ZUVkaXRvclZhbHVlKGVkaXRvclZpZXcsIG5ld1ZhbHVlKTtcbiAgICBlZGl0b3Iubm90aWZ5VmFsdWVDaGFuZ2VkKCk7XG59Il19