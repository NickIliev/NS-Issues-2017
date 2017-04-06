'use strict';

var equipos = [{ "id": "1", "modelo": "Xperia XA Ultra", "precio": "399", "marca": "Sony", "imagen": "~/images/productos/frontal/sony_Xperia_xa_ultra_frontal3.png", "plan": "Claro MAX 189", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "2", "modelo": "Mate 9 Lite", "precio": "299", "marca": "Huawei", "imagen": "~/images/productos/frontal/huawei_mate_9_lite_frontal.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "3", "modelo": "IRO A5QL", "precio": "9", "marca": "Azumi", "imagen": "~/images/productos/frontal/azumi-iro-a5ql-frontal.png", "plan": "Claro MAX 79", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "4", "modelo": "Mate 9", "precio": "9", "marca": "Huawei", "imagen": "~/images/productos/frontal/huawei_mate_9_frontal.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "5", "modelo": "V20 H990", "precio": "999", "marca": "LG", "imagen": "~/images/productos/frontal/lg_v20_frontal.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "6", "modelo": "OT5056A POP 4 Plus ", "precio": "9", "marca": "Alcatel", "imagen": "~/images/productos/frontal/Alcatel_OT5056A_frontal3.png", "plan": "Claro MAX 99", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "7", "modelo": "V6 Plus", "precio": "9", "marca": "ZTE", "imagen": "~/images/productos/frontal/zte_v6_plus_frontal.png", "plan": "Claro MAX 149", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "8", "modelo": "P9 Plus Vienna + Smartwatch W1", "precio": "1399", "marca": "Huawei", "imagen": "~/images/productos/frontal/huawei_p9_plus_frontal_smartwatch.png", "plan": "Claro MAX 189", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "9", "modelo": "Xperia E5", "precio": "69", "marca": "Sony", "imagen": "~/images/productos/frontal/Sony_Xperia_E5_frontal.png", "plan": "Claro MAX 99", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "10", "modelo": "Desire 10 Lifestyle", "precio": "99", "marca": "HTC", "imagen": "~/images/productos/frontal/htc_desire_10_lifestyle_frontal.png", "plan": "Claro MAX 119", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "11", "modelo": "iPhone 7 - 32GB", "precio": "899", "marca": "Apple", "imagen": "~/images/productos/frontal/Apple_iPhone_7_frontal.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "12", "modelo": "iPhone 7 - 128GB", "precio": "1299", "marca": "Apple", "imagen": "~/images/productos/frontal/Apple_iPhone_7_frontal.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "13", "modelo": "iPhone 7 - 256GB", "precio": "1999", "marca": "Apple", "imagen": "~/images/productos/frontal/Apple_iPhone_7_frontal.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "14", "modelo": "iPhone 7 Plus - 256GB", "precio": "2299", "marca": "Apple", "imagen": "~/images/productos/frontal/Apple_iPhone_7_plus_frontal.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "15", "modelo": "OT5045G Pixi 4 5", "precio": "49", "marca": "Alcatel", "imagen": "~/images/productos/frontal/Alcatel_OT5045G_frontal.png", "plan": "Claro MAX 79", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "16", "modelo": "Cam Y6 II", "precio": "9", "marca": "Huawei", "imagen": "~/images/productos/frontal/huawei_y6_ii_frontal.png", "plan": "Claro MAX 99", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "17", "modelo": "Desire 530", "precio": "9", "marca": "HTC", "imagen": "~/images/productos/frontal/htc_desire_530_frontal.png", "plan": "Claro MAX 99", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "18", "modelo": "X Power K220F", "precio": "449", "marca": "LG", "imagen": "~/images/productos/frontal/lg_x_power_frontal.png", "plan": "Claro MAX 119", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "19", "modelo": "L950", "precio": "9", "marca": "Lanix", "imagen": "~/images/productos/frontal/Lanix_L950_frontal.png", "plan": "Claro MAX 119", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "20", "modelo": "Y3 II Luna", "precio": "9", "marca": "Huawei", "imagen": "~/images/productos/frontal/huawei_y3_frontal.png", "plan": "Claro MAX 99", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "21", "modelo": "A40 Style Lite", "precio": "9", "marca": "Azumi", "imagen": "~/images/productos/frontal/Azumi_A40_Style_Lite_frontal.png", "plan": "Claro MAX 189", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "22", "modelo": "Galaxy A7 2016 A710M", "precio": "949", "marca": "Samsung", "imagen": "~/images/productos/frontal/samsung_galaxy_a7_frontal.png", "plan": "Claro MAX 149", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "23", "modelo": "P9 Lite Venus", "precio": "299", "marca": "Huawei", "imagen": "~/images/productos/frontal/Huawei_P9_lite_frontal.png", "plan": "Claro MAX 149", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "24", "modelo": "K4 K120F", "precio": "9", "marca": "LG", "imagen": "~/images/productos/frontal/lg_k4_frontal.png", "plan": "Claro MAX 59", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "25", "modelo": "G5 SE + Charging Kit", "precio": "span", "marca": "LG", "imagen": "~/images/productos/frontal/lgg5se_chargingkit_frontal.png", "plan": "Claro MAX 189", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "26", "modelo": "P9", "precio": "499", "marca": "Huawei", "imagen": "~/images/productos/frontal/Huawei_P9_frontal2.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "27", "modelo": "K10 K430T", "precio": "29", "marca": "LG", "imagen": "~/images/productos/frontal/lg_k10_frontal2.png", "plan": "Claro MAX 99", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "28", "modelo": "iPhone SE 16GB", "precio": "879", "marca": "Apple", "imagen": "~/images/productos/frontal/Apple_iPhone_SE_frontal.png", "plan": "Claro MAX 189", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "29", "modelo": "10 + Parlante Harman Kardon", "precio": "1299", "marca": "HTC", "imagen": "~/images/productos/frontal/htc10_harman_frontal.png", "plan": "Claro MAX 189", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "30", "modelo": "L630", "precio": "9", "marca": "AVVIO", "imagen": "~/images/productos/frontal/Avvio_L630_frontal.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "31", "modelo": "OT4013 Pixi 3 4", "precio": "9", "marca": "Alcatel", "imagen": "~/images/productos/frontal/Alcatel_Pixi_frontal.png", "plan": "Claro MAX 59", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "32", "modelo": "X110", "precio": "9", "marca": "Lanix", "imagen": "~/images/productos/frontal/Lanix_X110_frontal.png", "plan": "Claro MAX 59", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "33", "modelo": "L1000", "precio": "9", "marca": "Lanix", "imagen": "~/images/productos/frontal/Lanix_L1000_frontal.png", "plan": "Claro MAX 149", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "34", "modelo": "A35C Lite", "precio": "9", "marca": "Azumi", "imagen": "~/images/productos/frontal/Azumi_A35C_Lite_frontal.png", "plan": "Claro MAX 59", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "35", "modelo": "Galaxy J1 mini", "precio": "9", "marca": "Samsung", "imagen": "~/images/productos/frontal/Samsung_Galaxy_j1_mini_frontal2.png", "plan": "Claro MAX 79", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "36", "modelo": "Galaxy S7 Edge 32GB G935F", "precio": "1299", "marca": "Samsung", "imagen": "~/images/productos/frontal/Samsung_Galaxy_S7_Edge_frontal.png", "plan": "Claro MAX 289", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "37", "modelo": "Galaxy S7 32GB G930F", "precio": "1499", "marca": "Samsung", "imagen": "~/images/productos/frontal/Samsung_Galaxy_S7_frontal2.png", "plan": "Claro MAX 189", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "38", "modelo": "OT5065A POP 35", "precio": "9", "marca": "Alcatel", "imagen": "~/images/productos/frontal/Alcatel_OT5065A_frontal.png", "plan": "Claro MAX 99", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "39", "modelo": "Join", "precio": "9", "marca": "NYX", "imagen": "~/images/productos/frontal/NYX_Join_frontal.png", "plan": "Claro MAX 59", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "40", "modelo": "A50LT", "precio": "9", "marca": "Azumi", "imagen": "~/images/productos/frontal/Azumi_A50LT_frontal.png", "plan": "Claro MAX 99", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" },
{ "id": "41", "modelo": "Ilium S130", "precio": "9", "marca": "Lanix", "imagen": "~/images/productos/frontal/Lanix_s130_frontal.png", "plan": "Claro MAX 49", "nuevo": "true", "online": "true", "lte4g": "true", "visible": "true" }];


