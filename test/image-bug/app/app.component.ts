import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import * as Platform from "platform";

@Component({
  selector: "main",
  template: `<page-router-outlet></page-router-outlet>`
})
export class AppComponent implements OnInit{

  constructor(
    ) {
  }

  ngOnInit(){
  }

}
