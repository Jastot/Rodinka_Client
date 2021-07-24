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

    async postphoto(data: FormData): Promise<{data:FormData}> {
      return this.http.post<{data:FormData}>(this.getUrl('/photos/uploadPhoto'), data).toPromise();
    }
  }