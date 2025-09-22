import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ScrollAnimateDirective } from './scroll-animate.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit{
  stats = [
  { label: 'Años', value: 2, suffix: '+', current: 0 },
  { label: 'Proyectos', value: 5, suffix: '+', current: 0 },
  { label: 'Tecnologías', value: 14, suffix: '+', current: 0 },
  ];

   @ViewChildren('statEl') statElements!: QueryList<ElementRef>;

    ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset['index']);
          this.animateValue(index);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.statElements.forEach((el, index) => {
      (el.nativeElement as HTMLElement).dataset['index'] = index.toString();
      observer.observe(el.nativeElement);
    });
  }

  private animateValue(index: number) {
    const stat = this.stats[index];
    let start = 0;
    const end = stat.value;
    const duration = 1500; // ms
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      this.stats[index].current = start;
      if (start >= end) {
        clearInterval(timer);
        this.stats[index].current = end;
      }
    }, stepTime);
  }
}
