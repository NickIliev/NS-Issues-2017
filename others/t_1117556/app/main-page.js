"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
var http = require("http");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function post() {
    var result;
    console.log("post");
    http.request({
        url: "https://httpbin.org/stream-bytes/55",
        method: "GET",
        headers: { "Content-Type": "arraybuffer" },
    }).then(function (response) {
        console.log(response.content);
    }).catch(function (err) {
        console.log("err: " + err);
    });
}
exports.post = post;
// "https://httpbin.org/image/png"
//  "https://httpbin.org/bytes/4" 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQW9EO0FBRXBELDJCQUE2QjtBQUU3QixzQkFBNkIsSUFBZTtJQUN4QyxJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRTdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQUpELG9DQUlDO0FBRUQ7SUFDSSxJQUFJLE1BQU0sQ0FBQztJQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNULEdBQUcsRUFBRSxxQ0FBcUM7UUFDMUMsTUFBTSxFQUFFLEtBQUs7UUFDYixPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFO0tBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQWJELG9CQWFDO0FBRUQsa0NBQWtDO0FBRWxDLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBIZWxsb1dvcmxkTW9kZWwgfSBmcm9tICcuL21haW4tdmlldy1tb2RlbCc7XG5cbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpbmdUbyhhcmdzOiBFdmVudERhdGEpIHtcbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIZWxsb1dvcmxkTW9kZWwoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvc3QoKSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBjb25zb2xlLmxvZyhcInBvc3RcIik7XG5cbiAgICBodHRwLnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9odHRwYmluLm9yZy9zdHJlYW0tYnl0ZXMvNTVcIixcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXJyYXlidWZmZXJcIiB9LFxuICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiArIGVycik7XG4gICAgfSlcbn1cblxuLy8gXCJodHRwczovL2h0dHBiaW4ub3JnL2ltYWdlL3BuZ1wiXG5cbi8vICBcImh0dHBzOi8vaHR0cGJpbi5vcmcvYnl0ZXMvNFwiIl19