export class User {
    constructor(email: string, private _token: string) {}

    get token() {        
        return this._token;
    }
}
