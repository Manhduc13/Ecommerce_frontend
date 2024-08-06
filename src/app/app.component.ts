import { Component } from '@angular/core';
import { StorageService } from './auth/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce_frontend';

  isAdminLoggiedIn: boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();
  name: String;

  constructor(
    private router: Router,
  ) {
    this.name = StorageService.getUserName()
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggiedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
    console.log(this.name);
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("");
  }
}
