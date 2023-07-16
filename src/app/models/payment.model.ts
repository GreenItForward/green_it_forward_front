export interface Payment {
    id: number;
    paymentIntent: string;
    userId: number;
    projectId: string;
    amount: number;
    currency: string;
    status: string;
    brand: string;
    last4: string;
    date: Date;
}