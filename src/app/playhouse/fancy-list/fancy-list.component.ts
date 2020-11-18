import { Component, OnInit, HostBinding } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition, 
  keyframes,
  query,
  stagger
} from '@angular/animations';




@Component({
  selector: 'app-fancy-list',
  templateUrl: './fancy-list.component.html',
  styleUrls: ['./fancy-list.component.scss'],
  animations:[
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px',height:'0px'}),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*', height:'*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px',height:'0px' })),
          ]),
        ])
      ]),
    ]),
  ]  
})
export class FancyListComponent implements OnInit {
  constructor() { }

  herosList = ["magma","superman","birdman", "spiderman", "batman", "iceMan", "Jacques",
  "magma","superman","birdman", "spiderman", "batman", "iceMan", "Jacques"]

  heroes:string[] = []

  ngOnInit(): void {
    this.heroes = this.herosList
  }


  onFilter(filterValue:string){

    let criteria = filterValue ? filterValue.trim() : ''

    this.heroes = this.herosList.filter((hero=>hero.toLowerCase().includes(criteria.toLowerCase())))
  }

}
