import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisesRoutingModule } from './paises-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectorPagePage } from './pages/selector-page/selector-page.page';


@NgModule({
  declarations: [SelectorPagePage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaisesRoutingModule
  ]
})
export class PaisesModule { }
