import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
