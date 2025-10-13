import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input() threshold = 0.15;
  @Input() rootMargin = '0px 0px -10% 0px';
  @Input() once = true;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnInit(): void {
    this.r.addClass(this.el.nativeElement, 'reveal');

    if (typeof (window as any).IntersectionObserver === 'undefined') {
      this.r.addClass(this.el.nativeElement, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.r.addClass(this.el.nativeElement, 'is-visible');
            if (this.once) this.observer?.unobserve(this.el.nativeElement);
          } else if (!this.once) {
            this.r.removeClass(this.el.nativeElement, 'is-visible');
          }
        });
      },
      { threshold: this.threshold, rootMargin: this.rootMargin }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
