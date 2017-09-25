"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see {@link ajax}
 *
 * @interface
 * @name AjaxRequest
 * @noimport true
 */
var AjaxRequestDoc = (function () {
    function AjaxRequestDoc() {
        /**
         * @type {string}
         */
        this.url = '';
        /**
         * @type {number}
         */
        this.body = 0;
        /**
         * @type {string}
         */
        this.user = '';
        /**
         * @type {boolean}
         */
        this.async = false;
        /**
         * @type {string}
         */
        this.method = '';
        /**
         * @type {Object}
         */
        this.headers = null;
        /**
         * @type {number}
         */
        this.timeout = 0;
        /**
         * @type {string}
         */
        this.password = '';
        /**
         * @type {boolean}
         */
        this.hasContent = false;
        /**
         * @type {boolean}
         */
        this.crossDomain = false;
        /**
         * @type {Subscriber}
         */
        this.progressSubscriber = null;
        /**
         * @type {string}
         */
        this.responseType = '';
    }
    /**
     * @return {XMLHttpRequest}
     */
    AjaxRequestDoc.prototype.createXHR = function () {
        return null;
    };
    /**
     * @param {AjaxResponse} response
     * @return {T}
     */
    AjaxRequestDoc.prototype.resultSelector = function (response) {
        return null;
    };
    return AjaxRequestDoc;
}());
exports.AjaxRequestDoc = AjaxRequestDoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzY0pTRG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWlzY0pTRG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7Ozs7OztHQU1HO0FBQ0g7SUFBQTtRQUNFOztXQUVHO1FBQ0gsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUNqQjs7V0FFRztRQUNILFNBQUksR0FBUSxDQUFDLENBQUM7UUFDZDs7V0FFRztRQUNILFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEI7O1dBRUc7UUFDSCxVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCOztXQUVHO1FBQ0gsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQjs7V0FFRztRQUNILFlBQU8sR0FBVyxJQUFJLENBQUM7UUFDdkI7O1dBRUc7UUFDSCxZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCOztXQUVHO1FBQ0gsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0Qjs7V0FFRztRQUNILGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUI7O1dBRUc7UUFDSCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU83Qjs7V0FFRztRQUNILHVCQUFrQixHQUFvQixJQUFJLENBQUM7UUFRM0M7O1dBRUc7UUFDSCxpQkFBWSxHQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBckJDOztPQUVHO0lBQ0gsa0NBQVMsR0FBVDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBS0Q7OztPQUdHO0lBQ0gsdUNBQWMsR0FBZCxVQUFrQixRQUFzQjtRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUtILHFCQUFDO0FBQUQsQ0FBQyxBQTlERCxJQThEQztBQTlEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi8uLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IEFqYXhSZXNwb25zZSB9IGZyb20gJy4vQWpheE9ic2VydmFibGUnO1xuXG4vKipcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGludGVyZmFjZVxuICogQG5hbWUgQWpheFJlcXVlc3RcbiAqIEBub2ltcG9ydCB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBBamF4UmVxdWVzdERvYyB7XG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdXJsOiBzdHJpbmcgPSAnJztcbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBib2R5OiBhbnkgPSAwO1xuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHVzZXI6IHN0cmluZyA9ICcnO1xuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBhc3luYzogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG1ldGhvZDogc3RyaW5nID0gJyc7XG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgaGVhZGVyczogT2JqZWN0ID0gbnVsbDtcbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICB0aW1lb3V0OiBudW1iZXIgPSAwO1xuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHBhc3N3b3JkOiBzdHJpbmcgPSAnJztcbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ29udGVudDogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBjcm9zc0RvbWFpbjogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogQHJldHVybiB7WE1MSHR0cFJlcXVlc3R9XG4gICAqL1xuICBjcmVhdGVYSFIoKTogWE1MSHR0cFJlcXVlc3Qge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8qKlxuICAgKiBAdHlwZSB7U3Vic2NyaWJlcn1cbiAgICovXG4gIHByb2dyZXNzU3Vic2NyaWJlcjogU3Vic2NyaWJlcjxhbnk+ID0gbnVsbDtcbiAgLyoqXG4gICAqIEBwYXJhbSB7QWpheFJlc3BvbnNlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtUfVxuICAgKi9cbiAgcmVzdWx0U2VsZWN0b3I8VD4ocmVzcG9uc2U6IEFqYXhSZXNwb25zZSk6IFQge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgcmVzcG9uc2VUeXBlOiBzdHJpbmcgPSAnJztcbn1cbiJdfQ==