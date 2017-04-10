import { topmost } from "ui/frame";

export function onGoBack() {
    topmost().goBack();
}