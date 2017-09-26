"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogs = require("tns-core-modules/ui/dialogs");
function navigatingTo(args) { }
exports.navigatingTo = navigatingTo;
function openDialog() {
    var options = {
        title: "Race Selection",
        message: "Choose your race",
        cancelButtonText: "Cancel",
        actions: ["Human", "Elf", "Dwarf", "Orc"]
    };
    dialogs.action(options).then(function (result) {
        console.log(result);
    });
}
exports.openDialog = openDialog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQXVEO0FBRXZELHNCQUE2QixJQUFlLElBQUksQ0FBQztBQUFqRCxvQ0FBaUQ7QUFFakQ7SUFDSSxJQUFJLE9BQU8sR0FBRztRQUNWLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixnQkFBZ0IsRUFBRSxRQUFRO1FBQzFCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQztLQUM1QyxDQUFDO0lBQ0YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBVkQsZ0NBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5EaWFsb2coKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHRpdGxlOiBcIlJhY2UgU2VsZWN0aW9uXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiQ2hvb3NlIHlvdXIgcmFjZVwiLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxuICAgICAgICBhY3Rpb25zOiBbXCJIdW1hblwiLCBcIkVsZlwiLCBcIkR3YXJmXCIsIFwiT3JjXCJdXG4gICAgfTtcbiAgICBkaWFsb2dzLmFjdGlvbihvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHsgXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgfSk7XG59Il19