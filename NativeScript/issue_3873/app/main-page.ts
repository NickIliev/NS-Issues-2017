import { EventData } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { View, KeyedTemplate } from "ui/core/view";
import { Page } from "ui/page";
import { ViewModel, Item } from './main-view-model';
import { ListView } from "ui/list-view";
import { Label } from "ui/label";
import { GridLayout } from "ui/layouts/grid-layout";
import { Color } from "color";

let vm = new ViewModel();
var lv: ListView;

export function selectItemTemplate(item: Item, index: number, items: ObservableArray<Item>): string {
    return item.id % 10 === 0 ? "red" : item.id % 2 === 0 ? "green" : "yellow"; 
}

export function pageLoaded(args: EventData) {
  let page = <Page>args.object;
  lv = <ListView>page.getViewById("lv2");

  page.bindingContext = vm;
}


export function onItemTap(args: EventData) {
    console.log("onItemTap");
    vm.set("items", new ObservableArray([new Item("new item", 111), new Item("new item", 222), new Item("new item", 333), new Item("new item", 444), new Item("new item", 555), new Item("new item", 666), new Item("new item", 777), new Item("new item", 888)]))
}

let scrollToBottom = true;
export function onScroll(args: EventData){
  let page = (<View>args.object).page;
  let gridLayout = page.getViewById<GridLayout>("grid-layout");
  for (let i = 0, length = gridLayout.getChildrenCount(); i < length; i++){
      let listView = <ListView>gridLayout.getChildAt(i);
      listView.scrollToIndex(scrollToBottom ? listView.items.length - 1 : 0);
  }
  scrollToBottom = !scrollToBottom;
}