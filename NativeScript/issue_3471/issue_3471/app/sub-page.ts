import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import * as frame from "ui/frame";

import { ScrollView } from "ui/scroll-view";


export function onNavigatingFrom(args: EventData) {
	let page = <Page>args.object;

	// console.log(page);
	// console.log(page.ios);
	var controller = frame.topmost().ios.controller;
	var navBar = controller.navigationBar;
	console.log(navBar.subviews);
	
	var myView = navBar.viewWithTag(17);
	myView.removeFromSuperview();

}

export function onNavigatedTo(args: EventData) {
	let page = <Page>args.object;

	page.bindingContext = new HelloWorldModel();

	if (page.ios) {
		var controller = frame.topmost().ios.controller;
		var navBar = controller.navigationBar;
		/**
		 * Make ActionBar background transparent
		 */
		var navBar = controller.navigationBar;
		navBar.shadowImage = UIImage.alloc().init();
		navBar.setBackgroundImageForBarMetrics(UIImage.alloc(), UIBarMetrics.Default);
		/**
		 * Add custom view to navBar
		 */
		var navBounds = navBar.bounds;
		var myView = UIView.alloc().init();
		myView.frame = {
			origin: { x: navBounds.origin.x, y: navBounds.origin.y - 20 },
			size: { width: navBounds.size.width, height: navBounds.size.height + 20 }
		};
		myView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
		myView.userInteractionEnabled = false;

		myView.tag = 17;

		navBar.addSubview(myView);

		navBar.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, 0.0);

		var scrollView = page.getViewById("scrollView");
		scrollView.on('scroll', args => {
			let scroll = <ScrollView>args.object;
			var offset = scroll.verticalOffset;
			myView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, (offset - 50) / 50);
		});
	}
}
