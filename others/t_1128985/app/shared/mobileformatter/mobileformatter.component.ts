import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
// import { TextField } from "ui/text-view";

@Component({

  selector: "mobile-formmater-control",
   moduleId: module.id,
  templateUrl: 'mobileformatter.component.html',
  styleUrls: ["mobileformatter.css"]
})
export class MobileFormatterComponent {

  @Input() numbervalue: string;

  public p1;
  public p2;
  public p3;
  public p4;
  public p5;
  public p6;
  public p7;
  public p8;
  public p9;
  public p10;

  public updatedNumber;
   @ViewChild("p1Field") p1Field: ElementRef;

  @Output() numberChange = new EventEmitter();

  constructor(private _page: Page) {
  }

  ngOnInit() {
    if(this.numbervalue!=""){
    this.p1 = this.numbervalue.charAt(1);
    this.p2 = this.numbervalue.charAt(2);
    this.p3 = this.numbervalue.charAt(3);
    this.p4 = this.numbervalue.charAt(5);
    this.p5 = this.numbervalue.charAt(6);
    this.p6 = this.numbervalue.charAt(7);
    this.p7 = this.numbervalue.charAt(9);
    this.p8 = this.numbervalue.charAt(10);
    this.p9 = this.numbervalue.charAt(11);
    this.p10 = this.numbervalue.charAt(12);

    this.updatedNumber = '('+this.p1 + this.p2 +  this.p3 +')'+ this.p4+ this.p5 + this.p6 +'-'+ this.p7 + this.p8+this.p9+this.p10;
    }
    
  }

  public onMobileNoValueChange(newValue, oldValue, currentField, nextField, bindingVar, domId) {
    var tfield: TextField = <TextField>this._page.getViewById(domId);
    if (newValue.toString().length > 1) {
	
      let targetValue = newValue.replace(oldValue, "");
	
      this[bindingVar] = targetValue;
      tfield.text = targetValue;
    }
    if (nextField && newValue) {
      nextField.focus();
    }
     this.updatedNumber = '('+this.p1 + this.p2 +  this.p3 +')'+ this.p4+ this.p5 + this.p6 +'-'+ this.p7 + this.p8+this.p9+this.p10;
    this.numberChange.emit(this.updatedNumber);
  }
  public clearDate(){
    this.p1 = "";
    this.p2 = "";
    this.p3 = "";
    this.p4 = "";
    this.p5 = "";
    this.p6 = "";
    this.p7 = "";
    this.p8 = "";
    this.p9 = "";
    this.p10 = "";
    setTimeout(() => {
        let txtfld1 = <TextField>this.p1Field.nativeElement;
        txtfld1.focus(); 
        }, 1000);
  }
  }
