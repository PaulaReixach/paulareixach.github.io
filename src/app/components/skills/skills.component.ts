import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../projects/reveal-on-scroll.directive';

type SkillItem = {
  name: string;
  icon: string;  
  level: number;  
  tags?: string[];
};

type SkillGroup = {
  title: string;
  caption: string;
  items: SkillItem[];
};

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  groups: SkillGroup[] = [
    {
      title: 'Frontend',
      caption: 'Interfaz, accesibilidad y DX',
      items: [
        { name: 'Angular',      icon: 'assets/skills/angular.svg',    level: 85, tags: ['SPA','RxJS', 'Componentes'] },
        { name: 'TypeScript',   icon: 'assets/skills/typescript.svg', level: 75, tags: ['Buenas prácticas'] },
        { name: 'Tailwind CSS', icon: 'assets/skills/tailwindcss.svg',   level: 55, tags: ['Responsive'] },
        { name: 'HTML & CSS',   icon: 'assets/skills/htmlcss.svg',    level: 85, tags: ['Accesibilidad'] },
      ],
    },
    {
      title: 'Backend',
      caption: 'APIs, auth y datos',
        items: [
          { name: 'Node.js',        icon: 'assets/skills/node.svg',            level: 80, tags: ['Servidor'] },
          { name: 'Java',           icon: 'assets/skills/java.svg',            level: 80, tags: ['Spring Boot'] },
          { name: 'PostgreSQL',     icon: 'assets/skills/postgresql.svg',      level: 70, tags: ['Relacional', 'DB'] },
          { name: 'MySQL',          icon: 'assets/skills/mysql.svg',           level: 70, tags: ['Relacional', 'DB'] },
          { name: 'Firebase',       icon: 'assets/skills/firebase.svg',        level: 75, tags: ['Auth', 'Realtime DB'] },
          { name: 'ElasticSearch',  icon: 'assets/skills/elasticsearch.svg',   level: 75, tags: ['Búsquedas', 'Indexación'] },
        ],
    },
    {
      title: 'Testing & Herramientas',
      caption: 'Calidad + flujo de trabajo',
      items: [
        { name: 'Git', icon: 'assets/skills/git.svg',        level: 90, tags: ['Control de versiones', 'Colaboración'] },
        { name: 'GitHub', icon: 'assets/skills/github.svg',        level: 95, tags: ['Repositorios', 'Pull Requests']},
        { name: 'Postman',      icon: 'assets/skills/postman.svg',    level: 55, tags: ['Pruebas API']  },
        { name: 'Docker',       icon: 'assets/skills/docker.svg',     level: 75, tags: ['DevOps', 'Contenedores'] },
        { name: 'Figma',        icon: 'assets/skills/figma.svg',      level: 40, tags: ['UI/UX'] },
      ],
    },
  ];

}
