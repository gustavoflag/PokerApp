import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { Observable, catchError, of } from "rxjs";
import { Router } from "@angular/router";

interface IMongooseObj {
  _id: string
}

@Injectable()
export class HttpClientService {
  private baseUrlService: string = '';

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private router: Router,
  ){ 
    this.baseUrlService = this.configService.getUrlService();
  }

  get<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(
      `${this.baseUrlService}/${endpoint}`
    ).pipe(
      catchError(this.handleError<any>(`get ${endpoint}`, [] as T))
    );
  }

  post<T extends IMongooseObj>(endpoint: string, obj: T): Observable<T>{
    return this.httpClient.post<T>(
      `${this.baseUrlService}/${endpoint}`, 
      JSON.stringify(obj), 
      { headers: this.configService.getHeaders() }
    ).pipe(
        catchError(this.handleError<any>(`post ${endpoint}`, []))
    );
  }

  put<T extends IMongooseObj>(endpoint: string, obj: T): Observable<T>{
    return this.httpClient.put<T>(
      `${this.baseUrlService}/${endpoint}/${obj._id}`, 
      JSON.stringify(obj), 
      { headers: this.configService.getHeaders() }
    ).pipe(
      catchError(this.handleError<any>(`put ${endpoint}`, []))
    );
  }

  delete<T extends IMongooseObj>(endpoint: string, obj: T): Observable<any>{
    return this.httpClient.delete(
      `${this.baseUrlService}/${endpoint}/${obj._id}`, 
      { headers: this.configService.getHeaders() })
    .pipe(
      catchError(this.handleError<any>(`delete ${endpoint}`, [] as any))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401){
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login'], { queryParams: { expired: true } });
      }
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}