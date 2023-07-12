export interface Payment {
    id: number;
    userId: number;
    projectId: string;
    amount: number;
    currency: string;
    status: string;
    date: Date;
}