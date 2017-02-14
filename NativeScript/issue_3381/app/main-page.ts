
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as imageSource from "image-source";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    // http://apod.nasa.gov/apod/image/1612/lmcapodgleason960.jpg  - NOT OK
    // http://apod.nasa.gov/apod/image/1612/farside_lro800.jpg  - NOT OK

    imageSource.fromUrl("http://apod.nasa.gov/apod/image/1612/lmcapodgleason960.jpg").then(res => {
        console.log("Succsess!")
    }).catch(err => {
        console.log(err); // throwing with  JS: Error: Response content may not be converted to an Image
    })

    // https://static.pexels.com/photos/33045/lion-wild-africa-african.jpg OK
    // http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01563/opgs/edr/ncam/NLB_536234013EDR_S0593016NCAM00568M_.JPG - OK
}