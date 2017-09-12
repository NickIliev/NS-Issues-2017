import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "FormatDecimal"
})
export class FormatDecimal implements PipeTransform {
        transform(value: number, args: number): string {
                let targetValue = value.toString().split(".")[args];
                if (args === 0) {
                        targetValue = targetValue;
                }
                else {
                        targetValue === null ? targetValue = "0" : targetValue;
                }
                return targetValue;
        }
}