declare var com: any;

export class FirebaseTrace {
    private trace: any;

    public constructor(name: string) {
        try {
            let firebaseInstance = com.google.firebase.perf.FirebasePerformance.getInstance();
            this.trace = firebaseInstance.newTrace(name);
            this.trace.start();
        }
        catch (ex) {
            console.log(ex);
            this.trace = null;
        }
    }

    public incrementCounter(named: string) {
        try {
            if(this.trace) {
                this.trace.incrementCounter(named);
            }
        }
        catch (ex) {
            console.log(ex);
            this.trace = null;
        }
    }

    public stop() {
        try {
            if(this.trace) {
                this.trace.stop();
                this.trace = null;
            }
        }
        catch (ex) {
            console.log(ex);
            this.trace = null;
        }
    }
}