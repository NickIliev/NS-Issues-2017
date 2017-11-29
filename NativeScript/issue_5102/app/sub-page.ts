import { topmost } from "ui/frame";

export function goBack() {
    topmost().goBack();
}