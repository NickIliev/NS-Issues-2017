
import { EventData } from 'data/observable';
import { Auth0Lock } from "nativescript-auth0";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    var lock = new Auth0Lock({
        clientId: 'JCYQkCudTTZcvdfni2dOHbFVRqXJE0aC',
        domain:'divided-zero.eu.auth0.com'
    });

    lock.show().then((res) => {
        console.log("good auth!");
        //goToHomeOrWhatevs(); 
    }, (error) => {
        console.log(error);
    });
}