import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

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


        this.authService.register(data.value)
            .subscribe(success => {


                if (success) {

                    if(!success.success){
                     console.log(success.error);
                    }
                    console.log('works');
                    //     this.router.navigate(['/login']);
                } else {
                    console.log('Error Problem creating account.');
                }
            });


    }


}
