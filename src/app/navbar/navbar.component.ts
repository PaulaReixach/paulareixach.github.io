import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isDark = false;

  constructor(
    private router: Router,
    private theme: ThemeService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {
    
    this.isDark = this.doc.documentElement.classList.contains('dark');
  }

  openProject(projectId: string): void {
    this.router.navigate(['/projects', projectId]);
    console.log('Navigating to project:', projectId);
  }

  onThemeToggle(checked: boolean) {
    this.theme.set(checked ? 'dark' : 'light');
    this.isDark = checked;
  }

  goTo(fragment: string, ev: Event) {
    ev.preventDefault();

    const baseUrl = this.router.url.split('#')[0]; 
    const isHome = baseUrl === '/' || baseUrl === '';

    if (isHome) {
      
      const el = document.getElementById(fragment);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        
        this.router.navigateByUrl('/#' + fragment);
      }
    } else {
      
      this.router.navigate(['/'], { fragment });

      
      const sub = this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(() => {
          const el = document.getElementById(fragment);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          sub.unsubscribe();
        });
    }
  }
}
