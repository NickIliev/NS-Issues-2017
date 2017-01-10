import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ScrollView } from "ui/scroll-view";
import { Button } from "ui/button";
import { GridLayout } from "ui/layouts/grid-layout";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {

    @ViewChild("myScroller") sv: ElementRef;
    @ViewChild("btn") btn: ElementRef;
    @ViewChild("grid") gr: ElementRef;

    scrollLayout: ScrollView;
    button: Button;
    grid: GridLayout;

    ngOnInit() {
        this.scrollLayout = this.sv.nativeElement;
        this.button = this.btn.nativeElement; 

        this.grid = this.gr.nativeElement;
    }

    public scrollTo() {
        this.scrollLayout.scrollToVerticalOffset(this.grid.getLocationRelativeTo(this.button).y, false);   
    }

}
