import {
	Component, OnInit
	/// component core modules
} from "@angular/core";

/// component additional imports
import { BarcodeScanner } from 'nativescript-barcodescanner';

import * as common from "./shared";
import * as shared from "../../shared";

@Component({
	moduleId: module.id,
	selector: "ns-scanQrcodeView",
	templateUrl: "scanQrcodeView.component.html"
	/// component definitions
})

export class ScanQrcodeViewComponent implements OnInit
/// component inheritance
{
	get title() {
		let result: string = "Scan QR";

		/// component custom title

		return result;
	}
	/// component additional properties
	constructor(
		/// component constructor dependencies
		private _service: common.ScanQrcodeViewService,
		private barcodescanner: BarcodeScanner,
		private _navigationService: shared.NavigationService,
	) {
		/// component constructor method
	}
	/// component additional methods

	ngOnInit() {
		this.onScanTap();

	}

	resolveQRCode(that: ScanQrcodeViewComponent, result: string) {

		setTimeout(function () {
			//alert(result);
			that._navigationService.navigate(result);
		}, 100);


	}

	onScanTap() {

		// this.barcodescanner.available().then(
		// 	function (avail) {
		// 		alert("Available? " + avail);
		// 	}
		// );
		let that = this;

		// let that = new WeakRef(this);

		// alert(that.title);

		this.barcodescanner.scan({
			formats: "QR_CODE, EAN_13",
			cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
			cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
			message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
			preferFrontCamera: false,     // Android only, default false
			showFlipCameraButton: false,   // default false
			showTorchButton: false,       // iOS only, default false
			torchOn: false,               // launch with the flashlight on (default false)
			resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
			beepOnScan: true,             // Play or Suppress beep on scan (default true)
			openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
			closeCallback: () => {
				console.log("Scanner closed @ " + new Date().getTime());
			}
		}).then(function (result) {
			console.log("--- scanned: " + result.text);
			// Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
			that.resolveQRCode(that, result.text);
		},
			function (errorMessage) {
				alert("No scan. " + errorMessage);
			}
			);

	}
}