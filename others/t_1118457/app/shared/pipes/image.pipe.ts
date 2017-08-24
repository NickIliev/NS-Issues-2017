import { Pipe, PipeTransform } from "@angular/core";

const empty1x1png: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";

@Pipe({
  name: "nsImage"
})
export class ImagePipe implements PipeTransform {
  transform(value: any, args: any[]): string {
    let img: string, type: string, provider: any;

    if (typeof(value) === "undefined") {
      return empty1x1png;
    }

    type = args[0];
    provider = args[1];

    if (!this._isAbsolute(value)) {
      if (type === "everlive") {
        let setup = provider.setup;
        img = setup.scheme + ":" + setup.url + setup.appId + "/Files/" + value + "/Download";
      } else if (type === "sitefinity") {
        let url = provider.profileUrl,
          startIndex = url.indexOf("//") + 2,
          endIndex = url.indexOf("/", startIndex),
          destination = endIndex === -1 ? url : url.substr(0, endIndex);
        img = destination + img;
      } else {
        img = empty1x1png;
      }
    }

    return img;
  }

  private _isAbsolute(src: string) {
    if (src && (src.slice(0, 5) === "http:" || src.slice(0, 6) === "https:" || src.slice(0, 2) === "//" || src.slice(0, 5) === "data:")) {
      return true;
    }

    return false;
  }
}
