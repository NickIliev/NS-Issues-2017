"use strict";
var core_1 = require("@angular/core");
var ParentComponent = (function () {
    function ParentComponent() {
    }
    return ParentComponent;
}());
ParentComponent = __decorate([
    core_1.Component({
        selector: "parent",
        moduleId: module.id,
        template: "\n    <StackLayout class=\"parent-class\">\n        <child></child>\n    </StackLayout>\n    ",
        styles: ["\n    .parent-class .label-one {\n        color:green;\n    }\n    StackLayout Label {\n        font-size: 48;\n        background-color: green;\n    }\n    "]
    })
], ParentComponent);
exports.ParentComponent = ParentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEwQztBQW9CMUMsSUFBYSxlQUFlO0lBQTVCO0lBQThCLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFBL0IsSUFBK0I7QUFBbEIsZUFBZTtJQWxCM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsK0ZBSVQ7UUFDRCxNQUFNLEVBQUUsQ0FBQywrSkFRUixDQUFDO0tBQ0wsQ0FBQztHQUNXLGVBQWUsQ0FBRztBQUFsQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBhcmVudFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJwYXJlbnQtY2xhc3NcIj5cbiAgICAgICAgPGNoaWxkPjwvY2hpbGQ+XG4gICAgPC9TdGFja0xheW91dD5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAucGFyZW50LWNsYXNzIC5sYWJlbC1vbmUge1xuICAgICAgICBjb2xvcjpncmVlbjtcbiAgICB9XG4gICAgU3RhY2tMYXlvdXQgTGFiZWwge1xuICAgICAgICBmb250LXNpemU6IDQ4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbiAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgUGFyZW50Q29tcG9uZW50IHt9Il19