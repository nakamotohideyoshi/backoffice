import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';


const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module') },
    { path: 'another-page', loadChildren: () => System.import('../another/another.module') },
    { path: 'products', loadChildren: () => System.import('../products/products.module') },
    { path: 'providers', loadChildren: () => System.import('../providers/providers.module') },
    { path: 'categories', loadChildren: () => System.import('../categories/categories.module') },
    { path: 'attributes', loadChildren: () => System.import('../attributes/attributes.module') },
    { path: 'pages', loadChildren: () => System.import('../pages/pages.module') },
    { path: 'options', loadChildren: () => System.import('../options/options.module') },
    { path: 'faqs', loadChildren: () => System.import('../faqs/faqs.module') },
    { path: 'badges', loadChildren: () => System.import('../badges/badges.module') }
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
