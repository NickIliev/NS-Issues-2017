import { Component, OnInit } from "@angular/core";

@Component({
    moduleId: module.id,
    templateUrl: "items.component.html"
})

export class ItemsComponent implements OnInit {
    
    public chartData: Array<any>;
    public targetData: number = 12;
    public categoryAxisField: string = "MeasurementDate";
    public valueAxisField: string = "DistanceKM";
    public targetValueAxisField: string = "Duration";
    public dateFormat: string = "MM/dd/YYYY";

    ngOnInit(): void {
        this.chartData = [
            { MeasurementDate: "2017-07-10T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 5, DistanceKM: 5.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-07-10T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 7, DistanceKM: 5.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-07-10T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 9, DistanceKM: 5.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-07-11T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 14, DistanceKM: 6.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-07-12T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 7, DistanceKM: 7.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-07-13T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 22, DistanceKM: 5.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-07-14T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 7, DistanceKM: 8.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-07-15T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 9, DistanceKM: 7.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-07-16T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 7, DistanceKM: 2.83, DistanceMiles: 5.6 },
            { MeasurementDate: "2017-07-17T00:00:00", MeasurementTime: "2001-01-01T02:00:00", Duration: 11, DistanceKM: 1.83, DistanceMiles: 9.6 },

        ];
    }
}
