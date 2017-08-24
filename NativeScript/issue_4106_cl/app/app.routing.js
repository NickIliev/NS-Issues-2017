"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_guard_service_1 = require("./auth-guard.service");
exports.authProviders = [
    auth_guard_service_1.AuthGuard
];
exports.appRoutes = [
    { path: "", redirectTo: "/main-menu", pathMatch: "full" }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUFpRDtBQUVwQyxRQUFBLGFBQWEsR0FBRztJQUMzQiw4QkFBUztDQUNWLENBQUM7QUFFVyxRQUFBLFNBQVMsR0FBRztJQUN2QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0NBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tIFwiLi9hdXRoLWd1YXJkLnNlcnZpY2VcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhQcm92aWRlcnMgPSBbXG4gIEF1dGhHdWFyZFxuXTtcblxuZXhwb3J0IGNvbnN0IGFwcFJvdXRlcyA9IFtcbiAgeyBwYXRoOiBcIlwiLCByZWRpcmVjdFRvOiBcIi9tYWluLW1lbnVcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9XG5dO1xuIl19