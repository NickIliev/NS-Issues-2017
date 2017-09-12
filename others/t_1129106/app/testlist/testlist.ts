import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { topmost } from 'ui/frame';
import { Page } from 'ui/page';

export class viewModel extends Observable {
  private page: Page = null;
  private dataItems = new ObservableArray([{ description: "Item1" }]);

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public onBack() {
    topmost().goBack();
  };

}

var thisViewModel: viewModel;
export function onLoaded(args) {
  var page = <Page>args.object;
  thisViewModel = new viewModel(page);
  page.bindingContext = thisViewModel;
};
