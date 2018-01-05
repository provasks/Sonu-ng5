import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  logInfo(message: string) {
    console.info(message);
  }

  // logError(message: string) {
  //   console.error(message);
  // }

  logWarn(message: string) {
    console.warn(message);
  }

  show(message:string){
    alert(message);
  }

  /* Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  logError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
          console.error(`${operation} failed: ${error.message}`);
          return of(result as T);
      };
  }
}