import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  account = this.accountService.accountValue;
  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private NavCtrl: NavController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        firstName: [this.account.firstName, Validators.required],
        lastName: [this.account.lastName, Validators.required],
        userName: [this.account.userName, Validators.required],
        email: [this.account.email, [Validators.required, Validators.email]]
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
                 this.alertService.success('Update successful', { keepAfterRouteChange: true });
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