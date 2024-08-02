import { Component, OnInit } from '@angular/core';

interface CustomerData {
  id: string;
  name: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="widget-container">
      <h2>Customer Widget</h2>
      <p>Status: {{ status }}</p>
      <div *ngIf="customerData">
        <h3>Customer Details</h3>
        <p>ID: {{ customerData.id }}</p>
        <p>Name: {{ customerData.name }}</p>
        <p>Email: {{ customerData.email }}</p>
        <p>Status: {{ customerData.status }}</p>
      </div>
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
  customerData: CustomerData | null = null;

  ngOnInit() {
    console.log('Widget initialized');
    window.addEventListener('message', this.handleMessage.bind(this));
    this.sendReadyMessage();
  }

  handleMessage(event: MessageEvent) {
    console.log('Widget received message:', event.data, 'from origin:', event.origin);
    if (event.data.type === 'CUSTOMER_DATA') {
      this.customerData = event.data.data;
      this.status = 'Customer data received';
      console.log('Updated customer data:', this.customerData);
    }
  }

  sendReadyMessage() {
    console.log('Sending WIDGET_READY message');
    window.parent.postMessage({ type: 'WIDGET_READY' }, '*');
    this.status = 'Ready';
  }
}