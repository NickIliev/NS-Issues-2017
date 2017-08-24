import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { ComponentMode } from "../component-mode";

import { Recording } from './recording';
import { RecordingsService } from '../recordings/recordings.service';

import { VideoRecorder } from "../video-recorder";

class VideoDelegate extends NSObject implements AVCaptureFileOutputRecordingDelegate {
    captureOutputDidStartRecordingToOutputFileAtURLFromConnections(captureOutput: AVCaptureFileOutput, fileURL: NSURL, connections: NSArray<any>): void {
        console.log(`capture output: started recording to ${ fileURL.absoluteString }`);
    }

    captureOutputDidFinishRecordingToOutputFileAtURLFromConnectionsError(captureOutput: AVCaptureFileOutput, outputFileURL: NSURL, connections: NSArray<any>, error: NSError): void {
        console.log(`capture output: stopped recording to ${ outputFileURL.absoluteString }`);
    }
}

@Component({
    moduleId: module.id,
    selector: "px-details",
    templateUrl: "./recording.component.html",
    styleUrls: ["./recording.component.css"]
})
export class RecordingComponent implements OnInit, OnDestroy {
    // UI Properties
    private name: string;

    private devices: string[];
    private devicesIndex: number;
    private devicesIndexChanged(value: number) {
        this.devicesIndex = value;
    }

    private intertialResolution: number = 10;

    // ------------------------------------
    private componentMode: ComponentMode;

    private avCaptureDevice: AVCaptureDevice | undefined;
    private avCaptureDeviceInput: AVCaptureDeviceInput | undefined;
    private avCaptureDeviceDiscoverySession: AVCaptureDeviceDiscoverySession | undefined;

    private avCaptureSession: AVCaptureSession | undefined;
    private avCaptureMovieFileOutput: AVCaptureMovieFileOutput | undefined;

    private viedoResolutions = [];
    private viedoResolutionsIndex = -1;
    private viedoResolutionsIndexChanged(index) {
        this.viedoResolutionsIndex = index;
    }

    // private inertialResolutions = [];
    // private inertialResolutionIndex = 0;
    // private inertialResolutionIndexChanged(index) {
    //     this.viedoResolutionsIndex = index;
    // }

    public constructor(
        private route: ActivatedRoute,
        private recordingsService: RecordingsService
    ) {
        this.viedoResolutions.push('High');
        this.viedoResolutions.push('Medium');
        this.viedoResolutions.push('Low');
        this.viedoResolutions.push('352x288');
        this.viedoResolutions.push('640x480');
        this.viedoResolutions.push('960x540');
        this.viedoResolutions.push('1280x720');
        this.viedoResolutions.push('1280x720');
        this.viedoResolutions.push('1920x1080');
        this.viedoResolutions.push('3840x2160');

        // this.inertialResolutions.push(0.005);

        // for (let i = 1; i < 100; i++) {
        //     this.inertialResolutions.push(i / 100.0);
        // }
    }

    public ngOnInit(): void {
        // debugger;

        this.avCaptureSession = new AVCaptureSession().init();

        this.avCaptureDevice = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);
        this.avCaptureDeviceInput = AVCaptureDeviceInput.deviceInputWithDeviceError(this.avCaptureDevice);

        let deviceTypes = new NSMutableArray<string>({ capacity: 1 }).init();
        {
            deviceTypes.addObject(AVCaptureDeviceTypeBuiltInWideAngleCamera);
            this.avCaptureDeviceDiscoverySession = AVCaptureDeviceDiscoverySession.discoverySessionWithDeviceTypesMediaTypePosition(deviceTypes, AVMediaTypeVideo, AVCaptureDevicePosition.Unspecified);
            deviceTypes.dealloc();
        }

        this.devices = Array.from<AVCaptureDevice>(this.avCaptureDeviceDiscoverySession.devices).map(x => x.localizedName);
        this.devicesIndex = this.devices.length === 0 ? -1 : 0;

        // debugger;

        // deviceDiscoverySession.devices[0].
        // this.avCaptureSession.beginConfiguration();
        // this.avCaptureSession.commitConfiguration();

        // const id: string = this.route.snapshot.params["id"];
        // const key: string = this.route.snapshot.params["mode"];

        // this.componentMode = ComponentMode[key] || ComponentMode.create;

        // if (id === void 0 || id === null) {
        //     this.recording = {
        //         name: '',
        //         videoResolution: 'none',
        //         inertialResolution: 0.005
        //     };
        // } else {
        //     this.recording = this.recordingsService.recordings[+id];
        // }
    }

    public ngOnDestroy(): void {

    }

    public async record(): Promise<void> {
        if (this.avCaptureMovieFileOutput === void 0) {
            // if (this.avCaptureSession.canSetSessionPreset(AVCaptureSessionPreset1280x720)) {
            //     this.avCaptureSession.sessionPreset = AVCaptureSessionPreset1280x720;
            // } else {
            //     throw new Error('Error occured while setting session preset');
            // }

            // device.activeFormat.videoSupportedFrameRateRanges;

            // if (!input) {
            //     throw new Error("Error trying to open camera.");
            // }

            // this.avCaptureSession.addInput(input);

            // debugger;
            // this.avCaptureMovieFileOutput = new AVCaptureMovieFileOutput().init();

            // this.avCaptureSession.addOutput(this.avCaptureMovieFileOutput);

            // let documentsPath = NSSearchPathForDirectoriesInDomains(NSSearchPathDirectory.DocumentDirectory, NSSearchPathDomainMask.UserDomainMask, true)[0];
            // let outputPath = `${ documentsPath }/video-${ +new Date() }.mov`;
            // let outputFileUrl = NSURL.fileURLWithPath(outputPath);

            // this.avCaptureSession.commitConfiguration();

            // this.avCaptureSession.startRunning();
            // this.avCaptureMovieFileOutput.startRecordingToOutputFileURLRecordingDelegate(outputFileUrl, new VideoDelegate());
        } else {
            // this.avCaptureMovieFileOutput.stopRecording();
            // this.avCaptureSession.stopRunning();

            // this.avCaptureMovieFileOutput = void 0;
            // this.avCaptureSession = void 0;
        }
    }
}
