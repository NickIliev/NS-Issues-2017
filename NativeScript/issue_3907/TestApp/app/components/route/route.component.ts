import { Component, OnInit } from "@angular/core";
import { Image } from 'ui/image'

@Component({
    moduleId: module.id,
    selector: "route",
    styleUrls: ["route.css"],
    templateUrl: "route.html",
})

export class RouteComponent implements OnInit {
    image: Image 
    description = "Test"

    ngOnInit(): void {
    }
}