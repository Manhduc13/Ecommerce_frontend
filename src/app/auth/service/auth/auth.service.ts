import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/ecommerce/auth"];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  register(signUpRequest:any): Observable<any>{
    const url = `${BASE_URL}/signup`;
    return this.http.post(url,signUpRequest);
  }

  login(logInRequest:any): Observable<any>{
    const url = `${BASE_URL}/login`;
    return this.http.post(url,logInRequest);
  }

  getAllProduct(): Observable<any> {
    const url = `${BASE_URL}/product`;
    return this.http.get(url);
  }

  getAllCategory(): Observable<any> {
    const url = `${BASE_URL}/category`;
    return this.http.get(url);
  }

  search(searchProductRequest: any):Observable<any> {
    const url = `${BASE_URL}/search`;
    return this.http.post(url,searchProductRequest);
  }
}
