import { Injectable } from "@angular/core";
import { getString, setString, getBoolean, setBoolean } from "application-settings";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { User } from "./user.model";
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
var dialogsModule = require("ui/dialogs");
import { LoginService } from "./login.service";
/*import { Message, GroupIds, Msg, Customer, Client, GetGroupMembers, updateGroupMembers, updateGroup } from "../chat/chat-model";
import { Contact, CreateGroupRequestModel, Signature, Picture, UserProfileUpdate } from "../main/home-screen-model";*/

const UserID = "UserID";
@Injectable()
export class HieberService {

    // OLD Base URL for requesting Token from Identity server 
    // private tokenUrl = 'http://192.168.103.120/IdSrv/connect';b 
    private baseApiUrl = 'https://Host.begis.de/Hieber/Test/MessageApi/api';


    // NEW Base URL for requesting Token from Identity server 
    // private tokenUrl= 'http://host.begis.de/Test/IdSrv/connect';
    // private baseApiUrl = 'https://host.begis.de/Test/MessageApi/api';

    // New end Points
    private tokenUrl = 'https://Host.begis.de/HieberWeb_Test/Identity/connect';
    /*private baseApiUrl = 'http://192.168.103.120/CmsIdSrv/identity';*/
    currentId: number;
    registerDeviceToken: string;
    constructor(private routerExtensions: RouterExtensions,
        private http: Http, private loginService: LoginService) {
    }

    /** ========================================= PushNotification ========================================= */

    // Register device for Push Notification
    registerDevice(deviceId: string, token: string, deviceType: number) {
        let headers = this.getHeadersEncoded();
        this.registerDeviceToken = getString("deviceID", deviceId);
        return this.http.post(
            this.baseApiUrl + '/PushNotification?deviceid=' + this.registerDeviceToken + '&type=' + deviceType, {
                // Empty body 
            },
            { headers: headers }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

    // Get All Push Notifications
    getPushNotifications() {
        let headers = this.getHeadersEncoded();
        return this.http.get(
            this.baseApiUrl + '/PushNotification', {
                headers: headers
            }).map(res => res.json())
            .catch(this.handleErrors);
    }

    /** ========================================= Current User Details ========================================= */

    currentUserDetail() {
        let headers = this.getHeadersEncoded();
        return this.http.get(
            this.baseApiUrl + '/CurrentUser', {
                headers: headers
            }).map(res => res.json())
            .catch(this.handleErrors);
    }

    putUserStatus(statusId: number) {

        let headers = this.getHeadersEncoded();
        return this.http.put(this.baseApiUrl + '/PutUserStatus?userstatusid=' + statusId, {}, { headers: headers }).map(res => res.json())
            .catch(this.handleErrors);

    }

    /** =========================================All User API services ========================================= */

    private getHeaders() {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + this.loginService.getToken());
        return headers;
    }

    private getHeadersURLWebEncoded() {
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Authorization", "Bearer " + this.loginService.getToken());
        return headers;

    }

    private getHeadersEncoded() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + this.loginService.getToken());
        return headers;
    }

