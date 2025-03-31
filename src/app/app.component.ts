import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from '../shared/components/header/header.component';
import { HomeComponent } from '../pages/home/home.component';
import { UserformComponent } from '../pages/userform/userform.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { CommonModule } from '@angular/common'; // Add this import
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    HomeComponent,
    UserformComponent,
    LoginComponent,
    SignupComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;
  title = 'InternshipProject1_LOC_Frontend';

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('AppComponent initialized, initial URL:', this.router.url);
    this.updateHeaderVisibility(this.router.url); // Set initial state

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects.split('?')[0];
        console.log('NavigationEnd event triggered');
        console.log('Current URL:', currentUrl);
        console.log('Routes to hide header:', ['/login', '/signup']);
        console.log('Should hide header?', ['/login', '/signup'].includes(currentUrl));
        this.updateHeaderVisibility(currentUrl);
      });
  }

  private updateHeaderVisibility(url: string) {
    this.showHeader = !['/login', '/signup'].includes(url);
    console.log('showHeader set to:', this.showHeader, 'for URL:', url);
  }
}