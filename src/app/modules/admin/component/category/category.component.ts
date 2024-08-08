import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('CategoryComponent initialized')
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  addCategory() {
    if (this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe((res) => {
        console.log(res);
        if (res.id != null) {
          this.snackBar.open('New category has been added.', 'Close', { duration: 5000 });
          this.router.navigateByUrl("/admin/dashboard")
        } else {
          this.snackBar.open('No category has been added. Please try it again!', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      })
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
