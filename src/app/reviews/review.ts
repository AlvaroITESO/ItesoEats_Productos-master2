export class Review {

    constructor(_id = '', name = '', message = '',rate = 0) {
        this._id = _id;
        this.name = name;
        this.message = message;
        this.rate= rate;
    }

    _id: string;
    name: string;
    message: string;
    rate: number;
}
