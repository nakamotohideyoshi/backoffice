import { Routes, RouterModule }  from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { NgModule } from '@angular/core/src/metadata/ng_module';


const routes: Routes = [
  { path: '', redirectTo: '0', component: CategoriesComponent },
  { path: ':id', component: CategoriesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}

export const routingComponents = [
  CategoriesComponent
];
