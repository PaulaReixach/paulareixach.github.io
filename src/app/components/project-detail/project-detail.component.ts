import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface GalleryItem {
  src: string;
  title?: string;   
  desc?: string;    
  alt?: string;    
}
interface ProjectInfo {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  state: string;
  type: string;
  duration: string;
  features: string[];
  challenges: string[];
  results: string[];
  icon?: string;
  gallery: GalleryItem[]; 
  colorClasses: {
    primary: string;
    primaryHover: string;
    light: string;
    text: string;
    bg: string;
  };
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  projectId: string | null = null;
  projectData: ProjectInfo | null = null;

  // Estado de galería
  activeIndex = 0;

  isLightboxOpen = false;
  lightboxIndex = 0;

  // Tabs
  activeTab: string = 'descripcion';

  projectsInfo: { [key: string]: ProjectInfo } = {
    elasticadoptions: {
      title: 'ElasticAdoptions',
      subtitle: 'Sistema de adopción de animales con búsqueda avanzada (Elasticsearch)',
      description:
        'Una plataforma de e-commerce moderna y escalable desarrollada con React y Node.js, que incluye gestión de productos, carrito de compras, procesamiento de pagos y panel de administración',
      technologies: ['Angular', 'Node.js', 'Elasticsearch', 'Docker', 'Figma'],
      state: 'Completado',
      type: 'Desarrollo Full-Stack',
      duration: '3-6 meses',
      features: [
        'Búsqueda y filtrado avanzado por edad, raza, tamaño, pelaje y otros atributos',
        'Búsqueda de texto completo (full-text search) para localizar animales con descripciones específicas',
        'Indexación optimizada para grandes volúmenes de datos con Elasticsearch',
        'Paginación y ordenación de resultados con criterios personalizables',
        'Interfaz responsiva con Angular (resultados rápidos y UX cuidada)',
        'Despliegue contenido con Docker',
        'Arquitectura backend con Node.js y APIs REST para sincronización de índices',
      ],
      challenges: [
        'Diseñar mappings eficientes en Elasticsearch para evitar resultados incoherentes y optimizar el espacio.',
        'Optimizar las consultas para manejar grandes volúmenes de datos y mantener tiempos de respuesta rápidos.',
      ],
      results: [
        'Proyecto entregado dentro de plazo con una prueba de concepto funcional: búsqueda y filtrado en tiempos aceptables, índices preparados para escalar y documentación del deploy con Docker. A nivel de equipo validamos el flujo de trabajo con repositorios separados y buenas prácticas Git.',
      ],
      icon: 'assets/images/projects/icon_dog.png',
      gallery: [
        {
          src: 'assets/images/projects/website_elastic.png',
          title: 'Vista principal',
          desc: 'Resumen visual del proyecto',
          alt: 'Página principal de ElasticAdoptions'
        },
        {
          src: 'assets/images/projects/figma.png',
          title: 'Diseño',
          desc: 'Interfaz de búsqueda y filtrado',
          alt: 'Captura de pantalla de la interfaz de búsqueda avanzada'
        },
        {
          src: 'assets/images/projects/icon_dog.png',
          title: 'Logo / Cover',
          desc: 'Identidad visual',
          alt: 'Icono de perro usado como cover'
        },
      ],
      colorClasses: {
        primary: 'rose-500',
        primaryHover: 'rose-600',
        light: 'rose-100',
        text: 'rose-700',
        bg: 'rose-50',
      },
    },
    pawsupport: {
        title: 'PawSupport',
        subtitle: 'Plataforma solidaria para conectar personas con discapacidad y voluntarios',
        description:
          'Aplicación web desarrollada como Trabajo de Fin de Grado en Ingeniería Informática. PawSupport permite que personas con alguna discapacidad encuentren voluntarios dispuestos a ayudarles con el cuidado de sus animales de compañía. El proyecto busca fomentar la inclusión, la colaboración y el bienestar animal mediante una plataforma digital intuitiva y accesible.',
        technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Firebase', 'Docker'],
        state: 'Completado',
        type: 'Desarrollo Full-Stack',
        duration: '6 meses',
        features: [
          'Registro y login diferenciados para voluntarios y personas con discapacidad',
          'Gestión de perfiles con habilidades, disponibilidad y tipos de animales',
          'Sistema de mensajería interna y valoraciones mutuas',
          'Búsqueda y filtrado de usuarios/animales por ubicación, disponibilidad y habilidades',
          'Recomendaciones personalizadas en base a proximidad',
          'Subida de imágenes en perfiles y valoraciones',
          'Interfaz accesible, intuitiva y adaptada a diferentes discapacidades'
        ],
        challenges: [
          'Diseñar un sistema de bases de datos híbrido (relacional y no relacional) para manejar perfiles, imágenes y mensajes de forma eficiente',
          'Optimizar consultas y búsquedas avanzadas con Elasticsearch para asegurar rapidez en grandes volúmenes de datos',
          'Aprender y aplicar de manera autónoma nuevas tecnologías como Angular, Firebase y Docker en un entorno real'
        ],
        results: [
          'Entrega de un proyecto funcional y documentado dentro del plazo',
          'Plataforma que cumple con los objetivos de accesibilidad e inclusión',
          'Experiencia adquirida en desarrollo full-stack, despliegue con Docker y buenas prácticas con GitHub'
        ],
        icon: 'assets/images/projects/icon_dog.png',
        gallery: [
          {
            src: 'assets/images/projects/website_elastic.png',
            title: 'Vista principal',
            desc: 'Pantalla de inicio de PawSupport',
            alt: 'Página principal de la plataforma PawSupport'
          },
          {
            src: 'assets/images/projects/figma.png',
            title: 'Diseño',
            desc: 'Prototipo de interfaz accesible y moderna',
            alt: 'Diseño en Figma de la aplicación PawSupport'
          },
          {
            src: 'assets/images/projects/icon_dog.png',
            title: 'Logo / Cover',
            desc: 'Identidad visual del proyecto',
            alt: 'Icono representativo de PawSupport'
          }
        ],
        colorClasses: {
          primary: 'rose-500',
          primaryHover: 'rose-600',
          light: 'rose-100',
          text: 'rose-700',
          bg: 'rose-50',
        },
      },
  };

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId && this.projectsInfo[this.projectId]) {
      // Carga base
      this.projectData = { ...this.projectsInfo[this.projectId] };

      // Asegura una galería funcional aunque no esté definida aún
      this.ensureGalleryDefaults();
      // Resetea índice por si vienes de otro proyecto
      this.activeIndex = 0;
    } else {
      this.projectData = null;
    }
  }

   private ensureGalleryDefaults() {
    if (!this.projectData) return;

    let gallery = Array.isArray(this.projectData.gallery)
      ? [...this.projectData.gallery]
      : [];

    if (gallery.length === 0) {
      // fallback ultra defensivo: placeholder vacío para no romper bindings
      gallery = [
        {
          src: '',
          title: this.projectData.title || 'Imagen',
          desc: 'Imagen del proyecto',
          alt: this.projectData.title || 'Imagen del proyecto',
        },
      ];
    }

    // Puedes aplicar aquí una heurística para decidir “principal” (primera posición)
    // Por ahora, respetamos el orden dado.
    this.projectData.gallery = gallery;
  }

