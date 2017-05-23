

export interface Customer {
    Id: number;
    Name: string;
    CustomerFilter: number;
}

export interface Client {
    Id: number;
    CustomerId: number;
    Customer: Customer;
    Name: string;
}

export interface Principal {
    Id: number;
    ClientId: number;
    Client: Client;
    Name: string;
}

export interface Contact {
    UserID: number;
    Nr: string;
    Name: string;
    Type: number;
    PrincipalId: number;
    Principal: Principal;
}






export interface GroupType {
    Id: number;
    Name: string;
}
export interface Editor {
    UserID: number;
    Nr: string;
    Name: string;
    Type: number;
    PrincipalId: number;
    Principal: Principal;
}

export interface CreateGroupRequestModel {
    Name: string;
    TypeId: number;
    UserIds: number[];
}

export interface Signature {
    Id: number
    UserId: number;
    Name: string;
    Text: string;
}


// Profile Picture Update for LoggedIn user


export interface Picture {

    File: string;
    ExtensionId: number;

}

export interface ProfilePictureUpdate {
    UserID: number;
    Nr: string;
    Name: string;
    Type: number;
    PictureId: number;
    Picture: Picture;
}

export interface UserProfileUpdate {
    UserID: number;
    Picture: Picture;
}

export interface PutUserProfile {
    UserID: number;
    Nr: string;
    Name: string;
    Type: number;
    PrincipalId: number;
    Principal: Principal;
    PictureId: number;
    Picture: Picture;
    Status: number;
}
export interface Picture {
    Id: number;
    File: string;
    ExtensionId: number;
    Extension: Extension;
}
export interface Extension {
    Id: number;
    Name: string;
    ExtensionSymbolId: number;
    CreateThumbnail: boolean;
}

export class Picture1 {
    File: string;
    ExtensionId: number;
}