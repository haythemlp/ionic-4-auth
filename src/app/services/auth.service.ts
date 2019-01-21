import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Http} from '@angular/http';

import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    static readonly LOGIN_URL = environment.url + 'login';

    static readonly REGISTER_URL = environment.url + 'register';
    private access: boolean;
    private token: string;

    private user;


    constructor(public http: Http) {
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }


    register(credentials): Observable {

        return Observable.create(observer => {
            this.http.post(AuthService.REGISTER_URL, credentials)
                .pipe(map(res => {
                    console.log(res);
                    this.user = res.json();
                }), catchError(this.handleError)).subscribe();
            observer.next(this.user);
            observer.complete();
        });
    }

    login(credentials) {


        return Observable.create(observer => {

            this.http.post(AuthService.LOGIN_URL, credentials)
                .pipe(map(res => {
                console.log(res);
                this.user = res.json();
            }), catchError(this.handleError)).subscribe();


            setTimeout(() => {
                observer.next(this.token);
            }, 500);

            setTimeout(() => {
                observer.complete();
            }, 1000);


        }, err => console.error(err));

    }


    isAuthentificated() {


        return this.token != null;


    }


}
