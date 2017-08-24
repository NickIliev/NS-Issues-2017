"use strict";
//Constants for the various statuses of a request and action
(function (RequestStatuses) {
    RequestStatuses[RequestStatuses["Entered"] = 1] = "Entered";
    RequestStatuses[RequestStatuses["Allocated"] = 2] = "Allocated";
    RequestStatuses[RequestStatuses["Completed"] = 3] = "Completed";
    RequestStatuses[RequestStatuses["Held"] = 10] = "Held";
})(exports.RequestStatuses || (exports.RequestStatuses = {}));
var RequestStatuses = exports.RequestStatuses;
;
