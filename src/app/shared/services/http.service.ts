import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private dateService: DateService) {}
  Get<T>(url: string, params?: any) {
    return this.http.get<T>(url, { params: params }).pipe(
      map((res) => {
        if (res['data']) {
          if (res['data']['data']) {
            res['data']['data'].forEach((item) => {
              if (item['created_at']) {
                item['created_date'] = this.dateService.timestampToDate(
                  item['created_at']
                );
              }
            });
            return res['data'];
          }
          res['data'].forEach((item) => {
            if (item['created_at']) {
              item['created_date'] = this.dateService.timestampToDate(
                item['created_at']
              );
            }
          });
          return res['data'];
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
        return res['data'] ? res['data'] : [];
      }),
      // retry(2),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  PostFormData<T>(url: string, formData: FormData) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      `multipart/form-data`
    );
    return this.http.post(url, formData).pipe(
      map((res) => {
        return res['data'] ? res['data'] : [];
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
        return res['data'] ? res['data'] : [];
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
