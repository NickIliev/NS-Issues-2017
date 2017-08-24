export class newUITextFieldDelegateImpl extends NSObject implements UITextFieldDelegate {

    public static ObjCProtocols = [UITextFieldDelegate];

    private _originalDelegate: UITextFieldDelegate;

    public static initWithOriginalDelegate(originalDelegate: UITextFieldDelegate): newUITextFieldDelegateImpl {
        console.log("initWithOwner")

        let delegate = <newUITextFieldDelegateImpl>newUITextFieldDelegateImpl.new();
        delegate._originalDelegate = originalDelegate;
    
        console.log("delegate: " + delegate);
        console.log("delegate._originalDelegate: " + delegate._originalDelegate);
        return delegate;
    }

    public textFieldDidEndEditing(textField: UITextField) {
        console.log("textFieldDidEndEditing");

    }

    public textFieldShouldBeginEditing(textField: UITextField): boolean {
        console.log("textFieldShouldBeginEditing");

        var returnBoolean = true; // the method implementation in IOS requires returing boolean value (returnunt true just for test)
        return returnBoolean;
    }

    public textFieldShouldClear(textField: UITextField) {
        console.log("textFieldShouldClear");
        return this._originalDelegate.textFieldShouldClear(textField);
    }

    public textFieldShouldReturn(textField: UITextField): boolean {
        console.log("textFieldShouldReturn");

        var returnBoolean = true; // the method implementation in IOS requires returing boolean value (returnunt true just for test)
        return returnBoolean;
    }

    public textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacementString: string): boolean {
        console.log("textFieldDidEndEditing");
        
        var returnBoolean = true; // the method implementation in IOS requires returing boolean value (returnunt true just for test)
        return returnBoolean;
    }
}