get activeImage(): GalleryItem | null {
    if (!this.projectData?.gallery?.length) return null;
    return this.projectData.gallery[this.activeIndex] || null;
  }

  setActive(i: number): void {
    if (!this.projectData?.gallery?.length) return;
    if (i < 0) i = 0;
    if (i >= this.projectData.gallery.length) i = this.projectData.gallery.length - 1;
    this.activeIndex = i;
  }

  nextImage(): void {
    if (!this.projectData?.gallery?.length) return;
    this.activeIndex = (this.activeIndex + 1) % this.projectData.gallery.length;
  }

  prevImage(): void {
    if (!this.projectData?.gallery?.length) return;
    this.activeIndex =
      (this.activeIndex - 1 + this.projectData.gallery.length) %
      this.projectData.gallery.length;
  }

  /** Soporte teclado dentro de la región de galería (HTML usa (keydown)="onGalleryKeydown($event)") */
  onGalleryKeydown(ev: KeyboardEvent): void {
    const key = ev.key.toLowerCase();
    if (key === 'arrowright') {
      this.nextImage();
      ev.preventDefault();
    } else if (key === 'arrowleft') {
      this.prevImage();
      ev.preventDefault();
    } else if (key === 'enter') {
      this.openImageModal(this.activeIndex);
    }
  }

  // ======= Navegación general / CTA / Relacionados =======

  goBack(): void {
    this.location.back();
  }

  contactProject(): void {
    // Aquí puedes abrir modal/contact form o navegar a /contact
    console.log('Contactar proyecto similar');
  }

  showProjectDetail(projectId: string): void {
    // Conservamos tu API
    console.log('Mostrar detalle del proyecto:', projectId);
    // Aquí podrías navegar si lo deseas, p. ej.:
    // this.router.navigate(['/projects', projectId]);
  }

  // ======= Tabs =======

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }


  // ======== Contactar Ahora ========

  showContactForm = false;

  toggleContactForm(): void {
    this.showContactForm = !this.showContactForm;
  }

  submitContactForm(form: any): void {
    if (form.valid) {
      console.log('Datos del formulario:', form.value);

      // Aquí iría la lógica para enviarte el correo
      // por ejemplo: llamar a un servicio backend o a EmailJS

      this.showContactForm = false; // cerrar tras enviar
    }
  }



  // Abre el modal en el índice indicado o en el activo
openImageModal(index?: number): void {
  const total = this.projectData?.gallery?.length || 0;
  if (!total) return;
  this.lightboxIndex = typeof index === 'number' ? index : this.activeIndex;
  this.isLightboxOpen = true;
}

// Cerrar modal
closeLightbox(): void {
  this.isLightboxOpen = false;
}

// Navegación dentro del modal
nextLightbox(): void {
  const total = this.projectData?.gallery?.length || 0;
  if (!total) return;
  this.lightboxIndex = (this.lightboxIndex + 1) % total;
}
prevLightbox(): void {
  const total = this.projectData?.gallery?.length || 0;
  if (!total) return;
  this.lightboxIndex = (this.lightboxIndex - 1 + total) % total;
}

// Teclado global cuando el modal está abierto
@HostListener('window:keydown', ['$event'])
handleWindowKeydown(ev: KeyboardEvent) {
  if (!this.isLightboxOpen) return;
  const k = ev.key.toLowerCase();
  if (k === 'escape') { this.closeLightbox(); }
  else if (k === 'arrowright') { this.nextLightbox(); }
  else if (k === 'arrowleft') { this.prevLightbox(); }
}
}
