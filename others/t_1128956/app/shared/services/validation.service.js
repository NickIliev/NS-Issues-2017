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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0E7SUFBQTtJQStCQSxDQUFDO0lBOUJVLDBDQUF3QixHQUEvQixVQUFnQyxhQUFxQixFQUFFLGNBQW9CO1FBQ3ZFLElBQUksTUFBTSxHQUFHO1lBQ1QsVUFBVSxFQUFFLFVBQVU7WUFDdEIsbUJBQW1CLEVBQUUsK0JBQStCO1lBQ3BELHFCQUFxQixFQUFFLHVCQUF1QjtZQUM5QyxpQkFBaUIsRUFBRSxzRkFBc0Y7WUFDekcsV0FBVyxFQUFFLG9CQUFrQixjQUFjLENBQUMsY0FBZ0I7U0FDakUsQ0FBQztRQUVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLGdDQUFjLEdBQXJCLFVBQXNCLE9BQU87UUFDekIsMkJBQTJCO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHVJQUF1SSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9KLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDM0MsQ0FBQztJQUNMLENBQUM7SUFFTSxtQ0FBaUIsR0FBeEIsVUFBeUIsT0FBTztRQUM1QixzRUFBc0U7UUFDdEUsOERBQThEO1FBQzlELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uU2VydmljZSB7XHJcbiAgICBzdGF0aWMgZ2V0VmFsaWRhdG9yRXJyb3JNZXNzYWdlKHZhbGlkYXRvck5hbWU6IHN0cmluZywgdmFsaWRhdG9yVmFsdWU/OiBhbnkpIHtcclxuICAgICAgICBsZXQgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBcInJlcXVpcmVkXCI6IFwiUmVxdWlyZWRcIixcclxuICAgICAgICAgICAgXCJpbnZhbGlkQ3JlZGl0Q2FyZFwiOiBcIklzIGludmFsaWQgY3JlZGl0IGNhcmQgbnVtYmVyXCIsXHJcbiAgICAgICAgICAgIFwiaW52YWxpZEVtYWlsQWRkcmVzc1wiOiBcIkludmFsaWQgZW1haWwgYWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBcImludmFsaWRQYXNzd29yZFwiOiBcIkludmFsaWQgcGFzc3dvcmQuIFBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgNiBjaGFyYWN0ZXJzIGxvbmcsIGFuZCBjb250YWluIGEgbnVtYmVyLlwiLFxyXG4gICAgICAgICAgICBcIm1pbmxlbmd0aFwiOiBgTWluaW11bSBsZW5ndGggJHt2YWxpZGF0b3JWYWx1ZS5yZXF1aXJlZExlbmd0aH1gXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZ1t2YWxpZGF0b3JOYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZW1haWxWYWxpZGF0b3IoY29udHJvbCkge1xyXG4gICAgICAgIC8vIFJGQyAyODIyIGNvbXBsaWFudCByZWdleFxyXG4gICAgICAgIGlmIChjb250cm9sLnZhbHVlLm1hdGNoKC9bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT8vKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4geyBcImludmFsaWRFbWFpbEFkZHJlc3NcIjogdHJ1ZSB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGFzc3dvcmRWYWxpZGF0b3IoY29udHJvbCkge1xyXG4gICAgICAgIC8vIHs2LDEwMH0gICAgICAgICAgIC0gQXNzZXJ0IHBhc3N3b3JkIGlzIGJldHdlZW4gNiBhbmQgMTAwIGNoYXJhY3RlcnNcclxuICAgICAgICAvLyAoPz0uKlswLTldKSAgICAgICAtIEFzc2VydCBhIHN0cmluZyBoYXMgYXQgbGVhc3Qgb25lIG51bWJlclxyXG4gICAgICAgIGlmIChjb250cm9sLnZhbHVlLm1hdGNoKC9eKD89LipbMC05XSlbYS16QS1aMC05IUAjJCVeJipdezYsMTAwfSQvKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4geyBcImludmFsaWRQYXNzd29yZFwiOiB0cnVlIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19