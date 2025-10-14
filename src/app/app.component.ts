import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './core/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterModule, FooterComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isDark = false;
  constructor(private theme: ThemeService, @Inject(DOCUMENT) private doc: Document) {
    this.theme.init();
  }
  ngOnInit() { this.isDark = this.doc.documentElement.classList.contains('dark'); }
  onThemeToggle(checked: boolean) { this.theme.set(checked ? 'dark' : 'light'); this.isDark = checked; }
}
