export interface User {
  id: string|null,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: string,
  imageUrl: string|null,
  createdAt: Date,
  updatedAt: Date|null,
}
