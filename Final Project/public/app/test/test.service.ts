import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';
@Injectable()
export class TestService {
    private _baseURL = 'api/test';
    constructor(private _http: Http) { }
    create(test: any): Observable<any> {
        return this._http
            .post(this._baseURL, test)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    read(testId: string): Observable<any> {
        return this._http
            .get(`${this._baseURL}/${testId}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    update(test: any): Observable<any> {
        return this._http
            .put(`${this._baseURL}/${test._id}`, test)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    delete(testId: any): Observable<any> {
        return this._http
            .delete(`${this._baseURL}/${testId}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    list(): Observable<any> {
        return this._http
            .get(this._baseURL)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().message || 'Server error');
    }
}