import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


    constructor(private authService: AuthService,
                private router: Router,
                @Inject(SESSION_STORAGE) private storage: StorageService) {
    }

    ngOnInit() {
    }

    login(data: NgForm) {


        this.authService.login(data.value)
            .pipe(map(success => {
                let res = success.json();

                if (res) {

                    if (!res.success) {
                        console.log(res.error);

                    } else {
// this.storage.set()

                        localStorage.setItem('user', res.data.token);


                        console.log('works');  //     this.router.navigate(['/login']);
                    }


                } else {
                    console.log('Error Problem creating account.');
                }
            }))
            .subscribe();


    }

}
