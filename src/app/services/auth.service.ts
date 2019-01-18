import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private access;
    private token;

    constructor() {
    }


    register(credentials) {

        return Observable.create(observer => {
            firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
                .catch(error => observer.error(error));

            observer.next(true);
            observer.complete();
        });

    }

    login(email, password) {

        return Observable.create(observer => {

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(response => {
                    console.log(response);
                    this.access = response;
                    firebase.auth().currentUser.getIdToken()
                        .then(token => this.token = token);
                })
                .catch(error => console.log(error));

            setTimeout(() => {
                observer.next(this.token);
            }, 500);

            setTimeout(() => {
                observer.complete();
            }, 1000);


        }, err => console.error(err));

    }


    getToken(): any {


        firebase.auth().currentUser.getIdToken()
            .then(token => this.token = token);
        return this.token;

    }

    isAuthentificated() {


        return this.token != null;


    }


}
