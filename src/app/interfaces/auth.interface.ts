export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    imageUrl: string | null;
  }

export interface LoginData {
    email: string;
    password: string;
}