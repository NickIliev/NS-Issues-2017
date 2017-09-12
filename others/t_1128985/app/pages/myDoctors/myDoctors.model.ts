export class DoctorModel {
        public doctorId: number;
        public name: string;
        public speciality: string;
        public address1: string;
        public city: string;
        public state: string;
        public zipcode: number;
        public mobile: string;
        public review: ReviewModel;
        public visits: string[];
}

export class ReviewModel {
        public total: number;
        public totalpoints: number;
}


export class MemberModel {
        public id: number;
        public firstName: string;
        public lastName: string;
        public type: string;
        public isSelected?: Boolean;
}
