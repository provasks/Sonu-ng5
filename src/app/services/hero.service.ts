import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { catchError, tap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
// import { filter } from 'rxjs/operators/filter';
import { of } from 'rxjs/observable/of';

import { Hero } from '../common/hero';
import { MessageService } from './message.service';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};


@Injectable()
export class HeroService {
  // private heroesUrl = 'http://jsonplaceholder.typicode.com/users';  // URL to web api
 private heroesUrl = 'http://localhost:8081/api/items';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
      tap(heroes => this.messageService.logInfo(`fetched heroes`)),
      catchError(this.messageService.logError('getHeroes', []))
      );
  }
  /** GET heroes from the server */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) { return of([]); }
    const url = `${this.heroesUrl}/find/${term}`;
    return this.http.get<Hero[]>(url).pipe(
      //map(heroes => heroes.filter(hero => hero.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)),
      tap(_ => this.messageService.logInfo(`found heroes matching "${term}"`)),
      catchError(this.messageService.logError<Hero[]>('searchHeroes', []))
    )
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.messageService.logInfo(`fetched hero id=${id}`)),
      catchError(this.messageService.logError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
      map(heroes => heroes[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.messageService.logInfo(`${outcome} hero id=${id}`);
      }),
      catchError(this.messageService.logError<Hero>(`getHero id=${id}`))
      );
  }
}