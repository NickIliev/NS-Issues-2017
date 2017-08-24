import {
    Injectable
} from '@angular/core';

const Everlive: any = require('../../sdks/everlive.js');

@Injectable()

export class backendServicesService {
    private _instance: any;
    private _query: any;
    private _options: {};

    constructor() {
        this._options = {
            appId: 'v43y7vmt71l8q0ng',
            scheme: 'https',
            authentication: {
                persist: true
            }
        }

        this._instance = new Everlive(this._options);
        this._query = new Everlive.Query();
    }

    get instance() {
        return this._instance;
    }

    get query() {
        return this._query;
    }

	get newQuery(): Everlive.Query {
		return new Everlive.Query();
	}
}

// START_CUSTOM_CODE_backendServices
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_backendServices