import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimateGroup]',
  standalone: true
})

export class ScrollAnimateDirective implements OnInit, OnDestroy {
    @Input('appScrollAnimateGroup') animationClasses!: string[];
    @Input() delayBetween = 0;

    private observer!: IntersectionObserver;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        const children = this.el.nativeElement.children;

        // Estado inicial oculto
        for (let i = 0; i < children.length; i++) {
            this.renderer.addClass(children[i], 'hidden-before-animate');
        }

        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                for (let i = 0; i < children.length; i++) {
                if (this.animationClasses[i]) {
                    setTimeout(() => {
                    this.renderer.removeClass(children[i], 'hidden-before-animate');
                    this.renderer.addClass(children[i], this.animationClasses[i]);
                    }, i * this.delayBetween);
                }
                }
                this.observer.unobserve(this.el.nativeElement);
            }
            });
        }, {
            rootMargin: '0px 0px 30px 0px',
            threshold: 0
        });

        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy(): void {
    if (this.observer) {
        this.observer.disconnect();
    }
    }
}