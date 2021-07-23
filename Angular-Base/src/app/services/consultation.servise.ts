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
    async postConsultation(id :string,data: IConsultation): Promise<{data:IConsultation}> {
      let params =  new HttpParams().set("_id",id).set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.post<{data:IConsultation}>(this.getUrl('/consultations/postConsultation'), data,{params}).toPromise();
    }
  
    async getConsultationById(id: string) : Promise<{data:IConsultation}> {
      let params = new HttpParams().set("_id",id).set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      console.log(params);
        
      return this.http.post<{data:IConsultation}>(this.getUrl(`/consultations/getConsultation`),
      {"_id": id, "token": localStorage.getItem("token") as string || sessionStorage.getItem("token") as string}).toPromise();
    }
}