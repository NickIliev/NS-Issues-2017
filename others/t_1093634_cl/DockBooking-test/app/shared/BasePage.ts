import { topmost } from "ui/frame";
import { Page } from "ui/page";
import { Observable, EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-telerik-ui-pro/sidedrawer";
import { View } from "ui/core/view";
import { GC as garbageCollector } from "utils/utils";


let appViewModel = new Observable({
    selectedPage: "home"
});

export abstract class BasePage {
    //implement this function in the inheriting pages to set their specific binding context
    abstract contentLoaded = (args:EventData) => {};

    basepageLoaded(args){
        let page = <Page>args.object;
        page.bindingContext = appViewModel;

        let drawer = <RadSideDrawer>page.getViewById("drawer");
        drawer.showDrawer();
        drawer.closeDrawer();
    }
    
    toggleDrawer(){
        let page = <Page>topmost().currentPage;
        let drawer = <RadSideDrawer>page.getViewById("drawer");
        drawer.toggleDrawerState();
    }

    closeDrawer(){
        let page = <Page>topmost().currentPage;
        let drawer = <RadSideDrawer>page.getViewById("drawer");
        drawer.closeDrawer();
    }

    openDrawer(){
        let page = <Page>topmost().currentPage;
        let drawer = <RadSideDrawer>page.getViewById("drawer");
        drawer.showDrawer();
    }

    navigate(args){
        let page = <Page>topmost().currentPage;
        page.enableSwipeBackNavigation = false; // NO WAY (vedi anche dopo, tento di disabilitare la slide navigation in iOS)

        // let drawer = <RadSideDrawer>page.getViewById("drawer");
        // drawer.closeDrawer();

        let pageName = args.object.text.toLowerCase();

        if (appViewModel.get("selectedPage") !== pageName) {
            appViewModel.set("selectedPage", pageName);
            topmost().navigate({
                moduleName: "pages/" + pageName + "/" + pageName,
                backstackVisible: false, // NO WAY
                clearHistory: false, // NO WAY
                animated: true,
                transition: {
                    name: "slide",
                    duration: 250,
                    curve: "easeOut"
                }
            });
        }

        // garbage collect
        garbageCollector();
    }
}
