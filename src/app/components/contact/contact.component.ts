import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contact = { name: '', email: '', message: '' };

  sendEmail() {
    console.log('Mensaje enviado:', this.contact);
    alert('¡Gracias! Tu mensaje ha sido enviado.');
    this.contact = { name: '', email: '', message: '' }; 
  }
}
