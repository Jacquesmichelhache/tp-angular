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
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
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
export class HeroesListComponent implements OnInit {

  constructor() { }

  herosList = ['Brown Ale','Pale Ale','India Pale Ale','Porter','Stout','Belgian Style Beer',
'Wheat Beer','Pale Lagers','Dark Lagers','German-Style Bocks', 'American Sour','Belgian Fruit Lambic',
'Flanders Red Ale','Belgian Gueuze',' Scotch Ale','Stout','Witbier','Vienna Lager','Weizenbock',
'Saison','Fruit Beer','Rye Beer','Honey Beer','Wild Beer','Smoked Beer','Wood-aged beer','Vegetable Beer']

  heroes:string[] = []

  ngOnInit(): void {
    this.heroes = this.herosList
  }


  onFilter(filterValue:string){

    let criteria = filterValue ? filterValue.trim() : ''

    this.heroes = this.herosList.filter((hero=>hero.toLowerCase().includes(criteria.toLowerCase())))
  }

  onClick(){

    
  }
}
