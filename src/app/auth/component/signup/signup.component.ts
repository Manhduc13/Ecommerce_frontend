import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm!: FormGroup;
  hidepassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<SignupComponent>
  ) { }

  ngOnInit() {
    console.log('SignupComponent initialized')
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidate]]
    })
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls["password"].value) {
      return { confirm: true, required: true };
    }
    return {};
  }

  togglePasswordVisibility() {
    this.hidepassword = !this.hidepassword;
  }

  onSubmit() {
    this.authService.register(this.signUpForm.value).subscribe(
      (res) => {
        this.snackBar.open('Sign up successful.', 'Close', { duration: 5000 });
        this.router.navigateByUrl("/signin");
      },
      (error) => {
        this.snackBar.open('Sign up failed. Please try it again!', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
