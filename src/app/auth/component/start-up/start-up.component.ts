import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-up',
  templateUrl: './start-up.component.html',
  styleUrl: './start-up.component.scss'
})
export class StartUpComponent {
  products: any[] = [];
  searchProductForm!: FormGroup;
  numberItemReturn: number | null = null;
  listOfCategories: any = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.getAllProduct();
    this.searchProductForm = this.fb.group({
      name: [null,[Validators.required]],
      category: [null]
    })
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

  search(){
    this.products = [];
    this.authService.findAllByName(this.searchProductForm.get('name')?.value).subscribe(res => {
      this.numberItemReturn = res.length;
      res.forEach((element: { processedImg: string; returnImage: string; }) => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnImage;
        this.products.push(element);
      });
    })
  }

  reset(){
    this.numberItemReturn = null;
    this.getAllProduct();
  }

  // findProduct(){
  //   this.products = [];
  //   this.authService.findProduct(this.searchProductForm.value).subscribe(res => {
  //     this.numberItemReturn = res.length;
  //     res.forEach((element: { processedImg: string; returnImage: string; }) => {
  //       element.processedImg = 'data:image/jpg;base64,' + element.returnImage;
  //       this.products.push(element);
  //     });
  //   })
  // }
}
