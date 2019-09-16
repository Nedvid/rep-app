import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import * as Sentry from '@sentry/browser';
import { RouterExtService } from './routerExt.service';
import { DeviceDetectorModule } from 'ngx-device-detector';

if (environment.sentry_dsn) {
  Sentry.init({
    dsn: environment.sentry_dsn
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

export const APP_ID = 'my-app';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: APP_ID }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot()
  ],
  exports: [AppRoutingModule],
  providers: [
    RouterExtService,
    { provide: ErrorHandler, useClass: SentryErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private routerExtService: RouterExtService) { }
}
