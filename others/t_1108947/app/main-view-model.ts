import { Observable } from "tns-core-modules/data/observable";

export class PersonViewModel extends Observable {

    constructor() {
        super();
        this.person = new PatientQuestionnaire(new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11), "some question");
        //new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11);
    }

    set person(value: PatientQuestionnaire) {
        this.set("_person", value);
    }

    get person(): PatientQuestionnaire {
        return this.get("_person");
    }
}

export class Person {
    public name: string;
    public age: number;
    public email: string;
    public city: string;
    public street: string;
    public streetNumber: number;

    constructor(name, age, email, city, street, streetNumber) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
    }
}

export class PatientQuestionnaire {
    patient: Person;
    question1: string;
    constructor(patient: Person, question1: string) {
        this.patient = patient;
        this.question1 = question1;
    }
}