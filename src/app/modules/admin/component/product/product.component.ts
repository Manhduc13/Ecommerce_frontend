import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  addProductForm!: FormGroup;
  listOfCategories: any = [];
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ){}

  onFileSelected(event: any){
    if (event && event.target && event.target.files) {
      this.selectedFile = event.target.files[0];
      this.previewImage();
    } else {
      console.error("No file selected or event is not valid");
    }
  }

  previewImage(){
    if (this.selectedFile && this.selectedFile.type.startsWith('image/')) { // Check if the file is an image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      console.error("Selected file is not an image or no file selected");
    }
  }

  ngOnInit(){
    this.addProductForm = this.fb.group({
      categoryId: [null,[Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    this.getAllCategory();
  }

  getAllCategory(){
    this.adminService.getAllCategory().subscribe(res => {
       this.listOfCategories = res;
    })
  }

  addProduct(){
    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.error("No file selected");
    }

    formData.append('name', this.addProductForm.get('name')?.value);
    formData.append('price', this.addProductForm.get('price')?.value);
    formData.append('description', this.addProductForm.get('description')?.value);
    formData.append('category_id', this.addProductForm.get('categoryId')?.value);

    this.adminService.addProduct(formData).subscribe((res) => {
      if(res.id != null){
        this.snackBar.open('Product posted successfully', 'Close', {duration:5000});
        this.router.navigateByUrl('/admin/dashboard')
      } else {
        this.snackBar.open(res.message, 'ERROR', {duration: 5000});
      }
    })
  }
}
