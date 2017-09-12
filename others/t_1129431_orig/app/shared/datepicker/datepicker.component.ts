import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
// import { TextField } from "ui/text-view";

@Component({

  selector: "date-picker-control",
   moduleId: module.id,
  templateUrl: 'datepicker.component.html',
  styleUrls: ["datepicker.css"]
})
export class DatePickerComponent {

  @Input() datevalue: string;

  public m1;
  public m2;
  public d1;
  public d2;
  public y1;
  public y2;
  public y3;
  public y4;

  public updatedDate;
   @ViewChild("m1Field") m1Field: ElementRef;

  @Output() dateChange = new EventEmitter();

  constructor(private _page: Page) {
  }

  ngOnInit() {
    if(this.datevalue!==""){
      this.m1 = this.datevalue.charAt(0);
    this.m2 = this.datevalue.charAt(1);
    this.d1 = this.datevalue.charAt(3);
    this.d2 = this.datevalue.charAt(4);
    this.y1 = this.datevalue.charAt(6);
    this.y2 = this.datevalue.charAt(7);
    this.y3 = this.datevalue.charAt(8);
    this.y4 = this.datevalue.charAt(9);
    this.updatedDate = this.m1 + this.m2 + '/' + this.d1 + this.d2 + '/' + this.y1 + this.y2 + this.y3 + this.y4;
    }
    
  }

  public onDateValueChange(newValue, oldValue, currentField, nextField, bindingVar, domId) {
    var tfield: TextField = <TextField>this._page.getViewById(domId);
    if (newValue.toString().length > 1) {
	
      let targetValue = newValue.replace(oldValue, "");
	
      this[bindingVar] = targetValue;
      tfield.text = targetValue;
    }
    if (nextField && newValue) {
      nextField.focus();
    }
    this.updatedDate = this.m1 + this.m2 + '/' + this.d1 + this.d2 + '/' + this.y1 + this.y2 + this.y3 + this.y4;
    this.dateChange.emit(this.updatedDate);
  }
  public clearDate(){
    this.m1 = "";
    this.m2 = "";
    this.d1 = "";
    this.d2 = "";
    this.y1 = "";
    this.y2 = "";
    this.y3 = "";
    this.y4 = "";    
    setTimeout(() => {
        let txtfld1 = <TextField>this.m1Field.nativeElement;
        txtfld1.focus(); 
        }, 1000);
  }
  }
