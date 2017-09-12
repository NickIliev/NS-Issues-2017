export class MedicationModel {
    "medicationId": string;
    "medicationName": string;
    "form": string;
    "dosage": string;
    "pharmacyName": string;
    "doctorname": string;
    "address1": string;
    "city": string;
    "state": string;
    "zipcode": string;
    "doctorMobile": string;
    "pharmacyMobile": string;
    "lastDateFill": string[];
}



export class MemberModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public type: string;
    public isSelected?: Boolean;
}
