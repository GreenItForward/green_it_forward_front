import { InvoiceService } from 'src/app/services/invoice.service';
import { Component, Input, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-payment-display',
  templateUrl: './payment-display.component.html',
  styleUrls: ['./payment-display.component.scss']
})
export class PaymentDisplayComponent implements OnInit {
  @Input() payment: Payment;
  noImage:boolean = true
  imageFile:File
  imageSrc: string;
  project : Project;

  constructor(private uploadService:UploadService, private projectService:ProjectService,
    protected invoiceService:InvoiceService) { }

  async ngOnInit() {
    this.project = await this.projectService.getProject(this.payment.projectId);
    this.loadImage();
  }

  async loadImage() {
    if (this.project.imageUrl !== '') {
      try {
        this.imageFile = await this.uploadService.getImage(this.project.imageUrl);
        this.imageSrc = URL.createObjectURL(this.imageFile);
        this.noImage = false
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    }
  }

  async downloadReceipt() {
    this.invoiceService.generatePdf(this.payment);
  }



}
