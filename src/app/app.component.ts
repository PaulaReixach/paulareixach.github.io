import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


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
  imports: [NavbarComponent, 
    RouterModule,
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'portfolio-base';


}
