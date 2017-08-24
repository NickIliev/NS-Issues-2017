import { Component, ViewChild, ElementRef } from "@angular/core";
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    @ViewChild("tabview") tab: ElementRef;
    public tabTitles = ["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5", "Tab 6", "Tab 7"];
    public tabSelectedIndex: number;
    public tabView: TabView;
    public tabTitle: string;

    public counter: number = 16;

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }

    ngOnInit() {
        this.tabView = this.tab.nativeElement;
        this.tabView.on("selectedIndexChanged", (args: SelectedIndexChangedEventData) => {
          this.tabTitle = this.tabTitles[args.newIndex];
        });
        // if (this.tabView.ios){
        //     var uiTabBarController = this.tabView.ios;
        //     uiTabBarController.moreNavigationController.navigationBarHidden = true;
        // }
    }


    public onTap() {
        this.counter--;
    }
}
