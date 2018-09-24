import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpUtil {
  baseUrl: string = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ){}

  get<T>(url: string, params?: any): Promise<T> {
    const resultObservable = this.httpClient.get(this.baseUrl + url, {
      params: new HttpParams(params)
    }) as Observable<T>;
    const promise = resultObservable.toPromise();
    const resultPromise = new Promise<T>((resolve, reject) => {
      promise.then(value => {
        resolve(value);
      }).catch(error => {
        reject(error);
      })
    });
    return resultPromise;
  }
}
