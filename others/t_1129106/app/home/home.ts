import { topmost } from 'ui/frame';
import { Page } from 'ui/page';
import { Observable } from 'data/observable';

export class ViewModel extends Observable {
  page: Page;

  constructor(page) {
    super();
    this.page = page;
  }

  public testFormTap() {
    topmost().navigate({ moduleName: "testform/testform" });
  }

}

var viewModel: ViewModel;
export function pageLoaded(args) {
  var page = <Page>args.object;
  viewModel = new ViewModel(page);
  page.bindingContext = viewModel;
};

