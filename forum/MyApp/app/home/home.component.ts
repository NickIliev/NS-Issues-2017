import { Component } from "@angular/core";

@Component({
    selector: "Home",
    moduleId: module.id,
    template: `
<GridLayout>
    <RadCartesianChart>
        <CategoricalAxis tkCartesianHorizontalAxis></CategoricalAxis>
        <LinearAxis tkCartesianVerticalAxis></LinearAxis>
        <BarSeries tkCartesianSeries [items]="downloadCounts" categoryProperty="month" valueProperty="downloads"></BarSeries>
    </RadCartesianChart>
</GridLayout>
`
})
export class HomeComponent {
    downloadCounts = [
        { month: "Jan", downloads: 123 },
        { month: "Feb", downloads: 456 }
    ]
}