import { Directive,ViewContainerRef  } from '@angular/core';

@Directive({
  selector: '[dialogHost]'
})
export class DialogDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
