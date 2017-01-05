import { Routes, RouterModule } from '@angular/router';
import { OptionsComponent } from './options.component';
import { OptionsListComponent } from './options-list/options-list.component';
import { NgModule } from '@angular/core/src/metadata/ng_module';

const routes: Routes = [
  { path: '', component: OptionsComponent, children: [
    { path: '', redirectTo: 'list', component: OptionsListComponent },
    { path: 'list',
      component: OptionsListComponent
    }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OptionsRoutingModule {
}

export const routingOptionsComponents = [
  OptionsComponent,
  OptionsListComponent
];
