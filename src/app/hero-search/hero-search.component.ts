import { Hero } from './../common/hero';
import { Component, OnInit, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { HeroService } from '../services/hero.service';
import {BrowserModule} from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ HeroSearchComponent ],
  bootstrap: [ HeroSearchComponent ]
})

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  @Output('selectedHero') heroSelected = new EventEmitter<Hero>();

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  private selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  // Push a search term into the observable stream.
  search(term: string, e): void {
    this.searchTerms.next(term);
    e.srcElement.parentElement.querySelector('.search-result').style.display = "block";
  }
  select(e, hero) {
    e.srcElement.parentElement.parentElement.style.display = "none"
    this.heroSelected.emit(hero);
    // this.router.navigate([`/detail/${hero.id}`]);
  }
  setWidth(e) {
    let parent = e.srcElement.parentElement;
    parent.querySelector('.search-result').style.width = parent.offsetWidth + 'px';
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}