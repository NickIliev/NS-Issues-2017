import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "ClaimType"
})
export class ClaimType implements PipeTransform {
        transform(value: string): string {
        let claimType;
        switch (value) {
            case "M":
                claimType = "medical";
                break;
            case "D":
                claimType = "dental";
                break;
            case "V":
                claimType = "vision";
                break;
            case "P":
                claimType = "pharmacy";
                break;
        }
        return claimType;
    }
}