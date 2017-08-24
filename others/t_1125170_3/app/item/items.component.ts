import { Component, ViewChild, ElementRef, EventEmitter, Output } from "@angular/core";
import { AnimationCurve } from "ui/enums";

@Component({
    selector: "createticket",
    moduleId: module.id,
    templateUrl: "./items.component.html"
})
export class ItemsComponent {

    constructor(private supportService: SupportService) {}

    public showingCreateTicket: any = false;
    public loadingTicketFields: boolean = false;

    public showingLongListPicker: any = false;
    public unfilteredItemsToShow = [];
    public itemsToShow = [];

    public selectedProduct = '';
    public productMap = {};
    public listProducts = [];

    public filterItem: string;

    @Output() outputEvent: EventEmitter<any> = new EventEmitter();
    @ViewChild("longListPickerContainer") longListPickerContainer: ElementRef;
    @ViewChild("longListPickerDimmer") longListPickerDimmer: ElementRef;

    show() {
        this.loadingTicketFields = true;
        this.supportService.getTicketFields().subscribe(result => {
            console.dir(result);
            result.ticket_fields.forEach(field => {
                if (field.title == 'Product') {
                    field.custom_field_options.forEach(prod => {
                        let prodParts = prod.name.split('::');
                        this.productMap[prodParts[prodParts.length-1]] = prod;
                        this.listProducts.push(prodParts[prodParts.length-1])
                    })
                    this.listProducts.sort();
                }
            })
            this.loadingTicketFields = false;
        })
        this.showingCreateTicket = true
    }

    showProducts() {
        this.animateLongListPicker('products');
        this.itemsToShow = this.listProducts;
        this.unfilteredItemsToShow = this.listProducts;
    }

    filterLongList() {
        this.itemsToShow = this.unfilteredItemsToShow.filter(item => {
            return item.toLowerCase().indexOf(this.filterItem.toLowerCase()) !== -1;
        });
    }

    animateLongListPicker(type) {
        this.showingLongListPicker = type;
        this.longListPickerDimmer.nativeElement.opacity = 0;
        this.longListPickerDimmer.nativeElement.animate({
            opacity: 1,
            duration: 200
        })
        this.longListPickerContainer.nativeElement.opacity = 1;
        this.longListPickerContainer.nativeElement.scaleX = .7;
        this.longListPickerContainer.nativeElement.scaleY = .7;
        this.longListPickerContainer.nativeElement.animate({
            opacity: 1,
            scale: {x: 1, y: 1},
            duration: 400,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        })
    }

    chooseLongList(event) {
        this.filterItem = '';
        if (this.showingLongListPicker == 'products') {
            this.selectedProduct = this.itemsToShow[event.index];
        }
        this.closeLongListPicker();
    }

    closeLongListPicker() {
        this.longListPickerDimmer.nativeElement.animate({
            opacity: 0,
            duration: 200
        })
        this.longListPickerContainer.nativeElement.animate({
            opacity: 0,
            scale: {x: .7, y: .7},
            duration: 300,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        }).then(() => {
            this.showingLongListPicker = false;
        })
    }

    doneCreateTicket() {
        this.closeCreateTicket();
        this.outputEvent.emit('create ticket finished');
    }

    closeCreateTicket() {
        this.showingCreateTicket = false;
    }
}