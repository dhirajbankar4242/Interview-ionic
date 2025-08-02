import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { finalize, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";
import { LoaderService } from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private defaultTimeout = 120000;


  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseUrl + 'client/upload', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);  
  //   return this.http.post(this.baseUrl + 'upload', formData, {
  //     reportProgress: true,
  //     responseType: 'json',
  //     observe: 'events'
  //   });    
  // }

  login(credentials: any): Observable<any> {

    this.loaderService.startLoading();

    return this.http.post(this.baseUrl + 'auth/login', credentials).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  getOtpToLogin(mobile: any): Observable<any> {

    this.loaderService.startLoading();

    return this.http.get(this.baseUrl + 'auth?mobile=' + mobile).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  public refreshAccessToken(refreshToken: any) {

    this.loaderService.startLoading();

    const header = new HttpHeaders({
      'token': refreshToken
    });

    return this.http.get(this.baseUrl + 'auth/refresh', {
      headers: header,
      responseType: 'text'
    }).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  get(url: string, params?: any): Observable<any> {
    this.loaderService.startLoading();
    const options = params ? { params } : {};
    return this.http.get(`${this.baseUrl}${url}`, options).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  post(url: string, data: any, p0?: { headers: HttpHeaders; responseType: string; }): Observable<any> {

    this.loaderService.startLoading();

    return this.http.post(`${this.baseUrl}${url}`, data).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  put(url: string, data: any): Observable<any> {

    this.loaderService.startLoading();

    return this.http.put(`${this.baseUrl}${url}`, data).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  patch(url: string, data: any): Observable<any> {

    this.loaderService.startLoading();

    return this.http.patch(`${this.baseUrl}${url}`, data).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  delete(url: string): Observable<any> {

    this.loaderService.startLoading();

    return this.http.delete(`${this.baseUrl}${url}`).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  downloadExcel(url: string) {


    this.loaderService.startLoading(1);
    this.downloadFile(url).subscribe(
      (event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          if (event.total) {
            this.loaderService.startLoading(Math.round((event.loaded / event.total) * 100));
          }
        } else if (event.type === HttpEventType.Response) {
          if (event.body) {
            const blob = new Blob([event.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'excel_file.xlsx'; // Set the desired file name
            a.click();
            window.URL.revokeObjectURL(url);
            this.loaderService.stopLoading();
          }
        }
      },
      (error) => {
        // console.error('Error downloading file:', error);
        this.loaderService.stopLoading();
      }
    );
  }


  downloadPdf(url: string, method?: string, data?: any) {

    this.loaderService.startLoading(1);
    this.downloadFile(url, method, data).subscribe(
      (event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          if (event.total) {
            this.loaderService.startLoading(Math.round((event.loaded / event.total) * 100));
          }
        } else if (event.type === HttpEventType.Response) {
          if (event.body) {
            const blob = new Blob([event.body], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pdf.pdf'; // Set the desired file name
            a.click();
            window.URL.revokeObjectURL(url);
            this.loaderService.stopLoading();
          }
        }
      },
      (error) => {
        // console.error('Error downloading file:', error);
        this.loaderService.stopLoading();
      }
    );

  }

  downloadFile(url: string, method?: string, data?: any): Observable<HttpEvent<Blob>> {
    /*  const headers = new HttpHeaders({
       'Content-Type': 'application/pdf',
     }); */
    if (method == 'POST') {
      return this.http.post(`${this.baseUrl}${url}`, data, {
        responseType: 'blob',
        reportProgress: true,
        observe: 'events',
      });
    }
    return this.http.get(`${this.baseUrl}${url}`, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events',
    });
  }

}
