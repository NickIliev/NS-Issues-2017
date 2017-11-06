import {Observable} from 'data/observable'
import {ObservableArray} from 'data/observable-array'

export class HelloWorldModel extends Observable {

    private _items = [ 'apple', 'apple cider', 'apple pie', 'orange', 'orange juice', 'strawberry', 'blueberry' ]
    public items = new ObservableArray()

    constructor() {
        super()
        this.items.push(this._items)
    }

    filter(value: string = '') {
        this.items.splice(0, this.items.length) // remove all items
        this.items.push(this._items.filter(i => -1 !== i.indexOf(value) ))
    }
}