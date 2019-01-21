import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    register(data: NgForm) {

        console.log(data.value);


        this.authService.register(data.value)
            .pipe(map(success => {
                let res = success.json();

                if (res) {

                    if (!res.success) {
                        console.log(res.error);

                    } else {

                        console.log('works');  //     this.router.navigate(['/login']);
                    }


                } else {
                    console.log('Error Problem creating account.');
                }
            }))
            .subscribe();


    }


}
