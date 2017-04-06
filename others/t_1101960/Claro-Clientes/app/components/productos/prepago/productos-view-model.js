'use strict';

var equipos = [{"id": "1", "marca": "Samsung", "modelo": "Galaxy J7 Negro", "precio": "919", "oldprecio": "949", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_samsung_galaxy_j7_negro.png", "lte4g": "true", "promocion": "false"},

{"id": "2", "marca": "Samsung", "modelo": "Galaxy J7 Blanco", "precio": "919", "oldprecio": "949", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_samsung_galaxy_j7_blanco.png", "lte4g": "true", "promocion": "false"},

{"id": "3", "marca": "ZTE", "modelo": "V6 Gris Oscuro", "precio": "549", "oldprecio": "", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_zte_v6_gris.png", "lte4g": "true", "promocion": "false"},

{"id": "4", "marca": "Lanix", "modelo": "S130 Negro + Cargador - Pack Conectados", "precio": "99", "oldprecio": "", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_lanix_s130_negro_conectados.png", "lte4g": "false", "promocion": "false"},

{"id": "5", "marca": "Azumi", "modelo": "A50LT Negro + Parlante Bluetooth - Pack Conectados", "precio": "329", "oldprecio": "", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_azumi_a50lt_negro.png", "lte4g": "true", "promocion": "false"},

{"id": "6", "marca": "LG", "modelo": "Bello II Negro", "precio": "369", "oldprecio": "399", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_lg_belloii_negro.png", "lte4g": "false", "promocion": "false"},

{"id": "7", "marca": "LG", "modelo": "Bello II Blanco", "precio": "369", "oldprecio": "399", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_lg_belloii_blanco.png", "lte4g": "false", "promocion": "false"},

{"id": "8", "marca": "Huawei", "modelo": "Y6 Negro", "precio": "439", "oldprecio": "", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_huawei_y6_negro.png", "lte4g": "true", "promocion": "false"},

{"id": "9", "marca": "Huawei", "modelo": "Y6 Blanco", "precio": "439", "oldprecio": "", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_huawei_y6_blanco.png", "lte4g": "true", "promocion": "false"},

{"id": "10", "marca": "Lanix", "modelo": "X110 Negro", "precio": "129", "oldprecio": "", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_lanix_x110_negro.png", "lte4g": "false", "promocion": "false"},

{"id": "11", "marca": "Alcatel", "modelo": "OT4013 Pixi 3 4 Negro", "precio": "179", "oldprecio": "", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_alcatel_ot4013_negro.png", "lte4g": "false", "promocion": "false"},

{"id": "12", "marca": "LG", "modelo": "K4 Azul", "precio": "299", "oldprecio": "339", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_lg_k4_azul_camiseta.png", "lte4g": "true", "promocion": "true"}];


var Observable = require('data/observable').Observable,
    Observable_array = require('data/observable-array');

var application = require('application');
var load;
if (application.android) {
    load = 1;
} else {
    load = 41;
}
// {"id": "12", "marca": "LG", "modelo": "K4 Azul", "precio": "299", "oldprecio": "339", "plan": "Prepago TUN", "imagen": "~/images/productos/prepago//200x310_lg_k4_azul_camiseta.png", "lte4g": "true", "promocion": "true"}];
var Equipo = (function () {
    function Equipo(id, marca, modelo, precio, oldprecio, plan, imagen, lte4g, promocion) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.oldprecio = oldprecio;
        this.plan = plan;
        this.imagen = imagen;
        this.lte4g = lte4g;
        this.promocion = promocion;
    }
    return Equipo;
} ());
exports.Equipo = Equipo;

var vmEquipos = (function (_super) {
    __extends(vmEquipos, _super);
    function vmEquipos() {
        var _this = _super.call(this) || this;
        // Initialize default values.
        _this._listItems = new Observable_array.ObservableArray();
        _this.primeraPagina();
        return _this;
    };
    Object.defineProperty(vmEquipos.prototype, "vista", {
        get: function () {
            return this._vista;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vmEquipos.prototype, "listItems", {
        get: function () {
            return this._listItems;
        },
        enumerable: true,
        configurable: true
    });
    vmEquipos.prototype.primeraPagina = function () {
        this._vista = {
            "pageTitle": "Equipos",
            "isLoading": false,
            "modal": false,
        };
        for (var i = 0; i < load; i++) {
            this._listItems.push(new Equipo(equipos[i].id, equipos[i].marca, equipos[i].modelo, equipos[i].precio, equipos[i].oldprecio, equipos[i].plan, equipos[i].imagen, equipos[i].lte4g, equipos[i].promocion));
        }
        this._listItems.pagina = 0;
    };
    vmEquipos.prototype.addItem = function () {
        this._listItems.pagina++;
        var page = this._listItems.pagina;
        for (var i = 0; i < load; i++) {
            var index = (page * load) + i;
            if (typeof (equipos[index]) == 'undefined') {
                break;
            } else {
                this._listItems.push(new Equipo(equipos[index].id, equipos[index].marca, equipos[index].modelo, equipos[index].precio, equipos[index].oldprecio, equipos[index].plan, equipos[index].imagen, equipos[index].lte4g, equipos[index].promocion));
            }
        }
    };
    return vmEquipos;
} (Observable));
exports.vmEquipos = vmEquipos;
