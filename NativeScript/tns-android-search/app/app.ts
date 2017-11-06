import "./bundle-config"
import * as app from 'application'

/**
 * Removes focus from the searchbar. If the page has a searchbar it gets focus on page loading automatically.
 * In order to prevent this behaviour this method must be used.
 */
global.removeSearchFocus = ( searchbar ) => {
    // TODO: we also have a method for removing focus in utils, refactor and move them in one place
    // get the parent of the searchbar
    const parent = searchbar.parent

    if ( !parent ) throw 'Can not get SearchBar parent to remove focus'

    if ( parent.android ) {
        parent.android.setFocusableInTouchMode( true )
        parent.android.setFocusable( true )
        searchbar.android.clearFocus()
    }

    else if ( searchbar.ios ) {
        searchbar.ios.endEditing( true )
    }
}

app.start({ moduleName: 'main-page' })
