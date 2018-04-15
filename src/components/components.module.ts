import { NgModule } from '@angular/core';
// if using ionic components in a component you are creating
// you need to import IonicModule and add it to imports
// in this file
import { IonicModule } from 'ionic-angular';
import { SpinnerComponent } from './spinner/spinner';
import { FooterComponent } from './footer/footer';


@NgModule({
	declarations: [SpinnerComponent,
    FooterComponent],
	imports: [IonicModule],
	exports: [SpinnerComponent,
    FooterComponent]
})
export class ComponentsModule {}
