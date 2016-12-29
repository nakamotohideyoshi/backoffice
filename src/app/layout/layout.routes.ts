import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';


const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module') },
    { path: 'another-page', loadChildren: () => System.import('../another/another.module') },
    { path: 'products', loadChildren: () => System.import('../products/products.module') },
    { path: 'categories', loadChildren: () => System.import('../categories/categories.module') }
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
