import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

// Type 1: In-memory only datastore (no need to load the database)
var Datastore = require('nedb')
    , db = new Datastore();

// // Type 2: Persistent datastore with manual loading
// var Datastore = require('nedb')
//     , db = new Datastore({ filename: 'path/to/datafile' });
// db.loadDatabase(function (err) {    // Callback is optional
//     // Now commands will be executed
// });


// // Type 3: Persistent datastore with automatic loading
// var Datastore = require('nedb')
//     , db = new Datastore({ filename: 'path/to/datafile', autoload: true });
// // You can issue commands right away


// // Type 4: Persistent datastore for a Node Webkit app called 'nwtest'
// // For example on Linux, the datafile will be ~/.config/nwtest/nedb-data/something.db
// var Datastore = require('nedb')
//     , path = require('path')
//     , db = new Datastore({ filename: path.join(require('nw.gui').App.dataPath, 'something.db') });

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    // // Of course you can create multiple datastores if you need several
    // // collections. In this case it's usually a good idea to use autoload for all collections.
    // db = {};
    // db.users = new Datastore('path/to/users.db');
    // db.robots = new Datastore('path/to/robots.db');

    // // You need to load each database (here we do it asynchronously)
    // db.users.loadDatabase();
    // db.robots.loadDatabase();
}