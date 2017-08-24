export class TicketViewModel  {

    private _ticketOrder: TicketOrder;
    private _movies: Array<Movie>;
    private _movieNames: Array<String>;

    constructor() {
    }

    get ticketOrder() {
        if (!this._ticketOrder) {
            this._ticketOrder = new TicketOrder();
        }
        return this._ticketOrder;
    }

get movies() {
    if (!this._movies) {
        this._movies = new Array<Movie>();
        this._movies.push(new Movie(123, "Zootopia"));
        this._movies.push(new Movie(217, "Captain America"));
        this._movies.push(new Movie(324, "The Jungle Book"));
    }
    return this._movies;
}


get movieNames() {
    if (!this._movieNames) {
        this._movieNames = this.movies.map((value: Movie) => value.name);
    }
    return this._movieNames;
}

}

export class Movie {
    public key: number;
    public name: string;

    constructor(key: number, name: string) {
        this.key = key;
        this.name = name;
    }
}

export class TicketOrder {
    public movie: number = 123;

    constructor() {
    }
}
// << dataform-converters-code