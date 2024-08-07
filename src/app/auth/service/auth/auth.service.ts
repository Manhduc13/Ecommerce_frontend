import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/ecommerce"];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  register(signUpRequest:any): Observable<any>{
    const url = `${BASE_URL}/auth/signup`;
    return this.http.post(url,signUpRequest);
  }

  login(logInRequest:any): Observable<any>{
    const url = `${BASE_URL}/auth/login`;
    return this.http.post(url,logInRequest);
  }
}
