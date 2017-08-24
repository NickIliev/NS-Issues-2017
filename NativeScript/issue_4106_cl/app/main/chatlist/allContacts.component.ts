import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnChanges, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import * as utils from "utils/utils";
import { HieberService } from "../../shared";
import { Page } from "ui/page";
import { ListView } from "ui/list-view";
import { alert } from "../../shared";
import { ObservableArray } from "data/observable-array";
declare var UIColor: any;
import { Router, NavigationExtras } from '@angular/router';
import { connectionType, getConnectionType } from "connectivity";
import { getNumber } from "application-settings";
var Sqlite = require("nativescript-sqlite");

class Contact {
    name: string;
    userid: number;

    constructor(name: string, userid: number) {
        this.name = name;
        this.userid = userid;
    }
}
@Component({
    selector: "gr-all-contacts-list",
    templateUrl: "main/chatlist/allContacts.component.html",
    styleUrls: ["main/main-common.css"],
    providers: [HieberService]
})
export class AllContacts implements OnInit, AfterViewInit {

    private static CLASS_NAME = "AllContacts = ";


    private database: any;
    public contactsData: Array<any>;
    @Input() row;
    public chat: ObservableArray<Contact>;
    public isVisible: boolean = true;

    private chatList = [];

    // LoggedIn User ID
    senderID: number;

    contactListLengthCheck = 0;
    contactLengthSave: number;
    private timerForUpdateContactList: number;

    //Activity indicatior
    isAuthenticating = false;

    public contacts: Array<string> = [];
    public userIDsContacts: Array<number> = [];

    constructor(private page: Page, private hieberService: HieberService, private router: Router) {
    }

    public insert() {
        this.database.execSQL("INSERT INTO contact (firstname, lastname) VALUES (?, ?)", ["Nic", "Raboy"]).then(id => {
            this.fetch();
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    public fetch() {
        this.database.all("SELECT * FROM contact").then(rows => {
            this.contactsData = [];
            for (var row in rows) {
                this.contactsData.push({
                    "id": rows[row][0],
                    "firstname": rows[row][1],
                    "lastname": rows[row][2]
                });
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    ngOnInit() {
       // this.insert();
          this.getContact();
    }

    ngAfterViewInit() {
        // set the Timer to get updates while on this component
        //  this.timerForUpdateContactList = setInterval(()=> this.getUpdateContactList(), 50000);
      
    }

    ngOnDestroy() {
        // clearInterval when component is destroy
         clearInterval(this.timerForUpdateContactList);   
    }

    private getUpdateContactList() {
        this.getContact();
    }

    // Web service call to getContact 
    private getContact() {
        this.isAuthenticating = true;
        if (getConnectionType() === connectionType.none) {
            this.isAuthenticating = false;
            return;
        }
        this.hieberService.getContact()
            .subscribe(
            (data) => {
                var resultData = JSON.parse(JSON.stringify(data));
                this.contactLengthSave = resultData.length;
                if (this.contactListLengthCheck == this.contactLengthSave) {
                    console.log(AllContacts.CLASS_NAME + "length matched");
                    return;
                }
                this.chatList = [];
                this.chat = new ObservableArray(this.chatList);
                this.contactListLengthCheck = this.contactLengthSave;
                for (var i = 0; i < JSON.parse(JSON.stringify(data)).length; i++) {
                    var resultChat = JSON.parse(JSON.stringify(data))
                    var chatData = { "name": resultChat[i].Name, "userid": resultChat[i].UserID };
                    this.chatList.push(chatData);
                }
                // this.compare(this.chatList);
                this.chat = new ObservableArray(this.chatList);
                this.chat.sort(function (left, right) { return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1) });
            },
            (error) => {
                this.isAuthenticating = false;
                // alert("Unfortunately we could not get contacts.");
            },
            () => {
                this.isAuthenticating = false;
                // console.log(AllContacts.CLASS_NAME + " Get all Contacts working fine.");
            },
        );
    }

    //  public compare(data:any){
    //      var test
    //      for(var i =0; i< data.length; i++){
    //          console.log(data[i].name);
    //        this.contacts.push(data[i].name);
    //        this.userIDsContacts.push(data[i].userid); 
    //      }  
    //      console.log(this.contacts.sort())+ "Sorted Array";
    //     //  this.chat = new ObservableArray(this.contacts);    

    //  }

    // on Chat item selected 
    public chatItemSelected(args) {
        var data = args.view.bindingContext;
        this.senderID = getNumber("userID");
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "OtherName": data.name,
                "chatUserId": data.userid,
                "senderID": this.senderID
            }
        }
        this.router.navigate(["/tc-chat"], navigationExtras);
    }

    // The following trick makes the background color of each cell
    // in the UITableView transparent as it’s created.
    makeBackgroundTransparent(args) {
        let cell = args.ios;
        if (cell) {
            // support XCode 8
            cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
        }
    }

}

