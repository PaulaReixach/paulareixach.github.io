import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { FadeInDirective } from '../../shared/fade-in.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, FadeInDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'] // <- corregido: styleUrls (en plural)
})
export class ContactComponent {
  contact = { name: '', email: '', message: '' };
  loading = false;
  sent = false;
  errorMsg = '';

  constructor(private contactSvc: ContactService) {}

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
      return 'El formato del correo no es válido (ejemplo: tu@correo.com).';
    }
    return '';
  }

}
