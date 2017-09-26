declare var FirebasePerformance: any;

export class FirebaseTrace {
    private trace: any;

    public constructor(name: string) {
        try {
            this.trace = global.FIRPerformance.startTraceWithName(name);
        }
        catch (ex) {
            console.log(ex);
            this.trace = null;
        }
    }

    public incrementCounter(named: string) {
        try {
            if(this.trace) {
                this.trace.incrementCounterNamed(named);
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