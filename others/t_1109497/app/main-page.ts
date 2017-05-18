import { EventData, PropertyChangeData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { TextField } from "ui/text-field";
import { Switch } from "ui/switch";

import { android as androidApp, ios as iosApp } from "application";

import { RadAutoCompleteTextView } from "nativescript-telerik-ui-pro/autocomplete";

var delegateModule;
if (iosApp) {
    delegateModule = require("./delegate");
} 

declare var android: any;

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    let tf = <TextField>page.getViewById("tf");
    let sw = <Switch>page.getViewById("sw");

    // the event name is concatanating the property name "text" with key word "Change" = "textChange"
    // tf.on("textChange", (args: PropertyChangeData) => {
    //     console.log("text changed for text-field!");

    //     console.log(args.eventName); // textChange
    //     console.log(args.propertyName); // text
    //     console.log(args.object); // TextField<tf
    //     console.log(args.value);
    //     console.log(args.oldValue);
    // })

    // the event name is concatanating the property name "checked" with key word "Change" = "checkedChange"
    // sw.on("checkedChange", (args: PropertyChangeData) => {
    //     console.log("switch checked change!");

    //     console.log(args.eventName); // checkedChange
    //     console.log(args.propertyName); // checked
    //     console.log(args.object); // Switch<sw>
    //     console.log(args.value);
    //     console.log(args.oldValue);
    // })

    page.bindingContext = new HelloWorldModel();
}

export function onRadLoaded(args) {
    var autocmp = <RadAutoCompleteTextView>args.object;

    console.log("autocmp: " + autocmp);

    // for (var key in autocmp) {
    //     if (autocmp.hasOwnProperty(key)) {
    //         var element = autocmp[key];
    //         console.log(key + ": " + element)
    //     }
    // }

    if (androidApp) {
        var nativeTField = autocmp.android.getTextField();
        console.log("nativeTextField: " + nativeTField) // android.widget.EditText

        nativeTField.addTextChangedListener(new android.text.TextWatcher({

            afterTextChanged(s) {
                console.log("afterTextChanged");
                console.log(s);
            },
            beforeTextChanged(s, start, count, after) {
                console.log("beforeTextChanged");
                console.log(s);
                console.log(start);
                console.log(count);
                console.log(after);
            },
            onTextChanged(s, start, before, count) {
                console.log("onTextChanged");
                console.log(s);
                console.log(start);
                console.log(before);
                console.log(count);
            }
        }));
    } else if (iosApp) {
        var tkAutoCompleteTextView = autocmp.nativeView; 
        console.log("tkAutoCompleteTextView for iOS: " + tkAutoCompleteTextView) // TKAutoCompleteTextView 

        var originalDelegate = tkAutoCompleteTextView.delegate; 
        console.log("originalDelegate: " + originalDelegate); // AutoCompleteDelegateImpl

        for (var key in originalDelegate) {
            if (originalDelegate.hasOwnProperty(key)) {
                var element = originalDelegate[key];
                console.log(key+ ": " +element);
            }
        }

        var tkModifiedTextField = tkAutoCompleteTextView.textField;
        console.log("tkModifiedTextField: " + tkModifiedTextField); // TKModifiedTextField extended UITextField

        let newDelegate = delegateModule.newUITextFieldDelegateImpl.initWithOriginalDelegate(tkAutoCompleteTextView.delegate);
        tkAutoCompleteTextView._delegate = newDelegate;

        tkModifiedTextField.delegate = newDelegate;
    }
}