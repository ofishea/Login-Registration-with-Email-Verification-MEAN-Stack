import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AccountService } from '../_services';
import { Account } from '../_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  account: Account;

  constructor(
    private accountService: AccountService,
    private navCtrl: NavController,
    private router: Router
 ) { 
  this.accountService.account.subscribe(x => this.account = x);
 }
  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
}
}