/*export class MemberListModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public memberId: string,
        public frontCardSrc: string,
        public backCardSrc: string,
        public type: string,

    ){ }
}*/
export class MemberListModel {
    "firstName": string;
    "lastName": string;
    "type": string;
    "memberId": string;
    "isSelected"?: boolean;
    "cardDetails": CardModel
}

export class CardModel {
    "planName": string;
    "planType": string;
    "patientName": string;
    "cardNo": string;
    "suffix": string;
    "serviceNo": string;
    "rxBin": string;
    "pcn": string;
    "rxGrp": string;
    "copays": Copay[];
    "choice": string;
    "memberServiceNo": string;
    "providerServiceNo": string;
    "preAuthNo": string;
    "abuseNo": string;
    "locateProvNo": string;
    "blueCareNo": string;
}
export class Copay {
    "name": string;
    "suffix": string;
    "amount": string;
}