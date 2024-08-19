import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/service/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;
  numberItemReturn: number | null = null;
  listOfCategories: any = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(){
    this.getAllProduct();
    console.log(this.products);
    this.searchProductForm = this.fb.group({
      productName: [null],
      categoryName: [null]
    })
    this.getAllCategory();
  }

  getAllProduct() {
    this.products = [];
    this.authService.getAllProduct().subscribe(res => {
      res.forEach((element: { processedImg: string; returnImage: string; }) => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnImage;
        this.products.push(element);
      });
    })
  }

  getAllCategory(){
    this.authService.getAllCategory().subscribe(res => {
      this.listOfCategories = res;
    })
  }

  search(){
    this.products = [];
    console.log(this.searchProductForm.value);
    this.authService.search(this.searchProductForm.value).subscribe(res => {
      console.log(res);
      this.numberItemReturn = res.length;
      res.forEach((element: { processedImg: string; returnImage: string; }) => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnImage;
        this.products.push(element);
      });
    })
  }

  reset(){
    this.numberItemReturn = null;
    this.searchProductForm.reset({
      productName: null,
      categoryName: null
  });
    this.getAllProduct();
  }
}
