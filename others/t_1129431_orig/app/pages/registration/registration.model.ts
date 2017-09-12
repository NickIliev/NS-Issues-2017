

export class CreateUser {
    "regtype": string;
    "userid": string;
}
export class VerifyUser {
   "regtype": string;
   "userid": string;
   "code": string;
   "password": string;
}
export class VerifyHeaders {
    "access_token": string;
    "verification_code": string;
    "user_id": string;
}