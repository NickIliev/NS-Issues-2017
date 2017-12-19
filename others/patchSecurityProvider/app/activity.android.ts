import { setActivityCallbacks, AndroidActivityCallbacks } from "ui/frame";

@JavaProxy("org.myApp.MainActivity")
class Activity extends android.app.Activity {
    private _callbacks: AndroidActivityCallbacks;
    private _pttPressed: boolean;
    private firstStart: boolean;

    protected onCreate(savedInstanceState: android.os.Bundle): void {
        console.log("Main Activity ON CREATE");
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }
        console.log("MainActivity HELLO WORLD");

        this._pttPressed = false;
        this.firstStart = true;

        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
    }

    protected onSaveInstanceState(outState: android.os.Bundle): void {
        // this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    protected onStart(): void {
        this._callbacks.onStart(this, super.onStart);
        console.log("MainActivity - OnStart firstStart: (%s) _pttPressed %s", this.firstStart, this._pttPressed);
    }

    protected onStop(): void {
        this._callbacks.onStop(this, super.onStop);
        console.log("MainActivity - OnStop");
    }

    protected onNewIntent(intent: android.content.Intent): void {
        super.onNewIntent(intent);
        console.log("MainActivity - onNewIntent: Intent (%s), Extras (%s)", intent, intent.getExtras());
    }

    protected onDestroy(): void {
        console.log("MainActivity - onDestroy");
        this._callbacks.onDestroy(this, super.onDestroy);
    }

    public onBackPressed(): void {
        console.log("MainActivity - onBackPressed");
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }
}