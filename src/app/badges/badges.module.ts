import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { SharedModule }  from '../shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { BadgesRoutingModule, badgesComponents } from './badges.routes.module';
import { GetBadgeResolve } from './create-badge/get-badge.resolve';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    BadgesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CKEditorModule,
    FileUploadModule
  ],
  declarations: [badgesComponents],
  providers: [GetBadgeResolve]
})
export default class BadgesModule {

}
