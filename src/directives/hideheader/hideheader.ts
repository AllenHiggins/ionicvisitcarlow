import { Directive } from '@angular/core';

/**
 * Generated class for the HideheaderDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[hideheader]' // Attribute selector
})
export class HideheaderDirective {

  constructor() {
    console.log('Hello HideheaderDirective Directive');
  }

}
