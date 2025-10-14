import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Mode = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT);

  init() {
    const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
    if (saved === 'dark' || saved === 'light') {
      this.apply(saved === 'dark');
      return;
    }
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.apply(prefersDark);
  }

  toggle() {
    const isDark = !this.doc.documentElement.classList.contains('dark');
    this.apply(isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  set(mode: Mode) {
    localStorage.setItem(STORAGE_KEY, mode);
    if (mode === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.apply(prefersDark);
    } else {
      this.apply(mode === 'dark');
    }
  }

  private apply(isDark: boolean) {
    const el = this.doc.documentElement;

    el.classList.add('theme-transition');
    el.classList.toggle('dark', isDark);

    setTimeout(() => el.classList.remove('theme-transition'), 400);
  }
}
