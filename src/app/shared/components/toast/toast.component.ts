import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  imports: [ToastModule],
  template: `<p-toast position="top-center" [breakpoints]="{'768px': { width: '90%' }}" />`
})
export class ToastComponent {

}
