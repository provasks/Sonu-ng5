import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../common/hero'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() hero:Hero;
  // public hero:Hero = {
  //   name: 'provas',
  //   id:0
  // };
  constructor() { }

  ngOnInit() {
  }

}
