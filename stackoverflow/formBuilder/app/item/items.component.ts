import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",

})
export class ItemsComponent {
    public form: FormGroup;

    constructor(private fb: FormBuilder){
        this.form = this.fb.group({
            "Name": ["John"],
            "LastName": ["Smith"]
        });
    }

    public save(){
        console.log(JSON.stringify(this.form.value));
    }
}