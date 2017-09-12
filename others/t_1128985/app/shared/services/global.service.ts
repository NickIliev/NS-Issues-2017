import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
//import { HttpInterceptorService } from "ng-http-interceptor";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

//import * as Https from 'nativescript-https';
//import { HttpsRequestOptions } from 'nativescript-https';

import { AsyncSubject } from 'rxjs/AsyncSubject';
import { AesUtil } from '../utils/AesUtil';
var CryptoJS = require('crypto-js')

@Injectable()
export class GlobalService {
    // apiURL: string = "http://10.0.2.2:8080/bcbsma/mma/v1/";
    // https://bcbsma-nonprod-dev.apigee.net/verify_stub
    //   apiURL: string = "https://bcbsma-test.apigee.net/";
    apiURL: string = "https://bcbsma-nonprod-dev.apigee.net/";


    constructor(private http: Http //, httpInterceptor: HttpInterceptorService
    ) {


        // httpInterceptor.request().addInterceptor((data, method) => {
        //     console.log("encrypt");
        //     console.log(method, data);
        //     return data;
        // });

        // httpInterceptor.response().addInterceptor((res, method) => {
        //     console.log("decrypt");
        //     return res.do(r => console.log(method, r));
        // }); 

    }

    globalGet(url: string) {
        return this.http.get(this.apiURL + url, this.jwt()).map((response: Response) => response.json());
    }
    bcbsmaGet(url: string, headers: any) {
        return this.http.get(this.apiURL + url, headers).map((response: Response) => response.json());

    }

    globalPost(url: string, params: any) {

        return this.http.post( this.apiURL + url, params, this.jwt())
            .map((response: Response) => response.json());
    }
       
    globalLoginPost(url: string, body: any) {
        this.encrypt();
        return this.http.post( this.apiURL + url, body, this.loginjwt())
           .map((response: Response) => response.json());
    }

    encrypt(){
        var iv ="418f8eddd436d1d96b19b8a85563e7bb"; // "b5ccea620067ce288f603713f39eb00f"; //"6a6c26a8b978f4c006739aae336a7597"; //"F27D5C9927726BCEFE7510B1BDD3D137";
        var salt ="06e02857911c4aa8e2d0c02c6a0ca082aa7e7c13a86545d9b0b2ad55fd61511e"; // "98bb84733547bc5447d2da3aebdb217330476107a175e63ce0bd2407b5d8f57c";// "126583de0858dff5b59ffd3b73f04b45c60d4c95401e6e76accb812139823f42"; //"3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
        var keySize = 128;
        var iterationCount = 10000;
        var passphrase = "4f0e2c70dedc3b98284805c141e8d46d708906553f56f7a04b43590d38f2ef8a"; // "81b7a5b797f44c04ad43b63740ffc0d58911b70178cbde9c24e10b8bb06a9e0a"; //"a02e382961c1e0d9010e391af801a6b2018b61562af66ad918db37f60acbbf63"; // "26DEC4ECAF3ABBBCD3C6156704617CCF";
     // var plaintext = "{\"regtypein\":\"EMAIL\",\"useridin\":\"test@test.com\",\"passwordin\":\"password01\",\"receiveinfo\":\"yes\",\"tandcagreed\":\"true”}";
    //  var plaintext = "{\"regtypein\":\"EMAIL\",\"useridin\":\"test22520@test.com\",\"passwordin\":\"password01\",\"receiveinfo\":\"yes\",\"tandcagreed\":\"true\"}";
     //   var plaintext = "{\"useridin\":\"test22520@test.com\",\"key2id\":\"5023bd2461e9441bb28e7b43793b62e7\"}";
    //  var plaintext = "ysZTaNV0wAYdVE6WcH4zpURITw45K6d86LbFdot9G2rG5b8zaDp8ik8UDSME1zGykltAnv3ZXA1bLc0z+jGh4HmusBmCs30VwuharUXdPD3i6xt6SuG6ox17wKgNPxPlSyMDm+Z6t+9grqPAjFqwEwjQEReC9FcyBYdVYtffkP0Vv9eDtEboqKw84EPaC8jQPbWxRQpmnrGqGCPnZQCpnMnhz2CtqxsrLPelwOzzP6VIgKi/obFzuNb+oLKFmq9DxRp+rgLjTgHXH4Gh1BnC6S97smhO/92Jy4xmdRDuYHyH7BIpXibc6Suq0o1Lu/m9ezwdLOq9mmQuPu3sGYYEIxN1oDFrZ1p/iUS03nF/n/oOjPr8gO4iJe84HJKtBoxu0gVZ20+A9D8O2IXg4ugjDIBgKjqZHIz4KbmIdMnfbjaPSm8bQneXLQm1XRu6VvyDePl27KYmMtbzQwZK3lCA1bmOuCa/E8JUYwDflTEr3VUavEXoD47WHxaFC1s3TXHu";
        // console.log('Plain Text : ' + plaintext);
        var toDecryptText = 'kOWAuf0hKHFW1rlwWc91auvUI2C9+gelPPuSzZlnU1+aosJnVTMC87vUphtvWlRgW4BCz1U3phP5iRELU6Iu0DnuWlClLftGhZ+0bd7KmfrfpGZTwl1hfjcvCgsNOOR8D1y8S19vbxgA6pewE0Ke7/k9Bt2TFjQ2fzfW9xJAoNammSdGmHGrgVHPtBSgmnGZ6KfqWHwGvhJkvzcEn0PcI3paZz94lbd74U04W/aB+ahYkQgvcXQkCKLIrWJjus3JMzzoSM+FuQ9XNbedLKrW4fvpLT4feav3BnRy7bJcswOZwysnnk4DnB4xSa54Y4NkgrnVlteCN2FakAh/Eouj3yx3HvSn/s0pbeKWXIlRsWHNqYE1cUfxK00vaznbMTyp4BK7Rx8DDmPc+nCcG36XwwigLs3Er2yNsOSV6nQ26cpT87haWbpDdUF9f3ECBKAZsA02jdt+Oj8sBJdbb/yneFWNokLbj7DSH4TWNg+fxdvUwUXip3fyLbJVcfmZE7uF6ku11kj8uP+6kXuIVLgkN1e0hVdS0pP9ODyRph2q0X4=';
        var aesUtil = new AesUtil(keySize, iterationCount);
        // var ciphertext = aesUtil.encrypt(salt, iv, passphrase, plaintext);
        // console.log('Encrypted Data : ' + ciphertext);
       var decryptedText = aesUtil.decrypt(salt,iv,passphrase, toDecryptText);
       console.log('Decrypted Data : ' + decryptedText);
    }


    // private helper methods
    public jwt() {
        // create authorization header with jwt token
        // let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        // if (currentUser && currentUser.token) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer Fq5xC3LhCUvkcr7qVIJVbmo3LvcO");
        //  headers.append("client_id", "2");
        // headers.append("access_token", "2");


        return new RequestOptions({ headers: headers });
        // }
    }
    public loginjwt() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return new RequestOptions({ headers: headers }); 
        // return { 'Content-Type': 'application/json' };
    }

    //  public postMethod(url, body, header, dataReceived) {

    //     let modal: HttpsRequestOptions = {
    //         url: this.apiURL + url,
    //         method: 'POST',
    //         headers: header,
    //         body: body
    //     };

    //     Https.request(modal).
    //         then(function (response) {
    //             dataReceived.next(response);
    //             console.log(JSON.stringify(response));
    //             dataReceived.complete();

    //         }).
    //         catch(function (error) {
    //             dataReceived.next(error);
    //             dataReceived.complete();
    //         });
    // } 
}