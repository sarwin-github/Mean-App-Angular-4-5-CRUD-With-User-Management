import { RequestOptions, BaseRequestOptions, RequestOptionsArgs } from '@angular/http';

export class CustomRequestOptions extends BaseRequestOptions {

    constructor() {
        super();
        this.headers.set('Content-Type', 'application/json');
    }
    merge(options?: RequestOptionsArgs): RequestOptions {
        const token = sessionStorage.getItem('token');
        const newOptions = super.merge(options);
        
        if (token) {
            newOptions.headers.set('Authorization', `${token}`);
        }

        return newOptions;
    }
}