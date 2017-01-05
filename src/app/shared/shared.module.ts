import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader,
  TranslateService
} from 'ng2-translate';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { CategoriesService } from './service/categories.service';
import { ProductsService } from './service/products.service';
import { ProvidersService } from './service/providers.service';
import { AttributesService } from './service/attributes.service';
import { PagesService } from './service/pages.service';
import { OptionsService } from './service/options.service';


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
  static translate;
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        CategoriesService,
        ProductsService,
        ProvidersService,
        AttributesService,
        PagesService,
        OptionsService,
      ]
    };
  }
  constructor(translate: TranslateService ) {
    translate.setDefaultLang('en');
    translate.use('en');
    SharedModule.translate = translate;
  }
}
