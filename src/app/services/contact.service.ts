import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serviceId = 'service_vwx1iy2';
  private templateId = 'template_hfz3swy';
  private publicKey = 'SQmEVdAbM6ubUUnYW';

  async send(payload: { name: string; email: string; message: string }) {
    return emailjs.send(
      this.serviceId,
      this.templateId,
      {
        from_name: payload.name,
        from_email: payload.email,
        message: payload.message,
      },
      { publicKey: this.publicKey }
    );
  }
}
