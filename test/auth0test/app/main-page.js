"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_auth0_1 = require("nativescript-auth0");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    var lock = new nativescript_auth0_1.Auth0Lock({
        clientId: 'JCYQkCudTTZcvdfni2dOHbFVRqXJE0aC',
        domain: 'divided-zero.eu.auth0.com'
    });
    lock.show().then(function (res) {
        console.log("good auth!");
        //goToHomeOrWhatevs(); 
    }, function (error) {
        console.log(error);
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEseURBQStDO0FBRS9DLHdFQUF3RTtBQUN4RSxzQkFBNkIsSUFBZTtJQUV4QyxJQUFJLElBQUksR0FBRyxJQUFJLDhCQUFTLENBQUM7UUFDckIsUUFBUSxFQUFFLGtDQUFrQztRQUM1QyxNQUFNLEVBQUMsMkJBQTJCO0tBQ3JDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUIsdUJBQXVCO0lBQzNCLENBQUMsRUFBRSxVQUFDLEtBQUs7UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWJELG9DQWFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgQXV0aDBMb2NrIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hdXRoMFwiO1xuXG4vLyBFdmVudCBoYW5kbGVyIGZvciBQYWdlIFwibmF2aWdhdGluZ1RvXCIgZXZlbnQgYXR0YWNoZWQgaW4gbWFpbi1wYWdlLnhtbFxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpbmdUbyhhcmdzOiBFdmVudERhdGEpIHtcblxuICAgIHZhciBsb2NrID0gbmV3IEF1dGgwTG9jayh7XG4gICAgICAgIGNsaWVudElkOiAnSkNZUWtDdWRUVFpjdmRmbmkyZE9IYkZWUnFYSkUwYUMnLFxuICAgICAgICBkb21haW46J2RpdmlkZWQtemVyby5ldS5hdXRoMC5jb20nXG4gICAgfSk7XG5cbiAgICBsb2NrLnNob3coKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJnb29kIGF1dGghXCIpO1xuICAgICAgICAvL2dvVG9Ib21lT3JXaGF0ZXZzKCk7IFxuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG59Il19