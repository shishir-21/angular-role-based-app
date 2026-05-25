import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  // Add delay parameter for showcasing async processing
  private delayParam = '?delay=1500';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { ...credentials, delay: 1500 });
  }

  getRecords(userId: string, role: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/records${this.delayParam}&userId=${userId}&role=${role}`);
  }

  getUsers(role: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users${this.delayParam}&role=${role}`);
  }

  createUser(user: any, adminRole: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users${this.delayParam}&role=${adminRole}`, user);
  }

  updateUser(id: string, user: any, adminRole: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}${this.delayParam}&role=${adminRole}`, user);
  }

  deleteUser(id: string, adminRole: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}${this.delayParam}&role=${adminRole}`);
  }
}
