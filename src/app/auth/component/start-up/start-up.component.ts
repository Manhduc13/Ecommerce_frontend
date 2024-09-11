import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-start-up',
  templateUrl: './start-up.component.html',
  styleUrl: './start-up.component.scss'
})
export class StartUpComponent {

  searchProductForm!: FormGroup;
  products: any[] = [];
  productNames: string[] = [];
  filteredProductNames!: Observable<string[]>;
  listOfCategories: any = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getAllProduct();
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
    this.authService.getAllProduct().subscribe(res => {
      res.forEach((element: { processedImg: string; returnImage: string; name: string }) => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnImage;
        this.products.push(element);
        this.productNames.push(element.name);
      });
    })
  }

  getAllCategory() {
    this.authService.getAllCategory().subscribe(res => {
      this.listOfCategories = res;
    })
  }

  getProductsByName(){
    this.products = [];
    const name = this.searchProductForm.get('productName')!.value;
    this.authService.getProductsByName(name).subscribe(res => {
      console.log(res);
      res.forEach((element: { processedImg: string; returnImage: string; }) => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnImage;
        this.products.push(element);
      });
    })
  }

  reset() {
    this.searchProductForm.reset({
      productName: null
    });
    this.getAllProduct();
  }
}
