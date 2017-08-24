import { Common } from './ns-ogg-common';

declare const OggVorbis : any;

export class Ogg extends Common {

    constructor() {
        super();
    }

    public init() : void {
        console.log("init");
        console.log("OggVorbis: " + OggVorbis);
        
        /*
        + (LPMessagingSDK * _Nonnull)instance; 
        ^^^ instance is property in LPMessagingSDK-Swift.h so we are marshalling it as a property
        - (BOOL)initialize:(NSString * _Nullable)brandID error:(NSError * _Nullable * _Nullable)error SWIFT_METHOD_FAMILY(none);
        intializeError(id, error) is the right syntax to convert the Objective-C to JavaScript following the marshalling techniques from docs.nativescript.org/runtimes/ios/marshalling/Marshalling-Overview
        */
    }
}