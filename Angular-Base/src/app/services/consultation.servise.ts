import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { IConsultation } from '../interfaces/consultation-interface';


@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

    private baseUrl = 'https://moletrainer.xyz/api';

    constructor(public http: HttpClient) {

    }
    private getUrl(url: string = ''): string {
      return this.baseUrl + url;
    }
    async addConsultation(data: IConsultation): Promise<{data:IConsultation}> {
      let token = {token: localStorage.getItem('token')||sessionStorage.getItem('token')};
      return this.http.post<{data:IConsultation}>(this.getUrl('/consultations/addConsultation'), Object.assign(data, token)).toPromise();
    }
    async updateConsultation(data: IConsultation): Promise<{data:IConsultation}> {
      let token = {token: localStorage.getItem('token')||sessionStorage.getItem('token')};
      return this.http.post<{data:IConsultation}>(this.getUrl('/consultations/addConsultation'), Object.assign(data, token)).toPromise();
    }
    async getConsultation(id: string) : Promise<{consultation:IConsultation}> {
      let token = localStorage.getItem('token')||sessionStorage.getItem('token');
      return this.http.post<{consultation: IConsultation}>(this.getUrl(`/consultations/getConsultation`),{"_id": id, "token": token}).toPromise();
    }

}