import { HeroSearchComponent } from './../hero-search/hero-search.component';
import { Component, OnInit, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';
import { Hero } from '../common/hero';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ HeroDetailComponent ],
  bootstrap: [ HeroDetailComponent ]
})
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input('hero') heroSelected: Hero;  
  hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  showHero(){
    alert("Hi");
  }
}
