var vmModule = require("./categories-root-view-model");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var gridLayoutModule = require("ui/layouts/grid-layout");
var listViewModule = require("ui/list-view");
var tabViewModule = require("ui/tab-view");
var page;
var tabViewRootCategories;


exports.pageCategoriesRootLoaded = function (args) {
    page = args.object;
    page.bindingContext = vmModule.vmCategoriesRoot;

    tabViewRootCategories = page.getViewById('tabViewRootCategories');

    vmModule.vmCategoriesRoot.set("selectedTabIndex", 0);

    //Root-Kategorien vom Server laden, für jede Root-Kategorie einen Tab im TabView hinzufügen und deren Unterkategorien laden
    loadRootCategories();
};


//bei Tab-Wechsel Inhalte 'onDemand' laden
vmModule.vmCategoriesRoot.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {

    //bei Tab-Wechsel die Kategorien des jeweiligen neuen Tabs laden, wenn noch nicht geschehen
    if (propertyChangeData.propertyName === "selectedTabIndex") {
        var newSelectedTabIndex = propertyChangeData.value;

        vmModule.vmCategoriesRoot.doLoadSubCategoriesForCurrentTab(newSelectedTabIndex);
    }
});


var loadRootCategories = function () {
    if (vmModule.vmCategoriesRoot.get('categoriesRoot').length === 0) {  //wenn keine lokalen Root-Categories vorhanden, vom Server laden
        vmModule.vmCategoriesRoot.doLoadRootCategories().then(buildTabViewForRootCategories);
    } else {    //wenn Kategorien bereits vom Server geladen, baue TabView mithilfe der lokalen Root-Categories
        buildTabViewForRootCategories(vmModule.vmCategoriesRoot.get('categoriesRoot'));
    }
};
exports.loadRootCategories = loadRootCategories;


var buildTabViewForRootCategories = function (rootcategories) {
    var tabViewItems = [];
    var tabItemView;
    var tabItem;

    //TabView aufbauen
    rootcategories.forEach(function (rootcategory, index) {
        tabItem = new tabViewModule.TabViewItem();

        //bei kleineren Displays wird ListView mit einfachem StackLayout genutzt;
        //bei größeren Displays RadListView mit GridLayout (spaltenförmige Anordnung der Kategorien)
        var listViewSubCategories = new listViewModule.ListView();

        /* TABVIEW - ROOTVIEW */
        tabItemView = new gridLayoutModule.GridLayout();

        //ListView
        tabItemView.addRow(new gridLayoutModule.ItemSpec(1, "star"));

        //ObservableArray for ListView in current Tab
        vmModule.vmCategoriesRoot.set("categoriesSub" + index, new observableArrayModule.ObservableArray())

        //bind items
        listViewSubCategories.bind({
            sourceProperty: "categoriesSub" + index,
            targetProperty: "items",
            twoWay: true
        }, vmModule.vmCategoriesRoot);


        //noinspection JSAnnotator
        listViewSubCategories.itemTemplate = `<StackLayout className="list-item">
                                                      <Label text="{{ name }}" className="text-normal" textWrap="true"/>
                                                      <Label text="{{ countStories === 1 ? '1 Text' : countStories + ' Texte'  }}" className="text-small-pale"/>
                                                  </StackLayout>`;

        tabItemView.addChild(listViewSubCategories);
        gridLayoutModule.GridLayout.setRow(listViewSubCategories, 2);

        tabItem.title = rootcategory.name;
        tabItem.view = tabItemView;

        console.log("tabViewItems.length; " + tabViewItems.length)


        tabViewItems.push(tabItem);



    });

    tabViewRootCategories.items = tabViewItems;

    //Nach Aufbau des TabViews zunächst Inhalte für ersten Tab laden
    if (rootcategories.length) {
        vmModule.vmCategoriesRoot.doLoadSubCategoriesForCurrentTab(0);
    }

};