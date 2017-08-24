import viewModel = require("./autocomplete-events-model");

declare var android: any;

export function onPageLoaded(args){
    var page = args.object;

    page.bindingContext = new viewModel.ViewModel(args);
}

export function onAutoCompleteLoaded(args) {
    var autocmp = args.object
 
    console.log("autocmp: " + autocmp)
 
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
}