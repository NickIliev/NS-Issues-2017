import viewModule = require("ui/core/view");
import bindableModule = require("ui/core/bindable");
import dependencyObservable = require("ui/core/dependency-observable");
import observableModule = require("data/observable");
import observableArrayModule = require("data/observable-array");
import stackLayoutModule = require("ui/layouts/stack-layout");

/**
* Defines the possible values for the {@link displayMode} property
* applied to the {@link RadAutoCompleteTextView}.
*/
export enum DisplayMode {
    /**
    * Selected items are shown as tokens. Multiple selection is allowed.
    */
    Tokens,
    /**
    * Only onde item can be selected. The selected item is shown as plain text.
    */
    Plain
}

/**
* Defines the possible values for the {@link suggestMode} property
* applied to the {@link RadAutoCompleteTextView}.
*/
export enum SuggestMode {
    /**
    * Shows suggestions as a drop down below the RadAutoCompleteTextView.
    */
    Suggest,
    /**
    * Shows only one suggestion as text appened directly to the input.
    */
    Append,

    /**
    * Applies both suggest and append mode.
    */
    SuggestAppend
}

/**
* Defines the possible values for the {@link layoutMode} property
* applied to the {@link RadAutoCompleteTextView}.
*/
export enum LayoutMode {
    /**
    * Horizontal layout.
    */
    Horizontal,
    /**
    * Wrap layout.
    */
    Wrap
}

/**
* Defines the possible values for the {@link completionMode} property
* applied to the {@link RadAutoCompleteTextView}.
*/
export enum CompletionMode {
    /**
    * Suggetsions are filtered by matching the first letters with the typed text.
    */
    StartsWith,
    /**
    * Suggestions are filtered by matching the containing letters with the typed text.
    */
    Contains
}

/**
 * The view holder in which suggestions are displayed in Suggest mode.
 */
export class SuggestionView {
    /**
     * The native android object.
     */
    android: any;
    /**
     * The native ios object.
     */
    ios: any;
    /**
     * The height of the suggestion view.
     */
    suggestionViewHeight: number;
    /**
     * Suggestion template used to display each suggestion in the drop dow.
     */
    suggestionItemTemplate: string;
}

/**
 * Data model describing the object which represents a single suggestion item.
 */
export class TokenModel {

    /**
     * Default constructor.
     */
    constructor(text: string, image: string);

    /**
     * Item image.
     */
    image: string;
    /**
     * Item text.
     */
    text: string;
    /**
     * Native ios object.
     */
    ios: any;
    /**
     * Native android object.
     */
    android: any;
}

/**
* Instances of this class are exposed by the data property of the
* {@link AutoCompleteEventData} coming when the events are
* fired.
*/
export class AutoCompleteEventData implements observableModule.EventData {
    /**
     * Event name.
     */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
    /**
    * The return value related with this event.
    */
    returnValue: any;
}

/**
 * RadAutoCompleteTextView provides means to perform easy 
 * filtering of data and completion suggestioning according to typed text by the user.
 * Provides tokens, layouts, completion modes.
 */
export class RadAutoCompleteTextView extends viewModule.View {
    /**
     * The event fired when token is removed.
     */
    static tokenRemovedEvent: string;
    /**
     * The event fired when token is added.
     */
    static tokenAddedEvent: string;
    /**
     * The event fired when token is selected.
     */
    static tokenSelectedEvents: string;
    /**
     * The event fired when token is deselected.
     */
    static tokenDeselectedEvent: string;
    /**
     * The event fired when suggestion view has become visible.
     */
    static suggestionViewBecameVisisbleEvent: string;

    /**
     * The native android object.
     */
    android: any;
    /**
     * The native ios object.
     */
    ios: any;

    /**
     * Items used to provide suggestions.
     */
    items: Array<any>;
    /**
     * The suggestion view holding suggestion items in Suggest mode.
     */
    suggestionView: any;
    /**
     * Defines how selected items are shown. Default value is Plain.
     */
    displayMode: string;
    /**
     * Defines the criteria on which suggestions are being filtered.
     */
    completionMode: string;
    /**
     * Defines the layout of the tokens.
     */
    layoutMode: string;
    /**
     * Defines how suggestion are presented.
     */
    suggestMode: string;
    /**
     * Sets the minimal count of typed characters for the  {@link RadAutoCompleteTextView} to start filtering.
     */
    minimumCharactersToSearch: number;

    /**
     * Sets if the 'close' button in the text area of the {@link RadAutoCompleteTextView} is shown. This property is supported only in iOS.
     */
    showCloseButton: boolean;

    /**
     * Sets the source of the Image for the 'close' button in the text area of the {@link RadAutoCompleteTextView}. This property is supported only in iOS.
     */
    closeButtonImageSrc: string;

    /**
     * Adds  token.
     */
    addToken(token: TokenModel);
    /**
     * Inserts token at specified index.
     */
    insertTokenAtIndex(token: TokenModel);
    /**
     * Removes specified token.
     */
    removeToken(token: TokenModel);
    /**
     * Removes token at specified index.
     */
    removeTokenAtIndex(index: number);
    /**
     * Removes all tokens.
     */
    removeAllTokens();
    /**
     * Returns all tokens.
     */
    tokens();
    /**
     * Returns token at specified index.
     */
    tokenAtIndex(index: number);
}

