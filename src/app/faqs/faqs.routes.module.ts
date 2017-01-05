import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';


import { FAQsComponent } from './faqs.component';
import { FAQsListComponent } from './faqs-list/faqs-list.component';
import { CreateFAQ } from './create-faq/create-faq.component';
import { GetFAQResolve } from './create-faq/get-faq.resolve';

const routes: Routes = [
  {
    path: '', component: FAQsComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: FAQsListComponent },
    {
      path: 'edit/:id',
      component: CreateFAQ,
      resolve: { faq: GetFAQResolve }
    },
    { path: 'new', component: CreateFAQ }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FAQsRoutingModule {

}
export const faqsComponents = [
  FAQsComponent,
  FAQsListComponent,
  CreateFAQ
];
