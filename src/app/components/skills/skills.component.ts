import { Component } from '@angular/core';
import { NgFor } from '@angular/common'; 

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills = [
    { name: 'Angular', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 80 },
    { name: 'HTML & CSS', level: 95 },
    { name: 'Git & GitHub', level: 90 },
  ];
}
