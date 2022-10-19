import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import '/node_modules/flag-icons/css/flag-icons.min.css'
import data from "../data/country.json";

import { AccountService, AlertService } from '../_services';
import { MustMatch } from '../_helpers';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

public countries = data;
form: FormGroup;
loading = false;
submitted = false;

  ptype:any= 'password';
  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', Validators.required],
        country: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
}


  switchType()
  {
    if(this.ptype == 'password')
    {
      this.ptype = 'text';
    }

    else
    {
      this.ptype = 'password'
    }
  }

   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }

   onSubmit() {
       this.submitted = true;

       // reset alerts on submit
       this.alertService.clear();

       // stop here if form is invalid
       if (this.form.invalid) {
           return;
       }

       this.loading = true;
       this.accountService.register(this.form.value)
           .pipe(first())
           .subscribe({
               next: () => {
                   this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                   this.router.navigate(['../login'], { relativeTo: this.route });
               },
               error: error => {
                   this.alertService.error(error);
                   this.loading = false;
               }
           });
   }


  onBack() {
    this.navCtrl.back();
  }
  onLogin() {
    this.router.navigate(['login']);
  }
}
