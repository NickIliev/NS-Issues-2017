"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_settings_1 = require("application-settings");
var http_1 = require("@angular/http");
var router_1 = require("nativescript-angular/router");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var dialogsModule = require("ui/dialogs");
var login_service_1 = require("./login.service");
/*import { Message, GroupIds, Msg, Customer, Client, GetGroupMembers, updateGroupMembers, updateGroup } from "../chat/chat-model";
import { Contact, CreateGroupRequestModel, Signature, Picture, UserProfileUpdate } from "../main/home-screen-model";*/
var UserID = "UserID";
var HieberService = (function () {
    function HieberService(routerExtensions, http, loginService) {
        this.routerExtensions = routerExtensions;
        this.http = http;
        this.loginService = loginService;
        // OLD Base URL for requesting Token from Identity server 
        // private tokenUrl = 'http://192.168.103.120/IdSrv/connect';b 
        this.baseApiUrl = 'https://Host.begis.de/Hieber/Test/MessageApi/api';
        // NEW Base URL for requesting Token from Identity server 
        // private tokenUrl= 'http://host.begis.de/Test/IdSrv/connect';
        // private baseApiUrl = 'https://host.begis.de/Test/MessageApi/api';
        // New end Points
        this.tokenUrl = 'https://Host.begis.de/HieberWeb_Test/Identity/connect';
    }
    /** ========================================= PushNotification ========================================= */
    // Register device for Push Notification
    HieberService.prototype.registerDevice = function (deviceId, token, deviceType) {
        var headers = this.getHeadersEncoded();
        this.registerDeviceToken = application_settings_1.getString("deviceID", deviceId);
        return this.http.post(this.baseApiUrl + '/PushNotification?deviceid=' + this.registerDeviceToken + '&type=' + deviceType, {}, { headers: headers }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    // Get All Push Notifications
    HieberService.prototype.getPushNotifications = function () {
        var headers = this.getHeadersEncoded();
        return this.http.get(this.baseApiUrl + '/PushNotification', {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** ========================================= Current User Details ========================================= */
    HieberService.prototype.currentUserDetail = function () {
        var headers = this.getHeadersEncoded();
        return this.http.get(this.baseApiUrl + '/CurrentUser', {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    HieberService.prototype.putUserStatus = function (statusId) {
        var headers = this.getHeadersEncoded();
        return this.http.put(this.baseApiUrl + '/PutUserStatus?userstatusid=' + statusId, {}, { headers: headers }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** =========================================All User API services ========================================= */
    HieberService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Bearer " + this.loginService.getToken());
        return headers;
    };
    HieberService.prototype.getHeadersURLWebEncoded = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Authorization", "Bearer " + this.loginService.getToken());
        return headers;
    };
    HieberService.prototype.getHeadersEncoded = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + this.loginService.getToken());
        return headers;
    };
    /*    postProfileImage(imageMsg: Picture) {
            let headers = this.getHeadersEncoded();
            return this.http.post(this.baseApiUrl + '/Picture', imageMsg, { headers: headers }).map(res => res.json())
                .catch(this.handleErrors);
    
        }*/
    HieberService.prototype.putUser = function (user) {
        var headers = this.getHeadersEncoded();
        return this.http.put(this.baseApiUrl + '/User', user, { headers: headers }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    HieberService.prototype.handleErrors = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error);
    };
    /** get User by ID */
    HieberService.prototype.getUserById = function () {
    };
    /** get User by Customer ID & Client ID & Principle ID */
    HieberService.prototype.getUserByCustomerClientPricipleId = function () {
    };
    /** post User or Add User  */
    HieberService.prototype.addUser = function () {
    };
    /** put...update User details */
    HieberService.prototype.updateUser = function () {
    };
    /** Delete User.. Delete User details */
    HieberService.prototype.deleteUser = function () {
    };
    /** =========================================All Contact API services ========================================= */
    /** get contact */
    HieberService.prototype.getContact = function () {
        var headers = this.getHeaders();
        return this.http.get(this.baseApiUrl + '/contact', {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** Add contact */
    HieberService.prototype.addContact = function () {
    };
    /** Delete contact */
    HieberService.prototype.deleteContact = function () {
    };
    /** get contact */
    /*    getContacts() {
            let headers = this.getHeaders();
            return this.http.get(
                this.baseApiUrl + '/contact', {
                    headers: headers
                }).map(res => <Contact>res.json())
    
                .catch(this.handleErrors);
        }*/
    /** ========================================= ChatUser API services ========================================= */
    /** get all chat user */
    HieberService.prototype.getChatUser = function () {
        var headers = this.getHeaders();
        return this.http.get(this.baseApiUrl + '/ChatUser', {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** get all chat by user ID */
    HieberService.prototype.getChatByUserId = function (id) {
        var headers = this.getHeaders();
        return this.http.get(this.baseApiUrl + '/ChatUser?userid=' + id, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** Delete Chat by User ID */
    HieberService.prototype.deleteChatbyId = function (id) {
        var headers = this.getHeaders();
        return this.http.delete(this.baseApiUrl + '/ChatUser?userid=' + id, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /*    editName(customer: Customer, client: Client) {
            let headers = this.getHeadersEncoded();
            return this.http.post(
                this.baseApiUrl + '' + customer, {}, {
                    headers: headers
                }
            ).map(res => res.json())
                .catch(this.handleErrors);
        }*/
    /** ========================================= Message API services ========================================= */
    HieberService.prototype.getChatConversationAll = function () {
        return this.http.get(this.baseApiUrl + '/GetLastMessagesAll', {
            headers: this.getHeadersEncoded()
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /**  Post msg added getHeadersURLWebEncoded*/
    HieberService.prototype.messagePost = function (userid, msg, date) {
        var headers = this.getHeadersURLWebEncoded();
        var content = "MessageID=" + -1 + "&Title=" + "title" + "&Subject=" + "subject" + "&Text=" + msg + "&Date=" + date;
        return this.http.post(this.baseApiUrl + '/Message?userid=' + userid, content, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /**  Post msg added getHeadersURLWebEncoded*/
    HieberService.prototype.messagePostImage = function (userid, msg) {
        var headers = this.getHeadersEncoded();
        var content = JSON.stringify(msg);
        return this.http.post(this.baseApiUrl + '/Message?userid=' + userid, msg, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    HieberService.prototype.deleteMessagebyId = function (messageId) {
        var headers = this.getHeadersEncoded();
        return this.http.delete(this.baseApiUrl + '/Message?messageid=' + messageId, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    // getAllReceivedUnreadMessagesByUser(userid: number){
    //     return this.http.get(
    //         this.baseApiUrl + '/ ReceivedMessage?from='+ -1 +"&to="+ userid,{
    //             headers: this.getHeadersEncoded()
    //         }
    //     ).map(res => res.json())
    //     .catch(this.handleErrors);
    // }
    /** ========================================= Group Chats by User API services ========================================= */
    // Create New Group
    /* postCreateNewGroup(msg: CreateGroupRequestModel) {
         let headers = this.getHeadersEncoded();
         var content;
         return this.http.post(
             this.baseApiUrl + '/Group', msg, {
                 headers: headers
             }
         ).map(res => res.json())
             .catch(this.handleErrors);
     }*/
    // Update Group
    /*    updateGroup(updateGrp: updateGroup) {
            let headers = this.getHeadersEncoded();
    
            return this.http.put(
                this.baseApiUrl + '/Group', JSON.stringify(updateGrp), {
                    headers: headers
                }
            ).map(res => res.json())
                .catch(this.handleErrors);
        }*/
    // Add more Member to Group Already Created
    /* postMoreContactToGroup(getGroupMembers: updateGroupMembers) {
         let headers = this.getHeadersEncoded();
         var content;
         return this.http.post(
             this.baseApiUrl + '/GroupMemberByUserId', getGroupMembers, {
                 headers: headers
             }
         ).map(res => res.json())
             .catch(this.handleErrors);
     }*/
    HieberService.prototype.getallgroupChats = function (userid) {
        return this.http.get(this.baseApiUrl + '/Group?userid=' + userid, {
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    HieberService.prototype.postMsgGroupChat = function (msg) {
        return this.http.post(this.baseApiUrl + '/GroupMessage', msg, {
            headers: this.getHeadersEncoded()
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** get all chat by user ID */
    HieberService.prototype.getGroupChatMsgs = function (groupid) {
        var headers = this.getHeaders();
        return this.http.get(this.baseApiUrl + '/ChatGroup?groupid=' + groupid, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /* getGroupContacts(groupid: number) {
         let headers = this.getHeaders();
         return this.http.get(
             this.baseApiUrl + '/GroupMember?groupid=' + groupid, {
                 headers: headers
             }
         ).map(res => <GetGroupMembers>res.json())
             .catch(this.handleErrors);
     }*/
    HieberService.prototype.deleteGroupContact = function (deletegroupMemberID) {
        var headers = this.getHeadersEncoded();
        return this.http.delete(this.baseApiUrl + '/GroupMember/' + deletegroupMemberID, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    HieberService.prototype.postBroadcastMsg = function (msg) {
        return this.http.post(this.baseApiUrl + '/Broadcast', msg, {
            headers: this.getHeadersEncoded()
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    HieberService.prototype.getBroadcastContactList = function (msg) {
        return this.http.post(this.baseApiUrl + '/PostGroupUsers', msg, {
            headers: this.getHeadersEncoded()
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** ========================================= Groups API services ========================================= */
    /** Return a Group by Id */
    HieberService.prototype.getGroupbyId = function (groupid) {
        var headers = this.getHeaders();
        return this.http.get(this.baseApiUrl + '/Group?id=' + groupid, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** Delete a Group */
    HieberService.prototype.deleteGroup = function (body) {
        var headers = this.getHeadersEncoded();
        var options = new http_1.RequestOptions({
            headers: headers,
            body: body
        });
        return this.http.delete(this.baseApiUrl + '/Group', options).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /** ========================================= User Profile ========================================= */
    HieberService.prototype.getUserSignatures = function (userId) {
        var headers = this.getHeadersEncoded();
        return this.http.get(this.baseApiUrl + '/Signature?userid=' + userId, { headers: headers }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    /*postUserSignature(signature: Signature) {
        let headers = this.getHeadersEncoded();
        return this.http.post(this.baseApiUrl + '/Signature', signature, { headers: headers }).map(res => res.json())
            .catch(this.handleErrors);
    }*/
    HieberService.prototype.deleteSignatureById = function (signatureId) {
        var headers = this.getHeadersEncoded();
        return this.http.delete(this.baseApiUrl + '/Signature/' + signatureId, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    return HieberService;
}());
HieberService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        http_1.Http, login_service_1.LoginService])
], HieberService);
exports.HieberService = HieberService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllYmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaWViZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2REFBb0Y7QUFDcEYsc0NBQXdFO0FBRXhFLHNEQUErRDtBQUMvRCw4QkFBcUM7QUFDckMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUMvQixJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUMsaURBQStDO0FBQy9DO3NIQUNzSDtBQUV0SCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUM7QUFFeEIsSUFBYSxhQUFhO0lBZ0J0Qix1QkFBb0IsZ0JBQWtDLEVBQzFDLElBQVUsRUFBVSxZQUEwQjtRQUR0QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzFDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWYxRCwwREFBMEQ7UUFDMUQsK0RBQStEO1FBQ3ZELGVBQVUsR0FBRyxrREFBa0QsQ0FBQztRQUd4RSwwREFBMEQ7UUFDMUQsK0RBQStEO1FBQy9ELG9FQUFvRTtRQUVwRSxpQkFBaUI7UUFDVCxhQUFRLEdBQUcsdURBQXVELENBQUM7SUFNM0UsQ0FBQztJQUVELDJHQUEyRztJQUUzRyx3Q0FBd0M7SUFDeEMsc0NBQWMsR0FBZCxVQUFlLFFBQWdCLEVBQUUsS0FBYSxFQUFFLFVBQWtCO1FBQzlELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxnQ0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsR0FBRyxVQUFVLEVBQUUs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O0lBRXZHLHlDQUFpQixHQUFqQixVQUFrQixNQUFjO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLG9CQUFvQixHQUFHLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUM7YUFDN0csS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUVILDJDQUFtQixHQUFuQixVQUFvQixXQUFtQjtRQUNuQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxHQUFHLFdBQVcsRUFBRTtZQUMzQyxPQUFPLEVBQUUsT0FBTztTQUNuQixDQUNKLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTCxvQkFBQztBQUFELENBQUMsQUFwYUQsSUFvYUM7QUFwYVksYUFBYTtJQUR6QixpQkFBVSxFQUFFO3FDQWlCNkIseUJBQWdCO1FBQ3BDLFdBQUksRUFBd0IsNEJBQVk7R0FqQmpELGFBQWEsQ0FvYXpCO0FBcGFZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi91c2VyLm1vZGVsXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xudmFyIGRpYWxvZ3NNb2R1bGUgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gXCIuL2xvZ2luLnNlcnZpY2VcIjtcbi8qaW1wb3J0IHsgTWVzc2FnZSwgR3JvdXBJZHMsIE1zZywgQ3VzdG9tZXIsIENsaWVudCwgR2V0R3JvdXBNZW1iZXJzLCB1cGRhdGVHcm91cE1lbWJlcnMsIHVwZGF0ZUdyb3VwIH0gZnJvbSBcIi4uL2NoYXQvY2hhdC1tb2RlbFwiO1xuaW1wb3J0IHsgQ29udGFjdCwgQ3JlYXRlR3JvdXBSZXF1ZXN0TW9kZWwsIFNpZ25hdHVyZSwgUGljdHVyZSwgVXNlclByb2ZpbGVVcGRhdGUgfSBmcm9tIFwiLi4vbWFpbi9ob21lLXNjcmVlbi1tb2RlbFwiOyovXG5cbmNvbnN0IFVzZXJJRCA9IFwiVXNlcklEXCI7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGllYmVyU2VydmljZSB7XG5cbiAgICAvLyBPTEQgQmFzZSBVUkwgZm9yIHJlcXVlc3RpbmcgVG9rZW4gZnJvbSBJZGVudGl0eSBzZXJ2ZXIgXG4gICAgLy8gcHJpdmF0ZSB0b2tlblVybCA9ICdodHRwOi8vMTkyLjE2OC4xMDMuMTIwL0lkU3J2L2Nvbm5lY3QnO2IgXG4gICAgcHJpdmF0ZSBiYXNlQXBpVXJsID0gJ2h0dHBzOi8vSG9zdC5iZWdpcy5kZS9IaWViZXIvVGVzdC9NZXNzYWdlQXBpL2FwaSc7XG5cblxuICAgIC8vIE5FVyBCYXNlIFVSTCBmb3IgcmVxdWVzdGluZyBUb2tlbiBmcm9tIElkZW50aXR5IHNlcnZlciBcbiAgICAvLyBwcml2YXRlIHRva2VuVXJsPSAnaHR0cDovL2hvc3QuYmVnaXMuZGUvVGVzdC9JZFNydi9jb25uZWN0JztcbiAgICAvLyBwcml2YXRlIGJhc2VBcGlVcmwgPSAnaHR0cHM6Ly9ob3N0LmJlZ2lzLmRlL1Rlc3QvTWVzc2FnZUFwaS9hcGknO1xuXG4gICAgLy8gTmV3IGVuZCBQb2ludHNcbiAgICBwcml2YXRlIHRva2VuVXJsID0gJ2h0dHBzOi8vSG9zdC5iZWdpcy5kZS9IaWViZXJXZWJfVGVzdC9JZGVudGl0eS9jb25uZWN0JztcbiAgICAvKnByaXZhdGUgYmFzZUFwaVVybCA9ICdodHRwOi8vMTkyLjE2OC4xMDMuMTIwL0Ntc0lkU3J2L2lkZW50aXR5JzsqL1xuICAgIGN1cnJlbnRJZDogbnVtYmVyO1xuICAgIHJlZ2lzdGVyRGV2aWNlVG9rZW46IHN0cmluZztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBsb2dpblNlcnZpY2U6IExvZ2luU2VydmljZSkge1xuICAgIH1cblxuICAgIC8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBQdXNoTm90aWZpY2F0aW9uID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyBSZWdpc3RlciBkZXZpY2UgZm9yIFB1c2ggTm90aWZpY2F0aW9uXG4gICAgcmVnaXN0ZXJEZXZpY2UoZGV2aWNlSWQ6IHN0cmluZywgdG9rZW46IHN0cmluZywgZGV2aWNlVHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzRW5jb2RlZCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGV2aWNlVG9rZW4gPSBnZXRTdHJpbmcoXCJkZXZpY2VJRFwiLCBkZXZpY2VJZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHRoaXMuYmFzZUFwaVVybCArICcvUHVzaE5vdGlmaWNhdGlvbj9kZXZpY2VpZD0nICsgdGhpcy5yZWdpc3RlckRldmljZVRva2VuICsgJyZ0eXBlPScgKyBkZXZpY2VUeXBlLCB7XG4gICAgICAgICAgICAgICAgLy8gRW1wdHkgYm9keSBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IGhlYWRlcnM6IGhlYWRlcnMgfVxuICAgICAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gICAgfVxuXG4gICAgLy8gR2V0IEFsbCBQdXNoIE5vdGlmaWNhdGlvbnNcbiAgICBnZXRQdXNoTm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9QdXNoTm90aWZpY2F0aW9uJywge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIH0pLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gICAgfVxuXG4gICAgLyoqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEN1cnJlbnQgVXNlciBEZXRhaWxzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBjdXJyZW50VXNlckRldGFpbCgpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9DdXJyZW50VXNlcicsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB9KS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICAgIH1cblxuICAgIHB1dFVzZXJTdGF0dXMoc3RhdHVzSWQ6IG51bWJlcikge1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzRW5jb2RlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VBcGlVcmwgKyAnL1B1dFVzZXJTdGF0dXM/dXNlcnN0YXR1c2lkPScgKyBzdGF0dXNJZCwge30sIHsgaGVhZGVyczogaGVhZGVycyB9KS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuXG4gICAgfVxuXG4gICAgLyoqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09QWxsIFVzZXIgQVBJIHNlcnZpY2VzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBwcml2YXRlIGdldEhlYWRlcnMoKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdGhpcy5sb2dpblNlcnZpY2UuZ2V0VG9rZW4oKSk7XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SGVhZGVyc1VSTFdlYkVuY29kZWQoKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRoaXMubG9naW5TZXJ2aWNlLmdldFRva2VuKCkpO1xuICAgICAgICByZXR1cm4gaGVhZGVycztcblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SGVhZGVyc0VuY29kZWQoKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0aGlzLmxvZ2luU2VydmljZS5nZXRUb2tlbigpKTtcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxuXG4vKiAgICBwb3N0UHJvZmlsZUltYWdlKGltYWdlTXNnOiBQaWN0dXJlKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzRW5jb2RlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlQXBpVXJsICsgJy9QaWN0dXJlJywgaW1hZ2VNc2csIHsgaGVhZGVyczogaGVhZGVycyB9KS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuXG4gICAgfSovXG5cbiAgICBwdXRVc2VyKHVzZXI6IHN0cmluZykge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZ2V0SGVhZGVyc0VuY29kZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlQXBpVXJsICsgJy9Vc2VyJywgdXNlciwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICAgIH1cblxuICAgIC8qKiBnZXQgVXNlciBieSBJRCAqL1xuICAgIGdldFVzZXJCeUlkKCkge1xuXG4gICAgfVxuXG4gICAgLyoqIGdldCBVc2VyIGJ5IEN1c3RvbWVyIElEICYgQ2xpZW50IElEICYgUHJpbmNpcGxlIElEICovXG4gICAgZ2V0VXNlckJ5Q3VzdG9tZXJDbGllbnRQcmljaXBsZUlkKCkge1xuXG4gICAgfVxuXG4gICAgLyoqIHBvc3QgVXNlciBvciBBZGQgVXNlciAgKi9cbiAgICBhZGRVc2VyKCkge1xuXG4gICAgfVxuXG4gICAgLyoqIHB1dC4uLnVwZGF0ZSBVc2VyIGRldGFpbHMgKi9cbiAgICB1cGRhdGVVc2VyKCkge1xuXG4gICAgfVxuXG4gICAgLyoqIERlbGV0ZSBVc2VyLi4gRGVsZXRlIFVzZXIgZGV0YWlscyAqL1xuICAgIGRlbGV0ZVVzZXIoKSB7XG5cbiAgICB9XG5cbiAgICAvKiogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1BbGwgQ29udGFjdCBBUEkgc2VydmljZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8qKiBnZXQgY29udGFjdCAqL1xuICAgIGdldENvbnRhY3QoKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9jb250YWN0Jywge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIH0pLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcblxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9XG5cbiAgICAvKiogQWRkIGNvbnRhY3QgKi9cbiAgICBhZGRDb250YWN0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqIERlbGV0ZSBjb250YWN0ICovXG4gICAgZGVsZXRlQ29udGFjdCgpIHtcblxuICAgIH1cblxuICAgIC8qKiBnZXQgY29udGFjdCAqL1xuLyogICAgZ2V0Q29udGFjdHMoKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9jb250YWN0Jywge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIH0pLm1hcChyZXMgPT4gPENvbnRhY3Q+cmVzLmpzb24oKSlcblxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9Ki9cblxuICAgIC8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBDaGF0VXNlciBBUEkgc2VydmljZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8qKiBnZXQgYWxsIGNoYXQgdXNlciAqL1xuICAgIGdldENoYXRVc2VyKCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZ2V0SGVhZGVycygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChcblxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9DaGF0VXNlcicsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB9KS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuXG4gICAgfVxuXG4gICAgLyoqIGdldCBhbGwgY2hhdCBieSB1c2VyIElEICovXG4gICAgZ2V0Q2hhdEJ5VXNlcklkKGlkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXG4gICAgICAgICAgICB0aGlzLmJhc2VBcGlVcmwgKyAnL0NoYXRVc2VyP3VzZXJpZD0nICsgaWQsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB9XG4gICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9XG5cbiAgICAvKiogRGVsZXRlIENoYXQgYnkgVXNlciBJRCAqL1xuXG4gICAgZGVsZXRlQ2hhdGJ5SWQoaWQ6IG51bWJlcikge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZ2V0SGVhZGVycygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShcbiAgICAgICAgICAgIHRoaXMuYmFzZUFwaVVybCArICcvQ2hhdFVzZXI/dXNlcmlkPScgKyBpZCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICAgIH1cblxuLyogICAgZWRpdE5hbWUoY3VzdG9tZXI6IEN1c3RvbWVyLCBjbGllbnQ6IENsaWVudCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZ2V0SGVhZGVyc0VuY29kZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJycgKyBjdXN0b21lciwge30sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB9XG4gICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9Ki9cblxuICAgIC8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBNZXNzYWdlIEFQSSBzZXJ2aWNlcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgZ2V0Q2hhdENvbnZlcnNhdGlvbkFsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXG4gICAgICAgICAgICB0aGlzLmJhc2VBcGlVcmwgKyAnL0dldExhc3RNZXNzYWdlc0FsbCcsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICAgIH1cblxuXG4gICAgLyoqICBQb3N0IG1zZyBhZGRlZCBnZXRIZWFkZXJzVVJMV2ViRW5jb2RlZCovXG4gICAgbWVzc2FnZVBvc3QodXNlcmlkOiBudW1iZXIsIG1zZzogc3RyaW5nLCBkYXRlOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnNVUkxXZWJFbmNvZGVkKCk7XG4gICAgICAgIHZhciBjb250ZW50ID0gXCJNZXNzYWdlSUQ9XCIgKyAtMSArIFwiJlRpdGxlPVwiICsgXCJ0aXRsZVwiICsgXCImU3ViamVjdD1cIiArIFwic3ViamVjdFwiICsgXCImVGV4dD1cIiArIG1zZyArIFwiJkRhdGU9XCIgKyBkYXRlO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICB0aGlzLmJhc2VBcGlVcmwgKyAnL01lc3NhZ2U/dXNlcmlkPScgKyB1c2VyaWQsIGNvbnRlbnQsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB9XG4gICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9XG4gICAgLyoqICBQb3N0IG1zZyBhZGRlZCBnZXRIZWFkZXJzVVJMV2ViRW5jb2RlZCovXG4gICAgbWVzc2FnZVBvc3RJbWFnZSh1c2VyaWQ6IG51bWJlciwgbXNnOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKCk7XG4gICAgICAgIHZhciBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkobXNnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9NZXNzYWdlP3VzZXJpZD0nICsgdXNlcmlkLCBtc2csIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB9XG4gICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9XG5cbiAgICBkZWxldGVNZXNzYWdlYnlJZChtZXNzYWdlSWQ6IG51bWJlcikge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZ2V0SGVhZGVyc0VuY29kZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoXG4gICAgICAgICAgICB0aGlzLmJhc2VBcGlVcmwgKyAnL01lc3NhZ2U/bWVzc2FnZWlkPScgKyBtZXNzYWdlSWQsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB9XG4gICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9XG4gICAgLy8gZ2V0QWxsUmVjZWl2ZWRVbnJlYWRNZXNzYWdlc0J5VXNlcih1c2VyaWQ6IG51bWJlcil7XG5cbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXG4gICAgLy8gICAgICAgICB0aGlzLmJhc2VBcGlVcmwgKyAnLyBSZWNlaXZlZE1lc3NhZ2U/ZnJvbT0nKyAtMSArXCImdG89XCIrIHVzZXJpZCx7XG4gICAgLy8gICAgICAgICAgICAgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzRW5jb2RlZCgpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC8vICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuXG4gICAgLy8gfVxuXG4gICAgLyoqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEdyb3VwIENoYXRzIGJ5IFVzZXIgQVBJIHNlcnZpY2VzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyBDcmVhdGUgTmV3IEdyb3VwXG4gICAvKiBwb3N0Q3JlYXRlTmV3R3JvdXAobXNnOiBDcmVhdGVHcm91cFJlcXVlc3RNb2RlbCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZ2V0SGVhZGVyc0VuY29kZWQoKTtcbiAgICAgICAgdmFyIGNvbnRlbnQ7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHRoaXMuYmFzZUFwaVVybCArICcvR3JvdXAnLCBtc2csIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB9XG4gICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9Ki9cblxuICAgIC8vIFVwZGF0ZSBHcm91cFxuLyogICAgdXBkYXRlR3JvdXAodXBkYXRlR3JwOiB1cGRhdGVHcm91cCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZ2V0SGVhZGVyc0VuY29kZWQoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChcbiAgICAgICAgICAgIHRoaXMuYmFzZUFwaVVybCArICcvR3JvdXAnLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVHcnApLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAgICAgfVxuICAgICAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gICAgfSovXG5cbiAgICAvLyBBZGQgbW9yZSBNZW1iZXIgdG8gR3JvdXAgQWxyZWFkeSBDcmVhdGVkXG4gICAvKiBwb3N0TW9yZUNvbnRhY3RUb0dyb3VwKGdldEdyb3VwTWVtYmVyczogdXBkYXRlR3JvdXBNZW1iZXJzKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzRW5jb2RlZCgpO1xuICAgICAgICB2YXIgY29udGVudDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9Hcm91cE1lbWJlckJ5VXNlcklkJywgZ2V0R3JvdXBNZW1iZXJzLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAgICAgfVxuICAgICAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gICAgfSovXG5cbiAgICBnZXRhbGxncm91cENoYXRzKHVzZXJpZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9Hcm91cD91c2VyaWQ9JyArIHVzZXJpZCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpXG4gICAgICAgICAgICB9XG4gICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9XG5cbiAgICBwb3N0TXNnR3JvdXBDaGF0KG1zZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHRoaXMuYmFzZUFwaVVybCArICcvR3JvdXBNZXNzYWdlJywgbXNnLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzRW5jb2RlZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9XG5cbiAgICAvKiogZ2V0IGFsbCBjaGF0IGJ5IHVzZXIgSUQgKi9cbiAgICBnZXRHcm91cENoYXRNc2dzKGdyb3VwaWQ6IG51bWJlcikge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZ2V0SGVhZGVycygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChcbiAgICAgICAgICAgIHRoaXMuYmFzZUFwaVVybCArICcvQ2hhdEdyb3VwP2dyb3VwaWQ9JyArIGdyb3VwaWQsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB9XG4gICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9XG5cbiAgIC8qIGdldEdyb3VwQ29udGFjdHMoZ3JvdXBpZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9Hcm91cE1lbWJlcj9ncm91cGlkPScgKyBncm91cGlkLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAgICAgfVxuICAgICAgICApLm1hcChyZXMgPT4gPEdldEdyb3VwTWVtYmVycz5yZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgICB9Ki9cblxuICAgIGRlbGV0ZUdyb3VwQ29udGFjdChkZWxldGVncm91cE1lbWJlcklEOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9Hcm91cE1lbWJlci8nICsgZGVsZXRlZ3JvdXBNZW1iZXJJRCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICAgIH1cblxuICAgIHBvc3RCcm9hZGNhc3RNc2cobXNnOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9Ccm9hZGNhc3QnLCBtc2csIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICAgIH1cblxuICAgIGdldEJyb2FkY2FzdENvbnRhY3RMaXN0KG1zZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHRoaXMuYmFzZUFwaVVybCArICcvUG9zdEdyb3VwVXNlcnMnLCBtc2csIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICAgIH1cblxuICAgIC8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBHcm91cHMgQVBJIHNlcnZpY2VzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvKiogUmV0dXJuIGEgR3JvdXAgYnkgSWQgKi9cbiAgICBnZXRHcm91cGJ5SWQoZ3JvdXBpZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9Hcm91cD9pZD0nICsgZ3JvdXBpZCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICAgIH1cbiAgICAvKiogRGVsZXRlIGEgR3JvdXAgKi9cbiAgICBkZWxldGVHcm91cChib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKCk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICBib2R5OiBib2R5XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9Hcm91cCcsIG9wdGlvbnNcbiAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICAgIH1cblxuICAgIC8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBVc2VyIFByb2ZpbGUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGdldFVzZXJTaWduYXR1cmVzKHVzZXJJZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzRW5jb2RlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VBcGlVcmwgKyAnL1NpZ25hdHVyZT91c2VyaWQ9JyArIHVzZXJJZCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gICAgfVxuICAgIC8qcG9zdFVzZXJTaWduYXR1cmUoc2lnbmF0dXJlOiBTaWduYXR1cmUpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VBcGlVcmwgKyAnL1NpZ25hdHVyZScsIHNpZ25hdHVyZSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gICAgfSovXG5cbiAgICBkZWxldGVTaWduYXR1cmVCeUlkKHNpZ25hdHVyZUlkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnNFbmNvZGVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKFxuICAgICAgICAgICAgdGhpcy5iYXNlQXBpVXJsICsgJy9TaWduYXR1cmUvJyArIHNpZ25hdHVyZUlkLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAgICAgfVxuICAgICAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gICAgfVxuXG59XG5cbiJdfQ==