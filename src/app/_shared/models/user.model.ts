interface AuthUser {
  username: string;
  email: string;
  roles: number[];
}

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  ingameName: string;
  profilePictureUrl?: string;
  roles: number[];
}

interface UserRole {
  id: number;
  name: string;
}

interface RegisterRequest {
  email?: string;
  idNumber?: string;
  firstName?: string;
  surname?: string;
  password?: string;
  phoneNumber?: string;
  confirmPassword?: string;
  homeLanguage?: string;
  age?: number;
  ethnicity?: string;
}

interface LoginResponse {
  token?: string;
}

export type { AuthUser, User, UserRole, LoginResponse, RegisterRequest };