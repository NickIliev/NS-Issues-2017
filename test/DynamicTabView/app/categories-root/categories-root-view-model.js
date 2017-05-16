var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var Category = require("../models/Category");

exports.vmCategoriesRoot = observableModule.fromObject({
    selectedTabIndex: 0,

    categoriesRoot: new observableArrayModule.ObservableArray(),

    doLoadRootCategories: function () {
        var self = this;

        clearObservableArray(self.get('categoriesRoot'));

        return new Promise(function (resolve, reject) {
            /*sample root categories that are used for building the TabView (usually this is loaded from the server)*/
            var listRootCategories = [
                { idCategory: "1", name: "Root 1", hasChildren: true, countStories: "221423" },
                { idCategory: "2", name: "Root 2", hasChildren: true, countStories: "4563" }
            ];

            self.set("categoriesRoot", listRootCategories);

            resolve(listRootCategories);
        });
    },


    doLoadSubCategoriesForCurrentTab: function (selectedIndex) {
        var self = this;

        /*sample list, that usually is loaded from the server*/
        var listSubCategories = [
            { idCategory: "11", name: "Test", hasChildren: true, countStories: "6756" },
            { idCategory: "12", name: "Test", hasChildren: true, countStories: "453" },
            { idCategory: "13", name: "Test", hasChildren: true, countStories: "87564" },
            { idCategory: "14", name: "Test", hasChildren: true, countStories: "2435" },
            { idCategory: "15", name: "Test", hasChildren: true, countStories: "21" },
            { idCategory: "16", name: "Test", hasChildren: true, countStories: "65476866" },
            { idCategory: "17", name: "Test", hasChildren: true, countStories: "324321" },
            { idCategory: "18", name: "Test", hasChildren: true, countStories: "989554" },
            { idCategory: "19", name: "Test", hasChildren: true, countStories: "32" }
        ];

        try {
            clearObservableArray(self.get('categoriesSub' + selectedIndex));
        } catch (e) {
            alert(e);   //self.get('categoriesSub' + selectedIndex) is undefined ???
        }


        try {
            listSubCategories.forEach(function (categoryData) {
                self.get('categoriesSub' + selectedIndex).push(
                    Category(categoryData)
                );
            });
        } catch (e) {
            alert(e);
        }
    }
});

var clearObservableArray = function (observableArray) {
    observableArray.splice(0, observableArray.length);
};