import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { StorageService } from './auth/service/storage/storage.service';
import { SignupComponent } from './auth/component/signup/signup.component';
import { LoginComponent } from './auth/component/login/login.component';
import { ProductComponent } from './modules/admin/component/product/product.component';
import { CategoryComponent } from './modules/admin/component/category/category.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog
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
  
  openSignupDialog(): void {
    this.dialog.open(SignupComponent);
  }

  openSigninDialog(): void {
    this.dialog.open(LoginComponent);
  }

  openProductDialog(): void {
    this.dialog.open(ProductComponent);
  }

  openCategoryDialog(): void {
    this.dialog.open(CategoryComponent);
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("");
  }
}
