import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { IOperation } from '../interfaces/oper.inter';

@Injectable({
  providedIn: 'root'
})
export class operService {

    private baseUrl = 'https://moletrainer.xyz/api';

    constructor(public http: HttpClient) {

    }
    private getUrl(url: string = ''): string {
      return this.baseUrl + url;
    }
    async getOper() : Promise<{data:IOperation[]}>{
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.get<{data:IOperation[]}>(this.getUrl('/operations'), {params}).toPromise();
    }
  
    async postOper(data: IOperation): Promise<{data:IOperation}> {
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.post<{data:IOperation}>(this.getUrl('/operations/addOperation'), data).toPromise();
    }
  
    async getOperById(id: string) : Promise<{description:IOperation}> {
      let params = new HttpParams().set("_id",id).set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      console.log(params);
      let token = localStorage.getItem("token") as string || sessionStorage.getItem("token") as string;
      return this.http.post<{description:IOperation}>(this.getUrl(`/operations/getOperation`),{"_id":id, "token":token}).toPromise();
    }
 
    async putOperById(id: number, data: IOperation ): Promise<IOperation> {
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.put<IOperation>(this.getUrl(`/operations/updateOperation`),  data,{params}).toPromise();
    }
  
    async deleteOperById(id: any): Promise<IOperation> {
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.delete<IOperation>(this.getUrl(`/operations/removeOperation`), {params}).toPromise();
    }
  }