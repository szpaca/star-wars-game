import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {SWAPI} from "../apis/apis";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {
      provide: SWAPI,
      useValue: 'https://www.swapi.tech/api',
    },]
};
