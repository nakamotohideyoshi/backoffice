import { Routes, RouterModule }  from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { NgModule } from '@angular/core/src/metadata/ng_module';
import { AddRoutesCategories } from './add-routes/add-routes.component';
import { CategoriesList } from './categories-list/categories-list';
import { CreateCategories } from './create-categories/create-categories.component';
import { CategoriesResolve } from './create-categories/categories-parents.resolve';
import { GetCategoriesResolve } from './create-categories/get-categories.resolve';

const routes: Routes = [
  { path: '', component: CategoriesComponent, children: [
    { path: '', redirectTo: '0', component: CategoriesList },
    { path: 'edit',
      redirectTo: '0',
      component: CreateCategories,
      resolve: { parents: CategoriesResolve }
    },
    { path: 'edit/:id',
      component: CreateCategories,
      resolve: { parents: CategoriesResolve, categories: GetCategoriesResolve }
    },
    { path: 'create', component: CreateCategories, resolve: { parents: CategoriesResolve } },
    { path: 'routes', redirectTo: 'routes/0', component: AddRoutesCategories },
    { path: 'routes/:id', component: AddRoutesCategories },
    { path: ':id', component: CategoriesList, pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}

export const routingComponents = [
  CategoriesComponent,
  CategoriesList,
  AddRoutesCategories,
  CreateCategories
];
