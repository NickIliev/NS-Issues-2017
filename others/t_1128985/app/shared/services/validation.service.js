"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
        var config = {
            "required": "Required",
            "invalidCreditCard": "Is invalid credit card number",
            "invalidEmailAddress": "Invalid email address",
            "invalidPassword": "Invalid password. Password must be at least 6 characters long, and contain a number.",
            "minlength": "Minimum length " + validatorValue.requiredLength
        };
        return config[validatorName];
    };
    ValidationService.emailValidator = function (control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }
        else {
            return { "invalidEmailAddress": true };
        }
    };
    ValidationService.passwordValidator = function (control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        else {
            return { "invalidPassword": true };
        }
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0E7SUFBQTtJQStCQSxDQUFDO0lBOUJVLDBDQUF3QixHQUEvQixVQUFnQyxhQUFxQixFQUFFLGNBQW9CO1FBQ3ZFLElBQUksTUFBTSxHQUFHO1lBQ1QsVUFBVSxFQUFFLFVBQVU7WUFDdEIsbUJBQW1CLEVBQUUsK0JBQStCO1lBQ3BELHFCQUFxQixFQUFFLHVCQUF1QjtZQUM5QyxpQkFBaUIsRUFBRSxzRkFBc0Y7WUFDekcsV0FBVyxFQUFFLG9CQUFrQixjQUFjLENBQUMsY0FBZ0I7U0FDakUsQ0FBQztRQUVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLGdDQUFjLEdBQXJCLFVBQXNCLE9BQU87UUFDekIsMkJBQTJCO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHVJQUF1SSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9KLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDM0MsQ0FBQztJQUNMLENBQUM7SUFFTSxtQ0FBaUIsR0FBeEIsVUFBeUIsT0FBTztRQUM1QixzRUFBc0U7UUFDdEUsOERBQThEO1FBQzlELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvblNlcnZpY2Uge1xuICAgIHN0YXRpYyBnZXRWYWxpZGF0b3JFcnJvck1lc3NhZ2UodmFsaWRhdG9yTmFtZTogc3RyaW5nLCB2YWxpZGF0b3JWYWx1ZT86IGFueSkge1xuICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiBcIlJlcXVpcmVkXCIsXG4gICAgICAgICAgICBcImludmFsaWRDcmVkaXRDYXJkXCI6IFwiSXMgaW52YWxpZCBjcmVkaXQgY2FyZCBudW1iZXJcIixcbiAgICAgICAgICAgIFwiaW52YWxpZEVtYWlsQWRkcmVzc1wiOiBcIkludmFsaWQgZW1haWwgYWRkcmVzc1wiLFxuICAgICAgICAgICAgXCJpbnZhbGlkUGFzc3dvcmRcIjogXCJJbnZhbGlkIHBhc3N3b3JkLiBQYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDYgY2hhcmFjdGVycyBsb25nLCBhbmQgY29udGFpbiBhIG51bWJlci5cIixcbiAgICAgICAgICAgIFwibWlubGVuZ3RoXCI6IGBNaW5pbXVtIGxlbmd0aCAke3ZhbGlkYXRvclZhbHVlLnJlcXVpcmVkTGVuZ3RofWBcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gY29uZmlnW3ZhbGlkYXRvck5hbWVdO1xuICAgIH1cblxuICAgIHN0YXRpYyBlbWFpbFZhbGlkYXRvcihjb250cm9sKSB7XG4gICAgICAgIC8vIFJGQyAyODIyIGNvbXBsaWFudCByZWdleFxuICAgICAgICBpZiAoY29udHJvbC52YWx1ZS5tYXRjaCgvW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlxcLlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSspKkAoPzpbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XFwuKStbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/LykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgXCJpbnZhbGlkRW1haWxBZGRyZXNzXCI6IHRydWUgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBwYXNzd29yZFZhbGlkYXRvcihjb250cm9sKSB7XG4gICAgICAgIC8vIHs2LDEwMH0gICAgICAgICAgIC0gQXNzZXJ0IHBhc3N3b3JkIGlzIGJldHdlZW4gNiBhbmQgMTAwIGNoYXJhY3RlcnNcbiAgICAgICAgLy8gKD89LipbMC05XSkgICAgICAgLSBBc3NlcnQgYSBzdHJpbmcgaGFzIGF0IGxlYXN0IG9uZSBudW1iZXJcbiAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUubWF0Y2goL14oPz0uKlswLTldKVthLXpBLVowLTkhQCMkJV4mKl17NiwxMDB9JC8pKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7IFwiaW52YWxpZFBhc3N3b3JkXCI6IHRydWUgfTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=