var observableModule = require("data/observable");

exports.vmMain = observableModule.fromObject({
    formData: {
        city: 2
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
        console.log("source: " + JSON.stringify(args.object.source));
        console.log("editedObject: " + JSON.stringify(args.object.editedObject));
        // var key = args.object.source.city;
        // console.log(this.citiesProvider[key].label);
    },

    // convertFrom: function(value) {
    //     console.log("convertFrom")
    //     console.log(value); // e.g. 2
    //     return this.citiesProvider.filter((city) => city.key == value)[0].label;
    // },

    // convertTo: function(value) {
    //     console.log("convertTo")
    //     console.log(value); // e.g London
    //     // console.log(this.citiesProvider.filter((city) => city.label == value)[0]);
    //     // console.log(this.citiesProvider.filter((city) => city.label == value)[0].key)
    //     return this.citiesProvider.filter((city) => city.label == value)[0].key;
    // }
});

var Converter = (function () {
    function Converter(cities) {
        this.cities = cities;
    }
    Converter.prototype.convertFrom = function (key) {
        return this.cities.filter(function (city) { return city.key == key; })[0].label;
    };
    Converter.prototype.convertTo = function (label) {
        return this.cities.filter(function (city) { return city.label == label; })[0].key;
    };
    return Converter;
}());

exports.Converter = Converter;