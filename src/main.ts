import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserformComponent } from './pages/userform/userform.component';
import { routes } from './app.route';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [appConfig.providers,
    provideRouter(routes),
    provideHttpClient(withFetch()) // Configure HttpClient globally with Fetch API

  ]
  
  
});

