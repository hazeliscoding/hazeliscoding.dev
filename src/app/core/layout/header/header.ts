import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

type ThemeChoice = 'light' | 'dark';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private currentPath = '/';

  theme: ThemeChoice = 'dark';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentPath = (event as NavigationEnd).urlAfterRedirects.split('?')[0];
      });

    // localStorage/matchMedia are browser-only; during SSR the default stands.
    // The index.html pre-paint script has already seeded localStorage from the
    // system setting on first visit, but resolve here too for safety.
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        this.theme = stored;
      } else {
        this.theme = window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';
        localStorage.setItem('theme', this.theme);
      }
    }
  }

  isMenuOpen = false;

  cycleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';

    if (typeof document === 'undefined') return;

    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  isActive(route: string) {
    if (route === '/') {
      return this.currentPath === '/';
    }

    return this.currentPath === route || this.currentPath.startsWith(`${route}/`);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
