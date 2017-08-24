/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('bluebird', function (global, Zone, api) {
    // TODO: @JiaLiPassion, we can automatically patch bluebird
    // if global.Promise = Bluebird, but sometimes in nodejs,
    // global.Promise is not Bluebird, and Bluebird is just be
    // used by other libraries such as sequelize, so I think it is
    // safe to just expose a method to patch Bluebird explicitly
    Zone[Zone.__symbol__('bluebird')] = function patchBluebird(Bluebird) {
        Bluebird.setScheduler(function (fn) {
            Zone.current.scheduleMicroTask('bluebird', fn);
        });
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZWJpcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibHVlYmlyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFDLE1BQVcsRUFBRSxJQUFjLEVBQUUsR0FBaUI7SUFDM0UsMkRBQTJEO0lBQzNELHlEQUF5RDtJQUN6RCwwREFBMEQ7SUFDMUQsOERBQThEO0lBQzlELDREQUE0RDtJQUMzRCxJQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixRQUFhO1FBQy9FLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBQyxFQUFZO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5ab25lLl9fbG9hZF9wYXRjaCgnYmx1ZWJpcmQnLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICAvLyBUT0RPOiBASmlhTGlQYXNzaW9uLCB3ZSBjYW4gYXV0b21hdGljYWxseSBwYXRjaCBibHVlYmlyZFxuICAvLyBpZiBnbG9iYWwuUHJvbWlzZSA9IEJsdWViaXJkLCBidXQgc29tZXRpbWVzIGluIG5vZGVqcyxcbiAgLy8gZ2xvYmFsLlByb21pc2UgaXMgbm90IEJsdWViaXJkLCBhbmQgQmx1ZWJpcmQgaXMganVzdCBiZVxuICAvLyB1c2VkIGJ5IG90aGVyIGxpYnJhcmllcyBzdWNoIGFzIHNlcXVlbGl6ZSwgc28gSSB0aGluayBpdCBpc1xuICAvLyBzYWZlIHRvIGp1c3QgZXhwb3NlIGEgbWV0aG9kIHRvIHBhdGNoIEJsdWViaXJkIGV4cGxpY2l0bHlcbiAgKFpvbmUgYXMgYW55KVtab25lLl9fc3ltYm9sX18oJ2JsdWViaXJkJyldID0gZnVuY3Rpb24gcGF0Y2hCbHVlYmlyZChCbHVlYmlyZDogYW55KSB7XG4gICAgQmx1ZWJpcmQuc2V0U2NoZWR1bGVyKChmbjogRnVuY3Rpb24pID0+IHtcbiAgICAgIFpvbmUuY3VycmVudC5zY2hlZHVsZU1pY3JvVGFzaygnYmx1ZWJpcmQnLCBmbik7XG4gICAgfSk7XG4gIH07XG59KTsiXX0=