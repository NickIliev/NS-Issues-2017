import viewModel = require("./autocomplete-getting-started-model");
import { Page } from "ui/page";
import { RadAutoCompleteTextView, AutoCompleteEventData } from "nativescript-telerik-ui-pro/autocomplete";
import { Color } from "color";
import * as fs from "file-system";

declare var android:any;

export function onPageLoaded(args){
    var page = <Page>args.object;

    var autocmp = <RadAutoCompleteTextView>page.getViewById("autocmp");
    autocmp.showCloseButton = true;
    autocmp.closeButtonImageSrc = "res://my-close-image";

    var radAndroid = autocmp.android;

    var nativeEditText = radAndroid.getTextField();
    nativeEditText.setText("ala bala");

    page.bindingContext = new viewModel.ViewModel(args);
}


export function onRadAutoLoaded(args: AutoCompleteEventData) { 
    var autocomplete = <RadAutoCompleteTextView>args.object;

    // autocomplete.backgroundImage = "res://icon"; // will be set only for the EditText
    // autocomplete.borderColor = new Color("yellow"); // will be set only for the EditText
    // autocomplete.borderWidth = 5; // will be set only for the EditText

    console.log("autocomplete.android: " + autocomplete.android); // com.telerik.widget.autocomplete.RadAutoCompleteTextView
    var rad = autocomplete.android;

    console.log("nativeEditText: " + rad.getTextField()); //  android.widget.EditText
    var nativeEditText = rad.getTextField();

    nativeEditText.setTextColor((<any>android.graphics).Color.RED);
    nativeEditText.setTextSize(48);
    
    var currentApp = fs.knownFolders.currentApp(); // get the currwent app directory
    var fontPath = currentApp.path + "/fonts/Nasalization.ttf"; // concatanate the currentApp.path + the inner path to the font we are going to use
    nativeEditText.setTypeface(android.graphics.Typeface.createFromFile(fontPath));
    nativeEditText.setPadding(50, 10, 30, 100);
}