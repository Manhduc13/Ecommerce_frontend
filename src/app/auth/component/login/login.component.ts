import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { StorageService } from '../../service/storage/storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  logInForm!: FormGroup;
  hidepassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('SigninComponent initialized')
    this.logInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidepassword = !this.hidepassword;
  }

  onSubmit(){
    this.authService.login(this.logInForm.value).subscribe((res) => {
        console.log(res)
        if(res.id != null){
          const user = {
            id: res.id,
            role: res.role,
            name: res.name
          }
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
          console.log("this is name from login component:" + user.name)
          if (StorageService.isAdminLoggedIn()) {
            this.snackBar.open('Log in successful.', 'Close', { duration: 5000 });
            this.router.navigateByUrl("/admin/dashboard");
          } else if (StorageService.isCustomerLoggedIn()) {
            this.snackBar.open('Log in successful.', 'Close', { duration: 5000 });
            this.router.navigateByUrl("/customer/dashboard");
          } else {
            this.snackBar.open('Log in failed. Please try it again!', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
          }
        } else {
          this.snackBar.open('Log in failed. Please try it again!', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      }
    )
  }
}
