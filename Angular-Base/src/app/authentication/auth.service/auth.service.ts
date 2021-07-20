import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl!: string;
  redirectParams!: Params;
  private baseUrl = 'https://moletrainer.xyz/api';

  user!: IUser | null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  logout() {
    this.clearToken();
  }

  get token(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Login user with login and password
   * @param user
   * @returns
   */
  async login(user: IUser): Promise<{data:IUser}> {
    
    console.log("auth/login");
    let result = await this.http.post<{data:IUser}>(`${this.baseUrl}/auth/login`, user).toPromise();
    console.log(result);
    this.setToken(result.data);
    this.linkToApp();
    return result;
  }

  /**
   * Navigate to main page or saved url in guard after login
   */
  private linkToApp() {
    setTimeout(() => {
      if (this.redirectUrl && this.redirectUrl !== '') {
        this.router.navigate([this.redirectUrl], {
          replaceUrl: false,
          queryParams: this.redirectParams,
        });
      } else {
        this.router.navigate(['/doctor']);
      }
    }, 10);
  }

  private setToken(user: IUser) {
    console.log(user.token);
    if (user && user.token) {
      if (user.rmbMe) {
        localStorage.setItem('token', user.token);
      } else {
        sessionStorage.setItem('token', user.token);
      }
      this.setUser();
    } else {
      this.clearToken();
    }
  }

  async setUser() 
  {
    let result = await this.http
      .get<{ data: IUser }>(`${this.baseUrl}/auth/me`)
      .toPromise();
      console.log(result);
  }

  private clearToken() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
