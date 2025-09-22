import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCounter]',
  standalone: true
})
export class CounterDirective implements AfterViewInit {
  @Input() target = 0; // número objetivo
  @Input() duration = 2000; // duración animación en ms

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    let start = 0;
    const end = this.target;
    const increment = end / (this.duration / 16); // ~60fps
    const element = this.el.nativeElement;

    const step = () => {
      start += increment;
      if (start < end) {
        element.textContent = Math.floor(start) + '+';
        requestAnimationFrame(step);
      } else {
        element.textContent = end + '+';
      }
    };

    requestAnimationFrame(step);
  }
}
