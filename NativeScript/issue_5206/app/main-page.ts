
import { EventData } from 'data/observable';
import { ImageSource, fromFile } from 'image-source';

export function navigatingTo(args: EventData) {
    let imageSource: ImageSource = fromFile("~/assets/my_image.png");
    console.log(imageSource.height);
}
