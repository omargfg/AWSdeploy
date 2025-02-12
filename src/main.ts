import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(CommonModule),
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes, withHashLocation()) // Use Hash Location Strategy
  ]
}).catch(err => console.error(err));
