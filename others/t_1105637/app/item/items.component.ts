import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Observable as RxObservable } from "rxjs/Observable";
import { ObservableArray } from 'data/observable-array';

import { Item } from "./item";
import { ItemService } from "./item.service";
import { BarSeries } from "nativescript-telerik-ui-pro/chart"
import { RadCartesianChartComponent } from "nativescript-telerik-ui-pro/chart/angular"

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    categoricalSource: ObservableArray<any>;

    @ViewChild("chart") chart: RadCartesianChartComponent;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        // this.test1(); //works fine
        this.test2(); //does not work
        // this.test3(); //does not work

        
    }

//works fine
test1() {
    this.categoricalSource = new ObservableArray([
        { Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
        { Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
        { Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
        { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
        { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
    ]);
}

//does not work
test2() {
    setTimeout(() => {
        this.categoricalSource = new ObservableArray([
            { Country: "Austria", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
            { Country: "Romania", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
            { Country: "Pery", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
            { Country: "Brazil", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
            { Country: "China", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
        ]);
    });

    console.log(this.chart.nativeElement);
    console.log(this.chart.cartesianChart);
    console.log(this.chart.cartesianChart.palettes); // undefiend
    console.log(this.chart.cartesianChart.series); // undefined
}

//does not work
test3() {
    RxObservable.create((observer) => {
        setTimeout(() => {
            observer.next([
                { Country: "Honduras", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
                { Country: "Sudan", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
                { Country: "Australia", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
                { Country: "Canada", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
                { Country: "Russia", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
            ]);
        }, 1000);
    }).subscribe((res) => {
        this.categoricalSource = res;
    });
}


}