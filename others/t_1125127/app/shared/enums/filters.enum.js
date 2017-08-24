"use strict";
//Constants for the various statuses of a request and action
(function (RequestedByFilter) {
    RequestedByFilter[RequestedByFilter["All"] = 0] = "All";
    RequestedByFilter[RequestedByFilter["Mine"] = 1] = "Mine";
    RequestedByFilter[RequestedByFilter["MyBuilding"] = 2] = "MyBuilding";
})(exports.RequestedByFilter || (exports.RequestedByFilter = {}));
var RequestedByFilter = exports.RequestedByFilter;
;
//# sourceMappingURL=filters.enum.js.map