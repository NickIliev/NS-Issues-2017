import { Frame } from "ui/frame";
// Frame.defaultTransition = { name: "slide", duration: 5000 };

import { topmost } from "ui/frame";

export function onTap(args) {
    topmost().navigate({
        moduleName: "sub-page",
        transition: {
            duration: 1500,
            name: "slide"
        }
    })
}