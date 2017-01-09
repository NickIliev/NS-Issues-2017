import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as fs from "file-system";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;


    let desktop = fs.knownFolders.ios.desktop();
    console.log("desktop: " + desktop);// undefined

    let developer = fs.knownFolders.ios.developer();
    console.log("developer: " + developer);// undefined

    let downloads = fs.knownFolders.ios.downloads();
    console.log("downloads: " + downloads);// undefined

    let library = fs.knownFolders.ios.library();
    console.log("library: " + library.path);// only this returns Folder as expected

    let movies = fs.knownFolders.ios.movies();
    console.log("movies: " + movies); // undefined

    let sharedPulbic = fs.knownFolders.ios.sharedPublic();
    console.log("sharedPulbic: " + sharedPulbic);// undefined

    let pictures = fs.knownFolders.ios.pictures();
    console.log("pictures: " + pictures);// undefined

    let music = fs.knownFolders.ios.music();
    console.log("music: " + music);// undefined

}



