import { Payment } from 'src/app/models/payment.model';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { ProjectService } from './project.service';
import * as moment from 'moment';
@Injectable({ providedIn: 'root' })
export class InvoiceService {
    private apiUrl = `${environment.apiUrl}/invoice`;
    token: string | null = null;
    headers: HttpHeaders | null = null;
    options: {headers: HttpHeaders};

    constructor(private http: HttpClient, private commonService: CommonService, 
        protected userService: UserService, protected projectService: ProjectService) {
        this.token = this.commonService.getLocalStorageItem('token');
        this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        this.options = { headers: this.headers };
    }

   public async generatePdf(payment: Payment) {
    const user = await this.userService.getMe()
    const project = await this.projectService.getProject(payment.projectId)
    

    this.http.post(`${environment.apiUrl}/invoice/generate-pdf/${user.firstName}-${user.lastName}/${payment.amount}`,
    { project: project }, 
    {
      ...this.options,
      params: {
        date: payment ? moment(payment.date).format('DD/MM/YYYY à HH:mm:ss') : moment().format('DD/MM/YYYY à HH:mm:ss'),
        last4: payment.last4 ? payment.last4 : '',
        brand: payment.brand ? payment.brand : '',
      },
      responseType: 'blob',
    }
  ).subscribe((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recu_don_${project?.id}_${moment(payment.date).format('YYYYMMDDHHmmss')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
   }




}