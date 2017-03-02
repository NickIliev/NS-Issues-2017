"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_static_1 = require("nativescript-angular/platform-static");
var app_module_ngfactory_1 = require("./app.module.ngfactory");
platform_static_1.platformNativeScript().bootstrapModuleFactory(app_module_ngfactory_1.AppModuleNgFactory);
