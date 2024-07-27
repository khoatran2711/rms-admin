import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }
  Get<T>(url: string, params?: any) {
    return this.http.get<T>(url, { params: params }).pipe(
      map((res) => {
        if (res["data"]) {
          return res["data"];
        }
        if (res["results"]) {
          return res["results"];
        }
      }),
      // retry(1),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  Post<T>(url: string, body: any, params?: any) {
    return this.http.post(url, body, { params: params }).pipe(
      map((res) => {
        return res["data"] ? res["data"] : [];
      }),
      // retry(2),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  PostFormData<T>(url: string, formData: FormData) {
    const headers = new HttpHeaders().set(
      "Content-Type",
      `multipart/form-data`
    );
    return this.http.post(url, formData).pipe(
      map((res) => {
        return res["data"] ? res["data"] : [];
      }),
      // retry(2),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  Delete<T>(url: string, params?: any) {
    return this.http.delete(url, { params: params }).pipe(
      map((res) => {
        return res["data"] ? res["data"] : [];
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
