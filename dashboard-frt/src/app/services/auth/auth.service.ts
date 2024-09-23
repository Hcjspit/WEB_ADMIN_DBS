import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../../entities/user.entity';
import { ProdLineService } from '../prod-line/prod-line.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.httpUrls.loginApiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private prodLineService: ProdLineService
  ) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value!;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.loginUrl}`, { email, password }).pipe(
      map((user) => {
        console.log('Response from backend:', user);
        if (user && user.token) {
          // console.log('Login successful, storing user data in localStorage', user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.prodLineService.connect();
        } else {
          console.error('Login Failed, token not found', user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.prodLineService.disconnect();
  }

  getToken(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    return currentUser ? currentUser.token : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
