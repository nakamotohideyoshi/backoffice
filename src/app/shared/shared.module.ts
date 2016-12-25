import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { CategoriesService } from './service/categories.service';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, './assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [CategoriesService]
    };
  }
}
