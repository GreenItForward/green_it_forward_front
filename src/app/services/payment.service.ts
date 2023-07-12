import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Payment } from "../models/payment.model";
import { lastValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PaymentService {
    private apiUrl = `${environment.apiUrl}/payments`;
    token: string | null = null;
    headers: HttpHeaders | null = null;
    options: {headers: HttpHeaders};

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        this.options = { headers: this.headers };
     }

    async getPaymentsIntentByUser() : Promise<Payment[]> {
        const payments = await lastValueFrom(this.http.get<any>(`${this.apiUrl}/user`, this.options));
        return payments ? payments : [];
    }

}