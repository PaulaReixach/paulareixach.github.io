import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit{
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Scroll suave para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(
          (anchor as HTMLAnchorElement).getAttribute('href')!
        );
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Acciones para botones
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        const text = button.textContent?.trim();
        if (text === 'Ver Proyectos') {
          document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
        } else if (text === 'Contactar' || text === 'Enviar Mensaje') {
          alert('¡Gracias por tu interés! Esta es una demo del portfolio.');
        } else if (text === 'Descargar CV') {
          alert('Función de descarga de CV - Demo');
        } 
      });
    });
  }


}
