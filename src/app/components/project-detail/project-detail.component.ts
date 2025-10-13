import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

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
  related: string[];
  technologies: string[];
  state: string;
  year: number;
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

  contact = { name: '', email: '', message: '' };
  loading = false;
  sent = false;
  errorMsg = '';

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
      description: `
      ElasticAdoptions es un sistema web diseñado para facilitar la adopción de animales mediante un motor de búsqueda avanzado impulsado por Elasticsearch.
      <br> <br> El proyecto tiene como objetivo ofrecer una experiencia rápida, intuitiva y eficiente a los usuarios que deseen encontrar su mascota ideal, permitiendo filtrar y buscar por múltiples criterios como animal, pelaje, color, raza, si tiene alguna enfermedad, tamaño y edad, además de contar con búsqueda de texto completo. 
      <br> <br> El sistema ha sido desarrollado en equipo utilizando Angular para el frontend y Node.js para el backend, con la comunicación entre ambos gestionada mediante API REST.
      <br> La infraestructura del proyecto se gestiona con Docker y control de versiones en GitHub, garantizando un entorno colaborativo y organizado.`,
      related: ['pawsupport', 'portfolio'],
      technologies: ['Angular', 'Node.js', 'Elasticsearch', 'Docker', 'Figma'],
      state: 'Completado',
      year: 2023,
      type: 'Desarrollo Full-Stack',
      duration: '3-6 meses',
      features: [
        'Búsqueda y filtrado avanzado por edad, raza, tamaño, pelaje y otros atributos',
        'Búsqueda de texto completo (elasticsearch) para localizar animales con descripciones específicas',
        'Indexación optimizada para grandes volúmenes de datos con Elasticsearch',
        'Paginación y ordenación de resultados con criterios personalizables',
        'Interfaz responsiva con Angular',
        'Despliegue contenido con Docker',
        'Arquitectura backend con Node.js y APIs REST para sincronización de índices',
      ],
      challenges: [
        'Confusión de puertos, se detectaron inconsistencias al conectar con Elasticsearch. Se solucionó ajustando la configuración del backend.',
        'Optimizar las consultas para manejar grandes volúmenes de datos y mantener tiempos de respuesta rápidos.',
        'Complejidad técnica de Elasticsearch, su gran flexibilidad implica una curva de aprendizaje elevada, especialmente en la gestión de índices y fragmentación.',
        'Problemas de CORS, inicialmente, la conexión entre los puertos del frontend (4200) y backend (3000) generaba errores de acceso. Se resolvió configurando correctamente las cabeceras y orígenes permitidos.'
      ],
      results: [
        `Proyecto entregado dentro de plazo con una prueba de concepto funcional: búsqueda y filtrado en tiempos aceptables.`,
        'Se consiguió establecer una conexión funcional y estable entre el frontend y el backend.',
        'Se implementó correctamente la comunicación con Elasticsearch, obteniendo resultados dinámicos y filtrados.',
        'Se cumplieron los objetivos de desarrollo y colaboración en equipo dentro del tiempo previsto.'],
      icon: 'assets/images/projects/icon_dog.png',
      gallery: [
        {
          src: 'assets/images/projects/website_elastic.png',
          title: 'Vista principal',
          desc: 'Resumen visual del proyecto',
          alt: 'Página principal de ElasticAdoptions'
        },
        {
          src: 'assets/images/projects/filtrado.png',
          title: 'Filtrado',
          desc: 'Interfaz de filtrado',
          alt: 'Captura de pantalla de la interfaz del filtrado avanzado'
        },
        {
          src: 'assets/images/projects/busqueda.png',
          title: 'Búsqueda',
          desc: 'Interfaz de búsqueda',
          alt: 'Captura de pantalla de la interfaz de búsqueda avanzada'
        },
        {
          src: 'assets/images/projects/figma.png',
          title: 'Diseño',
          desc: 'Interfaz de búsqueda y filtrado diseñada en Figma',
          alt: 'Captura de pantalla de la interfaz de búsqueda avanzada diseñada en Figma'
        },
        {
          src: 'assets/images/projects/icon_dog.png',
          title: 'Logo / Cover',
          desc: 'Identidad visual del proyecto ElasticAdoptions',
          alt: 'Icono de perro usado como cover del proyecto ElasticAdoptions'
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
        `PawSupport es una aplicación web desarrollada como Proyecto Final de Grado en Ingeniería Informática, 
          cuyo objetivo es conectar a personas con discapacidades con voluntarios dispuestos a ayudar en el cuidado de sus animales de compañía.
          <br><br> La iniciativa busca mejorar la calidad de vida tanto de las personas con limitaciones motrices o cognitivas como de sus mascotas, fomentando la solidaridad, la inclusión y el bienestar animal.
          <br> El proyecto se desarrolló íntegramente de forma autónoma, aplicando metodologías de gestión ágiles y herramientas modernas para garantizar una experiencia funcional,
          segura y accesible para todos los usuarios.`,
      related: ['elasticadoptions', 'portfolio'],
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Firebase', 'Docker'],
      state: 'Completado',
      year: 2024,
      type: 'Desarrollo Full-Stack',
      duration: '6 meses',
      features: [
        'Registro y login diferenciados para voluntarios y personas con discapacidad',
        'Gestión de perfiles con habilidades, disponibilidad y tipos de animales',
        'Sistema de mensajería interna y valoraciones mutuas',
        'Búsqueda y filtrado de usuarios/animales por ubicación, disponibilidad y habilidades',
        'Recomendaciones personalizadas en base a proximidad',
        'Subida de imágenes en perfiles y valoraciones',
        'Alta seguridad de datos, con contraseñas cifradas (hash) y uso de múltiples bases de datos.',
        'Interfaz accesible, intuitiva y adaptada a diferentes discapacidades'
      ],
      challenges: [
        'Diseñar un sistema de bases de datos híbrido (relacional y no relacional) para manejar perfiles, imágenes y mensajes de forma eficiente',
        'Optimizar consultas y búsquedas avanzadas con Elasticsearch para asegurar rapidez en grandes volúmenes de datos',
        'La complejidad técnica, y la integración de múltiples tecnologías (Angular, Node.js, Docker, Firebase, ElasticSearch) requirió un aprendizaje autodidacta y constante.',
        'La gestión autónoma del proyecto, la planificación, ejecución y resolución de problemas recayó totalmente en mí, fomentando la independencia y la toma de decisiones.'
      ],
      results: [
        'Entrega de un proyecto funcional y documentado dentro del plazo',
        'Plataforma que cumple con los objetivos de accesibilidad e inclusión',
        'Se logró una integración completa entre frontend (Angular) y backend (Node.js), con almacenamiento en PostgreSQL, Firebase y ElasticSearch para búsquedas avanzadas.',
        'El proyecto permitió consolidar conocimientos en tecnologías web, bases de datos, seguridad y gestión de proyectos ágiles.'
      ],
      icon: 'assets/images/projects/pawsupport/logo.PNG',
      gallery: [
        {
          src: 'assets/images/projects/pawsupport/main.PNG',
          title: 'Página principal',
          desc: 'Pantalla de inicio de PawSupport',
          alt: 'Página principal de la plataforma PawSupport'
        },
        {
          src: 'assets/images/projects/pawsupport/main2.PNG',
          title: 'Página principal 2',
          desc: 'Pantalla de inicio de PawSupport 2',
          alt: 'Página principal de la plataforma PawSupport 2'
        },
        {
          src: 'assets/images/projects/pawsupport/main3.PNG',
          title: 'Página principal 3',
          desc: 'Pantalla de inicio de PawSupport 3',
          alt: 'Página principal de la plataforma PawSupport 3'
        },
        {
          src: 'assets/images/projects/pawsupport/main4.PNG',
          title: 'Página principal 4',
          desc: 'Pantalla de inicio de PawSupport 4',
          alt: 'Página principal de la plataforma PawSupport 4'
        },
        {
          src: 'assets/images/projects/pawsupport/login.PNG',
          title: 'Página Login',
          desc: 'Pantalla de inicio de sesión PawSupport',
          alt: 'Página de inicio de sesión de la plataforma PawSupport'
        },
        {
          src: 'assets/images/projects/pawsupport/register1.PNG',
          title: 'Registro de usuario ',
          desc: 'Pantalla de registro PawSupport',
          alt: 'Página de registro de la plataforma PawSupport'
        },
        {
          src: 'assets/images/projects/pawsupport/register2.PNG',
          title: 'Registro de usuario 2',
          desc: 'Pantalla de registro PawSupport 2',
          alt: 'Página de registro de la plataforma PawSupport 2'
        },
        {
          src: 'assets/images/projects/pawsupport/register3.PNG',
          title: 'Registro de usuario 3',
          desc: 'Pantalla de registro PawSupport 3',
          alt: 'Página de registro de la plataforma PawSupport 3'
        },
        {
          src: 'assets/images/projects/pawsupport/register5.PNG',
          title: 'Registro de usuario 4',
          desc: 'Pantalla de registro PawSupport 4',
          alt: 'Página de registro de la plataforma PawSupport 4'
        },
        {
          src: 'assets/images/projects/pawsupport/user.PNG',
          title: 'Perfil del usuario',
          desc: 'Pantalla de Usuario PawSupport',
          alt: 'Página de Usuario de la plataforma PawSupport'
        },
        {
          src: 'assets/images/projects/pawsupport/valoration.PNG',
          title: 'Valoración del usuario',
          desc: 'Pantalla de Valoración del Usuario PawSupport',
          alt: 'Página de Valoración del Usuario de la plataforma PawSupport'
        },
        {
          src: 'assets/images/projects/pawsupport/chat.PNG',
          title: 'Chat del usuario',
          desc: 'Pantalla conversación entre usuarios',
          alt: 'Página de Chat de la plataforma PawSupport'
        },
        {
          src: 'assets/images/projects/pawsupport/favoritos.PNG',
          title: 'Favoritos del usuario',
          desc: 'Pantalla de Favoritos del Usuario PawSupport',
          alt: 'Página de Favoritos del Usuario de la plataforma PawSupport'
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

    portfolio: {
      title: 'Portfolio Profesional',
      subtitle: 'Sitio personal en Angular con diseño moderno y modular',
      description:
        `Portfolio web desarrollado con Angular y TailwindCSS para mostrar mi trayectoria, habilidades y proyectos. 
      <br>Incluye secciones de presentación personal, habilidades técnicas y metodológicas, proyectos destacados y un formulario de contacto interactivo.`,
      related: ['pawsupport', 'elasticadoptions'],
      technologies: ['Angular', 'TailwindCSS', 'TypeScript', 'HTML5', 'SCSS'],
      state: 'Completado',
      year: 2025,
      type: 'Desarrollo Front-End',
      duration: '1-2 meses',
      features: [
        '<strong>Sobre mí</strong>: Presentación personal animada con foto y biografía.',
        '<strong>Proyectos</strong>: Tarjetas dinámicas con imágenes y acceso al detalle de cada uno.',
        '<strong>Habilidades</strong>: Dividida por categorías, ordenadas y con transiciones suaves.',
        '<strong>Contacto</strong>: Interactivo, validación de campos y retroalimentación visual al enviar.',
      ],
      challenges: [
        'Crear una experiencia fluida entre secciones manteniendo la consistencia visual y las animaciones suaves.',
        'Optimizar la arquitectura de componentes para permitir escalabilidad sin perder simplicidad.',
        'Equilibrar la estética con el rendimiento, manteniendo tiempos de carga bajos y animaciones estables.',
      ],
      results: [
        'Portfolio funcional, visualmente atractivo y coherente con mi identidad profesional.',
        'Navegación intuitiva y fluida, combinando Angular y TailwindCSS para un resultado moderno y eficiente.',
        'Diseño accesible, responsive y optimizado.',
      ],
      icon: 'assets/images/projects/portfolio/logo.PNG',
      gallery: [
        {
          src: 'assets/images/projects/portfolio/hero.PNG',
          title: 'Inicio del Portfolio',
          desc: 'Presentación personal con animación y mensaje de bienvenida.',
          alt: 'Vista principal del portfolio',
        },
        {
          src: 'assets/images/projects/portfolio/about.png',
          title: 'Sección Sobre Mí',
          desc: 'Perfil profesional con foto, y biografía',
          alt: 'Sección sobre mí del portfolio',
        },
        {
          src: 'assets/images/projects/portfolio/proyectos.PNG',
          title: 'Sección de Proyectos',
          desc: 'Tarjetas de proyectos con imágenes, descripciones y enlaces a detalles.',
          alt: 'Sección de proyectos del portfolio',
        },
        {
          src: 'assets/images/projects/portfolio/skills.PNG',
          title: 'Habilidades',
          desc: 'Listado de habilidades técnicas y metodológicas.',
          alt: 'Sección de habilidades del portfolio',
        },
        {
          src: 'assets/images/projects/portfolio/contact.PNG',
          title: 'Contacto',
          desc: 'Formulario de contacto interactivo con validación.',
          alt: 'Sección de contacto del portfolio',
        },
      ],
      colorClasses: {
        primary: 'orange-500',
        primaryHover: 'amber-600',
        light: 'orange-100',
        text: 'orange-700',
        bg: 'orange-50',
      },
    },

  };

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private contactSvc: ContactService) { }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      if (this.projectId && this.projectsInfo[this.projectId]) {
        this.projectData = { ...this.projectsInfo[this.projectId] };
        this.ensureGalleryDefaults();
        this.activeIndex = 0;
      } else {
        this.projectData = null;
      }
    });
  }

  private ensureGalleryDefaults() {
    if (!this.projectData) return;

    let gallery = Array.isArray(this.projectData.gallery)
      ? [...this.projectData.gallery]
      : [];

    if (gallery.length === 0) {
      gallery = [
        {
          src: '',
          title: this.projectData.title || 'Imagen',
          desc: 'Imagen del proyecto',
          alt: this.projectData.title || 'Imagen del proyecto',
        },
      ];
    }
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
    this.router.navigate(['/projects']);
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

  async sendEmail(form: NgForm) {
    if (form.invalid || this.loading) return;
    this.loading = true;
    this.errorMsg = '';
    this.sent = false;

    try {
      await this.contactSvc.send(this.contact);
      this.sent = true;
      form.resetForm();
      setTimeout(() => this.sent = false, 4000);
    } catch (err) {
      this.errorMsg = 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.';
    } finally {
      this.loading = false;
    }
  }
  emailError(control: any): string {
    if (control.errors?.['required']) {
      return 'Por favor, introduce tu correo electrónico.';
    }
    if (control.errors?.['email']) {
      return 'El formato del correo no es válido (ejemplo: nombre@dominio.com).';
    }
    return '';
  }


  openImageModal(index?: number): void {
    const total = this.projectData?.gallery?.length || 0;
    if (!total) return;
    this.lightboxIndex = typeof index === 'number' ? index : this.activeIndex;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
  }

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

  @HostListener('window:keydown', ['$event'])
  handleWindowKeydown(ev: KeyboardEvent) {
    if (!this.isLightboxOpen) return;
    const k = ev.key.toLowerCase();
    if (k === 'escape') { this.closeLightbox(); }
    else if (k === 'arrowright') { this.nextLightbox(); }
    else if (k === 'arrowleft') { this.prevLightbox(); }
  }

  openProject(projectId: string): void {
    this.router.navigate(['/projects', projectId]);
    console.log('Navigating to project:', projectId);
  }

  get relatedProjects(): { id: string; info: ProjectInfo }[] {
    if (!this.projectData?.related) return [];
    return this.projectData.related
      .map(id => ({ id, info: this.projectsInfo[id] }))
      .filter(r => !!r.info);
  }
}
