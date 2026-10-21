import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messageService = inject(MessageService);

    success(mensaje: string, titulo = 'Éxito') {
        this.messageService.add({ severity: 'success', summary: titulo, detail: mensaje, life: 3000  });
    }

    error(mensaje: string, titulo = 'Error') {
        this.messageService.add({ severity: 'error', summary: titulo, detail: mensaje, life: 6000  });
    }

    warn(mensaje: string, titulo = 'Atención') {
        this.messageService.add({ severity: 'warn', summary: titulo, detail: mensaje });
    }

    info(mensaje: string, titulo = 'Info') {
        this.messageService.add({ severity: 'info', summary: titulo, detail: mensaje });
    }
}
