import { Component} from '@angular/core'


export class DataItem {
    constructor(public itemDesc: string) {}
}


@Component({
    moduleId: module.id,
    selector: 'tab-bar',
    templateUrl: 'tab-bar.html',
    styleUrls:["tab-bar.css"]
})


export class TabBarComponent {
}