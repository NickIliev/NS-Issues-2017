"use strict";
// Type 1: In-memory only datastore (no need to load the database)
var Datastore = require('nedb'), db = new Datastore();
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
function navigatingTo(args) {
    var page = args.object;
    // // Of course you can create multiple datastores if you need several
    // // collections. In this case it's usually a good idea to use autoload for all collections.
    // db = {};
    // db.users = new Datastore('path/to/users.db');
    // db.robots = new Datastore('path/to/robots.db');
    // // You need to load each database (here we do it asynchronously)
    // db.users.loadDatabase();
    // db.robots.loadDatabase();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxrRUFBa0U7QUFDbEUsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUN6QixFQUFFLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUzQixzREFBc0Q7QUFDdEQsa0NBQWtDO0FBQ2xDLDhEQUE4RDtBQUM5RCw4REFBOEQ7QUFDOUQsdUNBQXVDO0FBQ3ZDLE1BQU07QUFHTix5REFBeUQ7QUFDekQsa0NBQWtDO0FBQ2xDLDhFQUE4RTtBQUM5RSx1Q0FBdUM7QUFHdkMsd0VBQXdFO0FBQ3hFLHdGQUF3RjtBQUN4RixrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLHFHQUFxRztBQUVyRyxzQkFBNkIsSUFBZTtJQUV4QyxJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRTdCLHNFQUFzRTtJQUN0RSw2RkFBNkY7SUFDN0YsV0FBVztJQUNYLGdEQUFnRDtJQUNoRCxrREFBa0Q7SUFFbEQsbUVBQW1FO0lBQ25FLDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaEMsQ0FBQztBQWJELG9DQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEhlbGxvV29ybGRNb2RlbCB9IGZyb20gJy4vbWFpbi12aWV3LW1vZGVsJztcblxuLy8gVHlwZSAxOiBJbi1tZW1vcnkgb25seSBkYXRhc3RvcmUgKG5vIG5lZWQgdG8gbG9hZCB0aGUgZGF0YWJhc2UpXG52YXIgRGF0YXN0b3JlID0gcmVxdWlyZSgnbmVkYicpXG4gICAgLCBkYiA9IG5ldyBEYXRhc3RvcmUoKTtcblxuLy8gLy8gVHlwZSAyOiBQZXJzaXN0ZW50IGRhdGFzdG9yZSB3aXRoIG1hbnVhbCBsb2FkaW5nXG4vLyB2YXIgRGF0YXN0b3JlID0gcmVxdWlyZSgnbmVkYicpXG4vLyAgICAgLCBkYiA9IG5ldyBEYXRhc3RvcmUoeyBmaWxlbmFtZTogJ3BhdGgvdG8vZGF0YWZpbGUnIH0pO1xuLy8gZGIubG9hZERhdGFiYXNlKGZ1bmN0aW9uIChlcnIpIHsgICAgLy8gQ2FsbGJhY2sgaXMgb3B0aW9uYWxcbi8vICAgICAvLyBOb3cgY29tbWFuZHMgd2lsbCBiZSBleGVjdXRlZFxuLy8gfSk7XG5cblxuLy8gLy8gVHlwZSAzOiBQZXJzaXN0ZW50IGRhdGFzdG9yZSB3aXRoIGF1dG9tYXRpYyBsb2FkaW5nXG4vLyB2YXIgRGF0YXN0b3JlID0gcmVxdWlyZSgnbmVkYicpXG4vLyAgICAgLCBkYiA9IG5ldyBEYXRhc3RvcmUoeyBmaWxlbmFtZTogJ3BhdGgvdG8vZGF0YWZpbGUnLCBhdXRvbG9hZDogdHJ1ZSB9KTtcbi8vIC8vIFlvdSBjYW4gaXNzdWUgY29tbWFuZHMgcmlnaHQgYXdheVxuXG5cbi8vIC8vIFR5cGUgNDogUGVyc2lzdGVudCBkYXRhc3RvcmUgZm9yIGEgTm9kZSBXZWJraXQgYXBwIGNhbGxlZCAnbnd0ZXN0J1xuLy8gLy8gRm9yIGV4YW1wbGUgb24gTGludXgsIHRoZSBkYXRhZmlsZSB3aWxsIGJlIH4vLmNvbmZpZy9ud3Rlc3QvbmVkYi1kYXRhL3NvbWV0aGluZy5kYlxuLy8gdmFyIERhdGFzdG9yZSA9IHJlcXVpcmUoJ25lZGInKVxuLy8gICAgICwgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuLy8gICAgICwgZGIgPSBuZXcgRGF0YXN0b3JlKHsgZmlsZW5hbWU6IHBhdGguam9pbihyZXF1aXJlKCdudy5ndWknKS5BcHAuZGF0YVBhdGgsICdzb21ldGhpbmcuZGInKSB9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpbmdUbyhhcmdzOiBFdmVudERhdGEpIHtcblxuICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG5cbiAgICAvLyAvLyBPZiBjb3Vyc2UgeW91IGNhbiBjcmVhdGUgbXVsdGlwbGUgZGF0YXN0b3JlcyBpZiB5b3UgbmVlZCBzZXZlcmFsXG4gICAgLy8gLy8gY29sbGVjdGlvbnMuIEluIHRoaXMgY2FzZSBpdCdzIHVzdWFsbHkgYSBnb29kIGlkZWEgdG8gdXNlIGF1dG9sb2FkIGZvciBhbGwgY29sbGVjdGlvbnMuXG4gICAgLy8gZGIgPSB7fTtcbiAgICAvLyBkYi51c2VycyA9IG5ldyBEYXRhc3RvcmUoJ3BhdGgvdG8vdXNlcnMuZGInKTtcbiAgICAvLyBkYi5yb2JvdHMgPSBuZXcgRGF0YXN0b3JlKCdwYXRoL3RvL3JvYm90cy5kYicpO1xuXG4gICAgLy8gLy8gWW91IG5lZWQgdG8gbG9hZCBlYWNoIGRhdGFiYXNlIChoZXJlIHdlIGRvIGl0IGFzeW5jaHJvbm91c2x5KVxuICAgIC8vIGRiLnVzZXJzLmxvYWREYXRhYmFzZSgpO1xuICAgIC8vIGRiLnJvYm90cy5sb2FkRGF0YWJhc2UoKTtcbn0iXX0=