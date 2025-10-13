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

    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        const text = button.textContent?.trim();
        if (text === 'Ver Proyectos') {
          document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
        } else if (text === 'Contactar' || text === 'Enviar Mensaje') {
          document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
        } else if (text === 'Descargar CV') {
          alert('Función de descarga de CV - Demo');
        } 
      });
    });
  }


}
