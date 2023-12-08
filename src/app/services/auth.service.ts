import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from "../../../config"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basePath: string;

  constructor(private http: HttpClient) {
    this.basePath = config.backendUrl;
  }

  public async resetPassword(email: string) {
    return this.http.post(`${this.basePath}/auth/resetPassword`, { email: email });
  }

  public login(email: string, password: string) {
    return this.http.post(`${this.basePath}/auth/login`, { email: email, password: password })
  }

  public async register(email: string, password: string) {
    let id = this.generateId();
    return this.http.post(`${this.basePath}/users`, { email: email, password: password, id: id });
  }

  private generateId(): string {
    const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
    const lengthOfCode: number = 40;
    let text = "";

    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
