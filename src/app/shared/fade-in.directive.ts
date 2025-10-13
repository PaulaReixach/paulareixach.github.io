import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'opacity 1.3s ease-out, transform 1.3s ease-out'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Aparece lentamente con un pequeño desplazamiento
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
            this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
            observer.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(this.el.nativeElement);
  }
}
