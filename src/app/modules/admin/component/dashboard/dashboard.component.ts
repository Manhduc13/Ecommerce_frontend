import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/service/auth/auth.service';
import { map, Observable, startWith } from 'rxjs';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  searchProductForm!: FormGroup;
  products: any[] = [];
  productNames: string[] = [];
  filteredProductNames!: Observable<string[]>;
  listOfCategories: any = [];

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) { }

  ngOnInit(){
    this.getAllProduct();
    console.log(this.products);
    this.searchProductForm = this.fb.group({
      productName: ['',Validators.required]
    })
    this.filteredProductNames = this.searchProductForm.get('productName')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productNames.filter(name => name.toLowerCase().includes(filterValue));
  }

  getAllProduct() {
    this.products = [];
    this.adminService.getAllProduct().subscribe(res => {
      res.forEach((element: { processedImg: string; returnImage: string; name: string }) => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnImage;
        this.products.push(element);
        this.productNames.push(element.name);
      });
    })
  }

  getProductsByName(){
    this.products = [];
    const name = this.searchProductForm.get('productName')!.value;
    this.adminService.getProductsByName(name).subscribe(res => {
      console.log(res);
      res.forEach((element: { processedImg: string; returnImage: string; }) => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnImage;
        this.products.push(element);
      });
    })
  }

  reset(){
    this.searchProductForm.reset({
      productName: null
  });
    this.getAllProduct();
  }
}
