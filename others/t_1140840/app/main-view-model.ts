import { Observable } from 'data/observable';
import { FingerprintAuth, BiometricIDAvailableResult } from "nativescript-fingerprint-auth";
import { alert } from "tns-core-modules/ui/dialogs";

export class HelloWorldModel extends Observable {
    private fingerprintAuth: FingerprintAuth;
    public status: string = 'STAnpm inTUS';

    constructor() {
        super();
        this.fingerprintAuth = new FingerprintAuth();
    }

    public doCheckAvailable(): void {
        console.log("do check available'")

        this.fingerprintAuth.available().then(
            (result: BiometricIDAvailableResult) => {
                console.log("available result: " + JSON.stringify(result));
                this.set('status', "Biometric ID available? - " + (result.any ? (result.face ? "Face" : "Touch") : "NO"));
            }
        );
    }

    public doCheckFingerprintsChanged(): void {
        this.fingerprintAuth.didFingerprintDatabaseChange().then(
            (changed: boolean) => {
                this.set('status', "Biometric ID changed? - " + (changed ? "YES" : "NO"));
            }
        );
    }

    public doVerifyFingerprint(): void {
        this.fingerprintAuth.verifyFingerprint({
            message: 'Scan yer finger' // optional
        }).then(
            () => {
                alert({
                    title: "Biometric ID / passcode OK",
                    okButtonText: "Sweet"
                });
            },
            () => {
                alert({
                    title: "Biometric ID NOT OK / canceled",
                    okButtonText: "Mmkay"
                });
            }
            );
    }

    public doVerifyFingerprintWithCustomFallback(): void {
        this.fingerprintAuth.verifyFingerprintWithCustomFallback({
            message: 'Scan yer finger', // optional
            fallbackMessage: 'Enter PIN' // optional
        }).then(
            () => {
                alert({
                    title: "Biometric ID OK",
                    okButtonText: "Sweet"
                });
            },
            (error) => {
                alert({
                    title: "Biometric ID NOT OK",
                    message: (error.code === -3 ? "Show custom fallback" : error.message),
                    okButtonText: "Mmkay"
                });
            }
            );
    }
}