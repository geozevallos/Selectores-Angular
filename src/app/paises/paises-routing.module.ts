import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPagePage } from './pages/selector-page/selector-page.page';


const routes: Routes = [{
  path: '',
  children: [{
    path: 'selector', component: SelectorPagePage
  },
  { path: '**', redirectTo: 'selector' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
