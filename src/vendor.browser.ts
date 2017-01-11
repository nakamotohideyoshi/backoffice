// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';
import '@angularclass/hmr';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import 'jquery';
import 'tether';
import 'bootstrap';
import 'widgster';
import 'pace';

// ag-grid
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-dark.css';
import 'ag-grid-ng2/main';

if ('production' === ENV) {
  // Production


} else {
  // Development

}
