import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { IDiagnose } from '../interfaces/diag.inter';

@Injectable({
  providedIn: 'root'
})
export class diagService {

    private baseUrl = 'https://moletrainer.xyz/api';

    constructor(public http: HttpClient) {

    }
    private getUrl(url: string = ''): string {
      return this.baseUrl + url;
    }
    async getDiag() : Promise<{data:IDiagnose[]}>{
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.get<{data:IDiagnose[]}>(this.getUrl('/diagnoses'), {params}).toPromise();
    }
  
    async postDiag(data: IDiagnose): Promise<{data:IDiagnose}> {
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.post<{data:IDiagnose}>(this.getUrl('/diagnoses/addDiagnosis'), data).toPromise();
    }
  
    async getDiagById(id: string) : Promise<{diagnosis:IDiagnose}> {
      let params = new HttpParams().set("_id",id).set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      console.log(params);
      let token = localStorage.getItem("token") as string || sessionStorage.getItem("token") as string;
      return this.http.post<{diagnosis:IDiagnose}>(this.getUrl(`/diagnoses/getDiagnosis`),{"_id":id, "token":token}).toPromise();
    }
 
    async putDiagById(id: number, data: IDiagnose ): Promise<IDiagnose> {
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.put<IDiagnose>(this.getUrl(`/diagnoses/updateDiagnosis`),  data,{params}).toPromise();
    }
  
    async deleteDiagById(id: any): Promise<IDiagnose> {
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.delete<IDiagnose>(this.getUrl(`/diagnoses/removeDiagnosis`), {params}).toPromise();
    }
  }