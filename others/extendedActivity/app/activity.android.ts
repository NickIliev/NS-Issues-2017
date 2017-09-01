import {setActivityCallbacks, AndroidActivityCallbacks} from "ui/frame";

@JavaProxy("org.myApp.MainActivity")
class Activity extends android.app.Activity {
    private _callbacks: AndroidActivityCallbacks;

    protected onCreate(savedInstanceState: android.os.Bundle): void {
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }

        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
    }

    protected onSaveInstanceState(outState: android.os.Bundle): void {
        this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    protected onStart(): void {
        this._callbacks.onStart(this, super.onStart);
    }

    protected onStop(): void {
        this._callbacks.onStop(this, super.onStop);
    }

    protected onDestroy(): void {
        this._callbacks.onDestroy(this, super.onDestroy);
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }

    public onRequestPermissionsResult(requestCode: number, permissions: Array<String>, grantResults: Array<number>): void {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    }

    protected onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
    }

    public dispatchKeyEvent(event) {
        // Which direction did the key move (up/down)
        let action = event.getAction();
    
        // What keywas pressed
        let keyCode = event.getKeyCode();
    
        switch (keyCode) {
            case android.view.KeyEvent.KEYCODE_VOLUME_UP:
                // Check your event code (KeyEvent.ACTION_DOWN, KeyEvent.ACTION_UP etc)
                console.log("KEYCODE_VOLUME_UP");
                return true;
            case android.view.KeyEvent.KEYCODE_VOLUME_DOWN:
                    // Check your event code (KeyEvent.ACTION_DOWN, KeyEvent.ACTION_UP etc)
                console.log("KEYCODE_VOLUME_DOWN");
                return true;
            default:
                // Let the system do what it wanted to do
                return super.dispatchKeyEvent(event);
        }
    }
}