var observableModule = require("data/observable");

exports.vmMain = observableModule.fromObject({
    formData: {
        city: 1
    },
 
    citiesProvider: [
        { key: 0, label: "keine Angabe" },
        { key: 1, label: "Dresden" },
        { key: 2, label: "London" },
        { key: 3, label: "Stockholm" },
        { key: 4, label: "Wien" }
    ],

    onPropertyCommitted: function(args) {
        console.log("onPropertyCommitted")
        console.log(JSON.stringify(args.object.source));

        var key = args.object.source.city;
        console.log(this.citiesProvider[key].label);
    }
});