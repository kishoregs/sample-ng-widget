import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="widget-container">
      <h2>Sample Widget</h2>
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
    console.log('Widget initialized');
    window.addEventListener('message', this.handleMessage.bind(this));
    this.sendReadyMessage();
  }

  handleMessage(event: MessageEvent) {
    console.log('Widget received message:', event.data, 'from origin:', event.origin);
    if (event.data.type === 'CUSTOMER_DATA') {
      this.customerUID = event.data.uid;
      this.status = 'Customer data received';
      console.log('Updated customer UID:', this.customerUID);
    }
  }

  sendReadyMessage() {
    console.log('Sending WIDGET_READY message');
    window.parent.postMessage({ type: 'WIDGET_READY' }, '*');
    this.status = 'Ready';
  }
}