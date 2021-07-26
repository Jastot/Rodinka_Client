import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
  export class fileService {
    private baseUrl = 'https://moletrainer.xyz/api';

    constructor(public http: HttpClient) {

    }
    private getUrl(url: string = ''): string {
      return this.baseUrl + url;
    }

    async postphoto(data: FormData): Promise<{id:string, success:boolean, filename:string}> {
      return this.http.post<{id:string, success:boolean, filename:string}>(this.getUrl('/photos/uploadPhoto'), data).toPromise();
    }
    async getphoto(id:string): Promise<{data:string}> {
      let token = localStorage.getItem('token')||sessionStorage.getItem('token');
      let payload = {"_id":id, token}
      return this.http.post<{data:string}>(this.getUrl('/photos/getPhoto'), payload).toPromise();
    }
  }