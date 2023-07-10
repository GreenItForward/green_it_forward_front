export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    file: File | null;
  }

export interface LoginData {
    email: string;
    password: string;
}