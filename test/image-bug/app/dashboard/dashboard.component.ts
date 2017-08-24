import { Component, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Image } from "ui/image";
import { getImage } from "tns-core-modules/http/http";

@Component({
  moduleId: module.id,
  selector: "dashboard",
  templateUrl: "./dashboard.html"
})
export class DashboardComponent {

  @ViewChild("userImage")
  userImage: ElementRef;

// ngAfterViewInit() {    
//   getImage("http://placehold.it/150x150")
//     .then(imageSource => {
//         console.log("image downloaded");
//         this.userImage.nativeElement.src = "http://placehold.it/150x150";
//     });
// }

onImageLoaded(args) {  
  let image = <Image>args.object;

  getImage("http://placehold.it/150x150")
    .then(imageSource => {
        console.log("image downloaded");

        image.src = imageSource;
    });
}

}
