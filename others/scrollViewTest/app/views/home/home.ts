import { Page } from 'ui/page';

export function viewLoaded(args) {
    var view = args.object;

    var dashScrollView = view.getViewById("dashScrollView");

    if (dashScrollView && dashScrollView.android) {
        dashScrollView.android.setVerticalScrollBarEnabled(false);
    }

}