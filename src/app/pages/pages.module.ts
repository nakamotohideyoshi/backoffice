import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { SharedModule }  from '../shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { PagesRoutingModule, pagesComponents } from './pages.routes.module';
import { GetPageResolve } from './create-page/get-page.resolve';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    CKEditorModule
  ],
  declarations: [pagesComponents],
  providers: [GetPageResolve]
})
export default class PagesModule {

}
