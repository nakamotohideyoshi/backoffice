import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { AttributesComponent } from './attributes.component';
import { AttributesListComponent } from './attributes-list/attributes-list.component';

const routes: Routes = [
  {
    path: '', component: AttributesComponent, children: [
    { path: '', redirectTo: 'size', pathMatch: 'full' },
    { path: ':type', component: AttributesListComponent }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AttributesRoutingModule {

}
export const attributesComponents = [
  AttributesComponent,
  AttributesListComponent
];
