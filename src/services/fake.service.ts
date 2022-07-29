import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  constructor(private http: HttpClient) { }

  getDataV1():Observable<any>{
    const url="https://oussjaz/1";
    return this.http.get(url);
  }

  getDataV2():Observable<any>{
    const url="https://oussjaz/1";
    return this.http.get(url).pipe(
      tap((data:any) => console.log("Data fetched",data)),
      catchError(this.handelError("Failed to fetch data"))
      )
  }

  postDataV1(obj:any):Observable<any>{
    const url="https://oussjaz/1";
    const httpOptions = {
      headers: new HttpHeaders({'content-type':'application/json'})
    }
    return this.http.post(obj,url);
  }

  private handelError<T>(operation = 'operation'){
    return (error: HttpErrorResponse):Observable<T> =>{
      console.error(error);

      const message = `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    }
  }
}
