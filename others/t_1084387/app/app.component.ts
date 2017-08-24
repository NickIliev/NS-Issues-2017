import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Color } from "color";
import { CalendarEvent } from "nativescript-telerik-ui-pro/calendar";  

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public myItems: Array<any> = [];
    public eventSource: Array<any> = [];
    ngOnInit() {
        this.myItems = [{ name: "John", age: 25 }, { name: "Anna", age: 47 }, { name: "Brian", age: 32 }]

        let now = new Date();
        let startDate: Date,
            endDate: Date,
            event: CalendarEvent;
        let colors: Array<Color> = [new Color(200, 188, 26, 214), new Color(220, 255, 109, 130), new Color(255, 55, 45, 255), new Color(199, 17, 227, 10), new Color(255, 255, 54, 3)];
        let events: Array<CalendarEvent> = new Array<CalendarEvent>();
        for (let i = 1; i < 100; i++) {
            startDate = new Date(now.getFullYear(), now.getMonth(), i * 2, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), (i * 2), 3);
            event = new CalendarEvent("event " + i, startDate, endDate, false, colors[i * 10 % (colors.length - 1)]);
            events.push(event);
            if (i % 3 == 0) {
                event = new CalendarEvent("second " + i, startDate, endDate, true, colors[i * 5 % (colors.length - 1)]);
                this.eventSource.push(event);
            }
        } 


    }

    
}


