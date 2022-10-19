import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  account = this.accountService.accountValue;
  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private NavCtrl: NavController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
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
     this.accountService.update(this.account.id, this.form.value)
         .pipe(first())
         .subscribe({
             next: () => {
                 this.alertService.success('Password Changed successfully', { keepAfterRouteChange: true });
                 this.router.navigate(['../'], { relativeTo: this.route });
             },
             error: error => {
                 this.alertService.error(error);
                 this.loading = false;
             }
         });
 }

  onBack() {
    this.NavCtrl.back();
  }

}
