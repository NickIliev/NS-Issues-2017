"use strict";
var swag = require("swagger-client");
function navigatingTo(args) {
    var page = args.object;
    var client = new swag.Swagger({
        url: 'http://petstore.swagger.io/v2/swagger.json',
        success: function () {
            client.pet.getPetById({ petId: 7 }, { responseContentType: 'application/json' }, function (pet) {
                console.log('pet', pet);
            });
        }
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxxQ0FBdUM7QUFFdkMsc0JBQTZCLElBQWU7SUFFeEMsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUU3QixJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDOUIsR0FBRyxFQUFFLDRDQUE0QztRQUNqRCxPQUFPLEVBQUU7WUFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLG1CQUFtQixFQUFFLGtCQUFrQixFQUFDLEVBQUMsVUFBUyxHQUFHO2dCQUN0RixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FDQSxDQUFDLENBQUM7QUFFUCxDQUFDO0FBYkQsb0NBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuXG5pbXBvcnQgKiBhcyBzd2FnIGZyb20gXCJzd2FnZ2VyLWNsaWVudFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuXG4gICAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcblxuICAgIHZhciBjbGllbnQgPSBuZXcgc3dhZy5Td2FnZ2VyKHtcbiAgICB1cmw6ICdodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby92Mi9zd2FnZ2VyLmpzb24nLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGllbnQucGV0LmdldFBldEJ5SWQoe3BldElkOjd9LHtyZXNwb25zZUNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbid9LGZ1bmN0aW9uKHBldCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwZXQnLCBwZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgfSk7XG5cbn0iXX0=