var Observable = require('data/observable').Observable,
    Observable_array = require('data/observable-array');

var application = require('application');
var load;
if (application.android) {
    load = 1;
} else {
    load = 41;
}

// {"id": "41", "modelo": "Ilium S130", "precio": "9", "marca": "Lanix", "imagen": "~/images/productos/frontal/Lanix_s130_frontal.png", "plan": "En plan Postpago Claro MAX 49 con acuerdo de equipos a 18 meses", "nuevo": "true", "online": "true", "lte4g": "true"}];
var Equipo = (function () {
    function Equipo(id, modelo, precio, marca, imagen, plan, nuevo, online, lte4g, visible) {
        this.id = id;
        this.modelo = modelo;
        this.precio = precio;
        this.marca = marca;
        this.imagen = imagen;
        this.plan = plan;
        this.nuevo = nuevo;
        this.online = online;
        this.lte4g = lte4g;
        this.visible = visible;
    }
    return Equipo;
} ());
exports.Equipo = Equipo;

var vmEquipos = (function (_super) {
    __extends(vmEquipos, _super);
    function vmEquipos() {
        _super.call(this);
        // Initialize default values.
        this._listItems = new Observable_array.ObservableArray();
        this.modal = new Observable();
        this.set("modal", false);
        this.vmPlanes = [
            { "id": "1", "tipo": "Solo chip", "nombre": "Claro MAX 79", "precio": "79", "Internet": "4 GB", "antes": "Antes 700 MB", "llamadas": "1000 minutos", "rpc": "ilimitado", "sms": "2000", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "2", "tipo": "Solo chip", "nombre": "Claro MAX 99", "precio": "99", "Internet": "6 GB", "antes": "Antes 1 GB * ", "llamadas": "Llamadas ilimitadas", "rpc": "ilimitado", "sms": "SMS", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "3", "tipo": "Solo chip", "nombre": "Claro MAX 119", "precio": "119", "Internet": "8 GB", "antes": "", "llamadas": "Llamadas ilimitadas", "rpc": "ilimitado", "sms": "SMS", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "4", "tipo": "Solo chip", "nombre": "Claro MAX 219", "precio": "219", "Internet": "25 GB", "antes": "", "llamadas": "Llamadas Ilimitadas", "rpc": "ilimitado", "sms": "SMS", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "5", "tipo": "Solo chip", "nombre": "Claro MAX 189", "precio": "189", "Internet": "15 GB", "antes": "Antes 5 GB * ", "llamadas": "Llamadas ilimitadas", "rpc": "ilimitado", "sms": "SMS", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "6", "tipo": "Solo chip", "nombre": "Claro MAX 149", "precio": "149", "Internet": "10 GB", "antes": "", "llamadas": "Llamadas ilimitadas", "rpc": "ilimitado", "sms": "SMS", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "7", "tipo": "Solo chip", "nombre": "Claro MAX 69", "precio": "69", "Internet": "3 GB", "antes": "Antes 500 MB * ", "llamadas": "800 minutos", "rpc": "ilimitado", "sms": "2000", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "8", "tipo": "Solo chip", "nombre": "Claro MAX 59", "precio": "59", "Internet": "2 GB", "antes": "", "llamadas": "600 minutos", "rpc": "ilimitado", "sms": "2000", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "9", "tipo": "Solo chip", "nombre": "Claro MAX 49", "precio": "49", "Internet": "1 5", "antes": "GBAntes 400 MB * ", "llamadas": "400 minutos", "rpc": "ilimitado", "sms": "500", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "10", "tipo": "Solo chip", "nombre": "Claro MAX 39", "precio": "39", "Internet": "700 MB", "antes": "Antes 600 MB * ", "llamadas": "200 minutos", "rpc": "ilimitado", "sms": "500", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" },
            { "id": "11", "tipo": "Solo chip", "nombre": "Claro MAX 29", "precio": "29", "Internet": "500 MB", "antes": "Antes 150 MB * ", "llamadas": "150 minutos", "rpc": "ilimitado", "sms": "500", "redes": "true", "claromusica": "por promocion", "sinfrontera": "opcional" }
        ];

        this.vmMarcas = [
            { "id": "1", "nombre": "Alcatel" },
            { "id": "2", "nombre": "Apple" },
            { "id": "3", "nombre": "AVVIO" },
            { "id": "4", "nombre": "Azumi" },
            { "id": "5", "nombre": "HTC" },
            { "id": "6", "nombre": "Huawei" },
            { "id": "7", "nombre": "Lanix" },
            { "id": "8", "nombre": "LG" },
            { "id": "9", "nombre": "NYX" },
            { "id": "10", "nombre": "Samsung" },
            { "id": "11", "nombre": "Sony" },
            { "id": "12", "nombre": "ZTE" }
        ];
        this.primeraPagina();
        this.planesFiltro ="";
        this.marcasFiltro ="";
        this.preciosFiltro ="";
        this.chipsFiltro ="";

    };
    Object.defineProperty(vmEquipos.prototype, "listItems", {
        get: function () {
            return this._listItems;
        },
        enumerable: true,
        configurable: true
    });
    vmEquipos.prototype.primeraPagina = function () {
        for (var i = 0; i < load; i++) {
            this._listItems.push(new Equipo(equipos[i].id, equipos[i].modelo, equipos[i].precio, equipos[i].marca, equipos[i].imagen, equipos[i].plan, equipos[i].nuevo, equipos[i].online, equipos[i].lte4g, equipos[i].visible));
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
                this._listItems.push(new Equipo(equipos[index].id, equipos[index].modelo, equipos[index].precio, equipos[index].marca, equipos[index].imagen, equipos[index].plan, equipos[index].nuevo, equipos[index].online, equipos[index].lte4g, equipos[index].visible));
            }
        }
    };
    vmEquipos.prototype.editItem = function (index) {
        var item = this._listItems.getItem(index);
        item.plan = "xxx";
        this.listItems.setItem(0, item);
    };
    vmEquipos.prototype.sort = function (tipo) {
        sorting(equipos, 'precio', tipo);

        var array = [];
        for (var i = 0; i < 41; i++) {
            array.push(new Equipo(equipos[i].id, equipos[i].modelo, equipos[i].precio, equipos[i].marca, equipos[i].imagen, equipos[i].plan, equipos[i].nuevo, equipos[i].online, equipos[i].lte4g, equipos[i].visible));
        }
        this._listItems.pagina = 41;
        this.set("listItems", array);

    };
    vmEquipos.prototype.filtroMarcas = function (marca) {
        var array = [];
        this.set("listItems", []);
        for (var i = 0; i < 41; i++) {
            if (marca == "Ver todos") {
                array.push(new Equipo(equipos[i].id, equipos[i].modelo, equipos[i].precio, equipos[i].marca, equipos[i].imagen, equipos[i].plan, equipos[i].nuevo, equipos[i].online, equipos[i].lte4g, true));
            } else {
                if (equipos[i].marca == marca) {
                    array.push(new Equipo(equipos[i].id, equipos[i].modelo, equipos[i].precio, equipos[i].marca, equipos[i].imagen, equipos[i].plan, equipos[i].nuevo, equipos[i].online, equipos[i].lte4g, true));
                }
            }
        }
        this.set("listItems", array);
        this._listItems.pagina = 41;

    };
    vmEquipos.prototype.filtroPlanes = function (plan) {
        var array = [];
        this.set("listItems", []);
        for (var i = 0; i < 41; i++) {
            if (plan == "Ver todos") {
                array.push(new Equipo(equipos[i].id, equipos[i].modelo, equipos[i].precio, equipos[i].marca, equipos[i].imagen, equipos[i].plan, equipos[i].nuevo, equipos[i].online, equipos[i].lte4g, true));
            } else {
                if (equipos[i].plan == plan) {
                    array.push(new Equipo(equipos[i].id, equipos[i].modelo, equipos[i].precio, equipos[i].marca, equipos[i].imagen, equipos[i].plan, equipos[i].nuevo, equipos[i].online, equipos[i].lte4g, true));
                }
            }
        }
        this.set("listItems", array);
        this._listItems.pagina = 41;
    };
    return vmEquipos;
} (Observable));
exports.vmEquipos = vmEquipos;



function sorting(json_object, key_to_sort_by, tipo) {
    function sortByKey(a, b) {
        var x = parseInt(a[key_to_sort_by]);
        var y = parseInt(b[key_to_sort_by]);
        if (tipo == "desc") {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        } else {
            return ((y > x) ? -1 : ((y < x) ? 1 : 0));
        }
    }
    json_object.sort(sortByKey);
}