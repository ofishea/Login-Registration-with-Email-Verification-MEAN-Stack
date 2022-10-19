import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from '../../_services';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  accounts: any[];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private NavCtrl: NavController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.accountService.getAll()
        .pipe(first())
        .subscribe(accounts => this.accounts = accounts);
}

deleteAccount(id: string) {
  const account = this.accounts.find(x => x.id === id);
  account.isDeleting = true;
  this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => {
          this.accounts = this.accounts.filter(x => x.id !== id) 
      });
}


  onBack() {
    this.NavCtrl.back();
  }

}
