import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "ClaimStatus"
})
export class ClaimStatus implements PipeTransform {
        transform(value: string): string {
        let claimStatus;
        switch (value) {
            case "C":
                claimStatus = "completed";
                break;
            case "D":
                claimStatus = "denied";
                break;
            case "P":
                claimStatus = "pending";
                break;
        }
        return claimStatus;
    }
}