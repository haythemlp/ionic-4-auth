import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import { Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    login(data: NgForm) {

        console.log(data.value);

        this.authService.login(data.value.email, data.value.password).subscribe(allowed => {
                if (allowed) {
                    console.log('work')
                    this.router.navigate(['/']);
                } else {
                    console.log('These credentials do not match our records.');
                }
            },
            error => {
                console.log(error);
            });
    }

}
