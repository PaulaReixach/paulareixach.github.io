import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';

interface GalleryItem {
  src: string;
  title?: string;
  desc?: string;
}

interface ProjectInfo {
  title: string;
  subtitle: string;
  image: string;
  image2: string;
  description: string;
  technologies: string[];
  state: string;
  type: string;
  duration: string;
  features: string[];
  challenges: string[];
  results: string[];
  icon?: string;
  gallery?: GalleryItem[]; // <= NUEVO: galería opcional
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
  imports: [CommonModule],
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
      image: 'assets/images/projects/icon_dog.png',
      image2: 'assets/images/projects/website_elastic.png',
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
      // Puedes rellenar imágenes reales aquí cuando las tengas:
      // gallery: [
      //   { src: 'assets/images/projects/elastic/hero.png', title: 'Vista principal', desc: 'Panel general' },
      //   { src: 'assets/images/projects/elastic/mobile.png', title: 'Vista móvil', desc: 'Responsive' },
      //   { src: 'assets/images/projects/elastic/analytics.png', title: 'Analytics', desc: 'Métricas y gráficos' },
      //   { src: 'assets/images/projects/elastic/profile.png', title: 'Perfil', desc: 'Cuenta de usuario' },
      //   { src: 'assets/images/projects/elastic/settings.png', title: 'Configuración', desc: 'Preferencias' },
      // ],
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

  /** Garantiza que siempre haya al menos una imagen en la galería y que la "principal" esté la primera */
  private ensureGalleryDefaults() {
    if (!this.projectData) return;

    const gallery = Array.isArray(this.projectData.gallery)
      ? [...this.projectData.gallery]
      : [];

    // Si no hay nada, construimos con image2 (principal) y/o image (secundaria)
    if (gallery.length === 0) {
      const fallback: GalleryItem[] = [];
      if (this.projectData.image2) {
        fallback.push({
          src: this.projectData.image2,
          title: 'Vista principal',
          desc: 'Resumen visual del proyecto',
        });
      }
      if (this.projectData.image && this.projectData.image !== this.projectData.image2) {
        fallback.push({
          src: this.projectData.image,
          title: 'Imagen secundaria',
          desc: 'Cover / logo',
        });
      }
      // Si por lo que sea no hay ninguna, no rompemos:
      if (fallback.length === 0) {
        fallback.push({
          src: this.projectData.image || this.projectData.image2 || '',
          title: this.projectData.title || 'Imagen',
          desc: 'Imagen del proyecto',
        });
      }
      this.projectData.gallery = fallback;
      return;
    }

    // Si hay galería pero no tiene una "principal" clara, garantizamos que la primera sea la más relevante.
    // Aquí podrías implementar tu propia heurística; por ahora respetamos el orden dado.
    this.projectData.gallery = gallery;
  }

  // ======= Navegación de galería =======

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
