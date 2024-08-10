import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/service/storage/storage.service';

const BASE_URL = ["http://localhost:8080/ecommerce/admin"];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) { }

  addCategory(categoryRequest: any): Observable<any> {
    const url = `${BASE_URL}/category`;
    const headers = this.createAuthorizationHeader();
    return this.http.post(url, categoryRequest, { headers });
  }

  addProduct(productRequest: any): Observable<any> {
    const url = `${BASE_URL}/product`;
    const headers = this.createAuthorizationHeader();
    return this.http.post(url, productRequest, { headers });
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
