import { Injectable } from "@angular/core";

import * as dialogsModule from "ui/dialogs";

@Injectable()
export class NotificationService {

  constructor(
  ) {}

  error(message: string = "Message") {
    return dialogsModule.alert({
      title: "Error",
      okButtonText: "OK",
      message: message
    });
  }

  warning(message: string = "Message") {
    return dialogsModule.alert({
      title: "Warning",
      okButtonText: "OK",
      message: message
    });
  }

  success(message: string = "Message") {
    return dialogsModule.alert({
      title: "Success",
      okButtonText: "OK",
      message: message
    });
  }
}
