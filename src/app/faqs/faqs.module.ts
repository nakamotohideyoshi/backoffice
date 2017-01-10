import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { SharedModule }  from '../shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { FAQsRoutingModule, faqsComponents } from './faqs.routes.module';
import { GetFAQResolve } from './create-faq/get-faq.resolve';

@NgModule({
  imports: [
    CommonModule,
    FAQsRoutingModule,
    SharedModule,
    CKEditorModule
  ],
  declarations: [faqsComponents],
  providers: [GetFAQResolve]
})
export default class FAQsModule {

}
