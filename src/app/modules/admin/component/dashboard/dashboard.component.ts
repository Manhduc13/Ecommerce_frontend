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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(){
    this.getAllProduct();
    console.log(this.products);
    this.searchProductForm = this.fb.group({
      name: [null,[Validators.required]]
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
      console.log(res);
      res.forEach((element: { processedImg: string; returnImage: string; }) => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnImage;
        this.products.push(element);
      });
    })
  }
}
