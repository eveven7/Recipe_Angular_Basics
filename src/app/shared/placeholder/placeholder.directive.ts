import { Component, Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceholder]',//atribute selector
})
export class PlaceholderDirective {
  constructor(public viewContainerRef:ViewContainerRef){}
}
