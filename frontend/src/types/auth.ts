export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    is_verified: boolean;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface RegisterPayload {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }
  
  export interface TokenResponse {
    access_token: string;
    token_type: string;
  }