import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { SearchComponent } from './app/components/search/search.component';
import { EventDetailsComponent } from './app/components/event-details/event-details.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { AuthComponent } from './app/components/auth/auth.component';

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'auth', component: AuthComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
});
