import { Component, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AccountService } from './_services';
import { Account, Role } from './_models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Role = Role;
  account: Account;
  constructor(
    private accountService: AccountService,
    private platform: Platform,
    private router: Router
  ) { 
    this.accountService.account.subscribe(x => this.account = x);
  }
  
  logout() {
    this.accountService.logout();
}

  ngOnInit(): void {
  }


  onAdmin() {
    this.router.navigate(['admin']);
  }
  onHome() {
    this.router.navigate(['home']);
  }

}
