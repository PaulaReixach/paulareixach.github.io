import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, RevealOnScrollDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  constructor(private router: Router) { }

  openProject(projectId: string): void {
    this.router.navigate(['/projects', projectId]);
    console.log('Navigating to project:', projectId);
  }

}
