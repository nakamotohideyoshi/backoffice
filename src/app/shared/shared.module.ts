import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader,
  TranslateService
} from 'ng2-translate';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import {
  CategoriesService,
  AttributesService,
  OptionsService,
  PagesService,
  ProductsService,
  ProvidersService,
  FAQsService,
  BadgesService
} from './service';


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
        FAQsService,
        BadgesService
      ]
    };
  }
  constructor(translate: TranslateService) {
    if (!!SharedModule.translate) {
      translate.use(SharedModule.translate.currentLang);
    } else {
      translate.setDefaultLang('se');
      translate.use('se');
    }
    SharedModule.translate = translate;
  }
}
