import { Component, OnInit } from "@angular/core"
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
    public majorStep: string = "Day";
    public minDate: string = "01/06/2017";
    public maxDate: string = "30/06/2017";

    ngOnInit(): void {
        this.dayClick();
    }

    dayClick() {
        this.majorStep = "Day";
        this.dateFormat = "dd/MM";
        this.minDate = "09/06/2017";
        this.maxDate = "25/06/2017";

        this.chartData = [
            { MeasurementDate: "2017-06-10T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-11T00:00:00.000Z", Duration: 7, DistanceKM: 5.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-12T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-13T00:00:00.000Z", Duration: 7, DistanceKM: 9.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-06-14T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-06-15T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-16T00:00:00.000Z", Duration: 7, DistanceKM: 9.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-06-17T00:00:00.000Z", Duration: 7, DistanceKM: 4.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-06-18T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 5.6 },
            { MeasurementDate: "2017-06-19T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-20T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-21T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-22T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-23T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-24T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
        ];
        
    }

    weekClick() {
        this.majorStep = "Week";
        this.dateFormat = "dd/MM/YY";
        this.minDate = "09/06/2017";
        this.maxDate = "25/06/2017";


        this.chartData = [
            { MeasurementDate: "2017-06-10T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-11T00:00:00.000Z", Duration: 7, DistanceKM: 5.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-12T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-13T00:00:00.000Z", Duration: 7, DistanceKM: 9.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-06-14T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-06-15T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-16T00:00:00.000Z", Duration: 7, DistanceKM: 9.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-06-17T00:00:00.000Z", Duration: 7, DistanceKM: 4.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-06-18T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 5.6 },
            { MeasurementDate: "2017-06-19T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-20T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-21T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-22T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-23T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-24T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
        ];

    }

    monthClick() {
        this.majorStep = "Month";
        this.dateFormat = "dd/MM/YY";
        this.minDate = "01/06/2017";
        this.maxDate = "01/11/2017";
        
        this.chartData = [
            { MeasurementDate: "2017-06-01T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-07-01T00:00:00.000Z", Duration: 7, DistanceKM: 2.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-08-01T00:00:00.000Z", Duration: 7, DistanceKM: 4.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-09-01T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-10-01T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 1.6 },
        ];

    }
}
