var array = [{ "id": "1" },
{ "id": "2" },
{ "id": "3" },
{ "id": "4" },
{ "id": "5" },
{ "id": "6" },
{ "id": "7" },
{ "id": "8" },
{ "id": "9" },
{ "id": "10" },
{ "id": "11" },
{ "id": "12" },
{ "id": "13" },
{ "id": "14" },
{ "id": "15" },
{ "id": "16" },
{ "id": "17" },
{ "id": "18" },
{ "id": "19" },
{ "id": "20" },
{ "id": "21" },
{ "id": "22" },
{ "id": "23" },
{ "id": "24" },
{ "id": "25" },
{ "id": "26" },
{ "id": "27" },
{ "id": "28" },
{ "id": "29" },
{ "id": "30" },
{ "id": "31" },
{ "id": "32" },
{ "id": "33" },
{ "id": "34" },
{ "id": "35" },
{ "id": "36" },
{ "id": "37" },
{ "id": "38" },
{ "id": "39" },
{ "id": "40" },
{ "id": "41" },
{ "id": "42" },
{ "id": "43" },
{ "id": "44" },
{ "id": "45" },
{ "id": "46" },
{ "id": "47" },
{ "id": "48" },
{ "id": "49" },
{ "id": "50" },
{ "id": "51" },
{ "id": "52" },
{ "id": "53" },
{ "id": "54" },
{ "id": "55" },
{ "id": "56" },
{ "id": "57" },
{ "id": "58" },
{ "id": "59" },
{ "id": "60" },
{ "id": "61" },
{ "id": "62" },
{ "id": "63" },
{ "id": "64" },
{ "id": "65" },
{ "id": "66" },
{ "id": "67" },
{ "id": "68" },
{ "id": "69" },
{ "id": "70" },
{ "id": "71" },
{ "id": "72" },
{ "id": "73" },
{ "id": "74" },
{ "id": "75" },
{ "id": "76" },
{ "id": "77" },
{ "id": "78" },
{ "id": "79" },
{ "id": "80" },
{ "id": "81" },
{ "id": "82" },
{ "id": "83" },
{ "id": "84" },
{ "id": "85" },
{ "id": "86" },
{ "id": "87" },
{ "id": "88" },
{ "id": "89" },
{ "id": "90" },
{ "id": "91" },
{ "id": "92" },
{ "id": "93" },
{ "id": "94" },
{ "id": "95" },
{ "id": "96" },
{ "id": "97" },
{ "id": "98" },
{ "id": "99" },
{ "id": "100" }
];

var Observable = require('data/observable').Observable;
var Observable_array = require('data/observable-array');

var ListItem = (function () {
    function ListItem(title, isDone, isDeleted, isReordered, pagina) {
        this.title = title;
        this.isDone = isDone;
        this.isDeleted = isDeleted;
        this.isReordered = isReordered;
        this.pagina = pagina;
    }
    return ListItem;
} ());
exports.ListItem = ListItem;

var vmEquipos = (function (_super) {
    __extends(vmEquipos, _super);
    function vmEquipos() {
        var _this = _super.call(this) || this;
        // Initialize default values.
        _this._listItems = new Observable_array.ObservableArray();
        _this.primeraPagina();
        return _this;
    }
    Object.defineProperty(vmEquipos.prototype, "listItems", {
        get: function () {
            return this._listItems;
        },
        enumerable: true,
        configurable: true
    });

    vmEquipos.prototype.primeraPagina = function () {
        for (var i = 0; i < 10; i++) {
            this._listItems.push(new ListItem(array[i].id, false, false, false, 0));
        }
        this._listItems.pagina = 0;
    };
    vmEquipos.prototype.addItem = function (value1) {
        ++this._listItems.pagina;
        var page = this._listItems.pagina;
        if (typeof (array[(page * 10)]) === 'object') {
            for (var i = 0; i < 10; i++) {
                this._listItems.push(new ListItem(array[(page * 10) + i].id, false, false, false, page));
            }
        }
    };
    return vmEquipos;
} (Observable));
exports.vmEquipos = vmEquipos;