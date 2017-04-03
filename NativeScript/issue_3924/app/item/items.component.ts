import { Component, OnInit } from "@angular/core";

import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    providers: [ItemService]
})
export class ItemsComponent implements OnInit {
    public host: string;
    public userAgent: string;
    public origin: string;
    public url: string;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemService.getData()
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            })
    }

    private onGetDataSuccess(res) {
        this.host = res.headers.Host;
        this.userAgent = res.headers["User-Agent"];
        this.origin = res.origin;
        this.url = res.url;
    }
}
