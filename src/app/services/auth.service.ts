import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basePath: string;

  constructor(private http: HttpClient) { 
    this.basePath = 'http://localhost:9090';
  }

  public login(email: string, password: string) {
    return this.http.post(`${this.basePath}/auth/login`, { email, password })
  }

  public async register(email: string, password: string) {
    return this.http.post('http://localhost:3000/users', { email, password });
  }
}
