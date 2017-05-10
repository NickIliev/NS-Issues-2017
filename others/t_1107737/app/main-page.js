"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// >> dataform-getting-started-context
var observable_1 = require("data/observable");
var vmRegister = observable_1.fromObject({
    statusWorking: false,
    completed: false,
    registerFormData: {
        nickname: "ysta",
        email1: "test@gmail.com",
        email2: "test@yahoo.com",
        password1: "somePass",
        password2: "anotherPass",
        moreInfo1: "some info",
        moreInfo2: "some info",
        moreInfo3: "some info",
        moreInfo4: "some info",
        moreInfo5: "some info",
        moreInfo6: "some info",
        moreInfo7: "some info",
        moreInfo8: "some info",
        moreInfo9: "some info",
        moreInfo10: "some info",
        moreInfo11: "some info"
    }
});
function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmRegister;
}
exports.onPageLoaded = onPageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNDO0FBQ3RDLDhDQUF5RDtBQUV6RCxJQUFJLFVBQVUsR0FBRyx1QkFBVSxDQUFDO0lBQ3hCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLGdCQUFnQixFQUFFO1FBQ2QsUUFBUSxFQUFFLE1BQU07UUFDaEIsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFVBQVUsRUFBRSxXQUFXO0tBQzFCO0NBQ0osQ0FBQyxDQUFDO0FBRUgsc0JBQTZCLElBQUk7SUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUNyQyxDQUFDO0FBSEQsb0NBR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA+PiBkYXRhZm9ybS1nZXR0aW5nLXN0YXJ0ZWQtY29udGV4dFxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbU9iamVjdCB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcblxudmFyIHZtUmVnaXN0ZXIgPSBmcm9tT2JqZWN0KHtcbiAgICBzdGF0dXNXb3JraW5nOiBmYWxzZSxcbiAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgIHJlZ2lzdGVyRm9ybURhdGE6IHtcbiAgICAgICAgbmlja25hbWU6IFwieXN0YVwiLFxuICAgICAgICBlbWFpbDE6IFwidGVzdEBnbWFpbC5jb21cIixcbiAgICAgICAgZW1haWwyOiBcInRlc3RAeWFob28uY29tXCIsXG4gICAgICAgIHBhc3N3b3JkMTogXCJzb21lUGFzc1wiLFxuICAgICAgICBwYXNzd29yZDI6IFwiYW5vdGhlclBhc3NcIixcbiAgICAgICAgbW9yZUluZm8xOiBcInNvbWUgaW5mb1wiLFxuICAgICAgICBtb3JlSW5mbzI6IFwic29tZSBpbmZvXCIsXG4gICAgICAgIG1vcmVJbmZvMzogXCJzb21lIGluZm9cIixcbiAgICAgICAgbW9yZUluZm80OiBcInNvbWUgaW5mb1wiLFxuICAgICAgICBtb3JlSW5mbzU6IFwic29tZSBpbmZvXCIsXG4gICAgICAgIG1vcmVJbmZvNjogXCJzb21lIGluZm9cIixcbiAgICAgICAgbW9yZUluZm83OiBcInNvbWUgaW5mb1wiLFxuICAgICAgICBtb3JlSW5mbzg6IFwic29tZSBpbmZvXCIsXG4gICAgICAgIG1vcmVJbmZvOTogXCJzb21lIGluZm9cIixcbiAgICAgICAgbW9yZUluZm8xMDogXCJzb21lIGluZm9cIixcbiAgICAgICAgbW9yZUluZm8xMTogXCJzb21lIGluZm9cIlxuICAgIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTG9hZGVkKGFyZ3MpIHtcbiAgICB2YXIgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB2bVJlZ2lzdGVyO1xufVxuIl19