/*    postProfileImage(imageMsg: Picture) {
        let headers = this.getHeadersEncoded();
        return this.http.post(this.baseApiUrl + '/Picture', imageMsg, { headers: headers }).map(res => res.json())
            .catch(this.handleErrors);

    }*/

    putUser(user: string) {
        let headers = this.getHeadersEncoded();
        return this.http.put(this.baseApiUrl + '/User', user, { headers: headers }).map(res => res.json())
            .catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

    /** get User by ID */
    getUserById() {

    }

    /** get User by Customer ID & Client ID & Principle ID */
    getUserByCustomerClientPricipleId() {

    }

    /** post User or Add User  */
    addUser() {

    }

    /** put...update User details */
    updateUser() {

    }

    /** Delete User.. Delete User details */
    deleteUser() {

    }

    /** =========================================All Contact API services ========================================= */

    /** get contact */
    getContact() {
        let headers = this.getHeaders();
        return this.http.get(
            this.baseApiUrl + '/contact', {
                headers: headers
            }).map(res => res.json())

            .catch(this.handleErrors);
    }

    /** Add contact */
    addContact() {

    }

    /** Delete contact */
    deleteContact() {

    }

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
    getChatUser() {
        let headers = this.getHeaders();
        return this.http.get(

            this.baseApiUrl + '/ChatUser', {
                headers: headers
            }).map(res => res.json())
            .catch(this.handleErrors);

    }

    /** get all chat by user ID */
    getChatByUserId(id: number) {
        let headers = this.getHeaders();
        return this.http.get(
            this.baseApiUrl + '/ChatUser?userid=' + id, {
                headers: headers
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

    /** Delete Chat by User ID */

    deleteChatbyId(id: number) {
        let headers = this.getHeaders();
        return this.http.delete(
            this.baseApiUrl + '/ChatUser?userid=' + id, {
                headers: headers
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

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

    getChatConversationAll() {
        return this.http.get(
            this.baseApiUrl + '/GetLastMessagesAll', {
                headers: this.getHeadersEncoded()
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }


    /**  Post msg added getHeadersURLWebEncoded*/
    messagePost(userid: number, msg: string, date: string) {
        let headers = this.getHeadersURLWebEncoded();
        var content = "MessageID=" + -1 + "&Title=" + "title" + "&Subject=" + "subject" + "&Text=" + msg + "&Date=" + date;
        return this.http.post(
            this.baseApiUrl + '/Message?userid=' + userid, content, {
                headers: headers
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }
    /**  Post msg added getHeadersURLWebEncoded*/
    messagePostImage(userid: number, msg: string) {
        let headers = this.getHeadersEncoded();
        var content = JSON.stringify(msg);
        return this.http.post(
            this.baseApiUrl + '/Message?userid=' + userid, msg, {
                headers: headers
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

    deleteMessagebyId(messageId: number) {
        let headers = this.getHeadersEncoded();
        return this.http.delete(
            this.baseApiUrl + '/Message?messageid=' + messageId, {
                headers: headers
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }
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

    getallgroupChats(userid: number) {
        return this.http.get(
            this.baseApiUrl + '/Group?userid=' + userid, {
                headers: this.getHeaders()
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

    postMsgGroupChat(msg: string) {
        return this.http.post(
            this.baseApiUrl + '/GroupMessage', msg, {
                headers: this.getHeadersEncoded()
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

    /** get all chat by user ID */
    getGroupChatMsgs(groupid: number) {
        let headers = this.getHeaders();
        return this.http.get(
            this.baseApiUrl + '/ChatGroup?groupid=' + groupid, {
                headers: headers
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

   /* getGroupContacts(groupid: number) {
        let headers = this.getHeaders();
        return this.http.get(
            this.baseApiUrl + '/GroupMember?groupid=' + groupid, {
                headers: headers
            }
        ).map(res => <GetGroupMembers>res.json())
            .catch(this.handleErrors);
    }*/

    deleteGroupContact(deletegroupMemberID: number) {
        let headers = this.getHeadersEncoded();
        return this.http.delete(
            this.baseApiUrl + '/GroupMember/' + deletegroupMemberID, {
                headers: headers
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

    postBroadcastMsg(msg: string) {
        return this.http.post(
            this.baseApiUrl + '/Broadcast', msg, {
                headers: this.getHeadersEncoded()
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

    getBroadcastContactList(msg: string) {
        return this.http.post(
            this.baseApiUrl + '/PostGroupUsers', msg, {
                headers: this.getHeadersEncoded()
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

    /** ========================================= Groups API services ========================================= */

    /** Return a Group by Id */
    getGroupbyId(groupid: number) {
        let headers = this.getHeaders();
        return this.http.get(
            this.baseApiUrl + '/Group?id=' + groupid, {
                headers: headers
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }
    /** Delete a Group */
    deleteGroup(body: string) {
        let headers = this.getHeadersEncoded();
        let options = new RequestOptions({
            headers: headers,
            body: body
        });

        return this.http.delete(
            this.baseApiUrl + '/Group', options
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

    /** ========================================= User Profile ========================================= */

    getUserSignatures(userId: number) {
        let headers = this.getHeadersEncoded();
        return this.http.get(this.baseApiUrl + '/Signature?userid=' + userId, { headers: headers }).map(res => res.json())
            .catch(this.handleErrors);
    }
    /*postUserSignature(signature: Signature) {
        let headers = this.getHeadersEncoded();
        return this.http.post(this.baseApiUrl + '/Signature', signature, { headers: headers }).map(res => res.json())
            .catch(this.handleErrors);
    }*/

    deleteSignatureById(signatureId: number) {
        let headers = this.getHeadersEncoded();
        return this.http.delete(
            this.baseApiUrl + '/Signature/' + signatureId, {
                headers: headers
            }
        ).map(res => res.json())
            .catch(this.handleErrors);
    }

}

