import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="widget-container">
      <h2>Test Widget</h2>
      <p>Status: {{ status }}</p>
      <p *ngIf="customerUID">Customer UID: {{ customerUID }}</p>
    </div>
  `,
  styles: [`
    .widget-container {
      font-family: Arial, sans-serif;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  `]
})
export class AppComponent implements OnInit {
  status = 'Initializing...';
  customerUID: string | null = null;

  ngOnInit() {
    window.addEventListener('message', this.handleMessage.bind(this));
    this.sendReadyMessage();
  }

  handleMessage(event: MessageEvent) {
    if (event.data.type === 'CUSTOMER_DATA') {
      this.customerUID = event.data.uid;
      this.status = 'Customer data received';
    }
  }

  sendReadyMessage() {
    window.parent.postMessage({ type: 'WIDGET_READY' }, '*');
    this.status = 'Ready';
  }
}