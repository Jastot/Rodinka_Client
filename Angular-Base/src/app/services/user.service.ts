import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { IUser } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private baseUrl = 'https://moletrainer.xyz/api';

    constructor(public http: HttpClient) {

    }
    private getUrl(url: string = ''): string {
      return this.baseUrl + url;
    }
    async getUsers() : Promise<{data:IUser[]}>{
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.get<{data:IUser[]}>(this.getUrl('/users'), {params}).toPromise();
    }
  
    async postUser(data: IUser): Promise<{data:IUser}> {
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.post<{data:IUser}>(this.getUrl('/users/user'), data,{params}).toPromise();
    }
  
    async getUserById(id: string) : Promise<{data:IUser}> {
      let params = new HttpParams().set("_id",id).set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      console.log(params);
  
      return this.http.get<{data:IUser}>(this.getUrl(`/users/user`),{params}).toPromise();
    }

    async getUsesrByType(role: string) : Promise<IUser[]> {
      let params = new HttpParams().set('role',role).set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.get<IUser[]>(this.getUrl(`/users/user`),{params}).toPromise();
    }
 
    async putUserById(id: number, data: IUser ): Promise<IUser> {
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.put<IUser>(this.getUrl(`/users/user`),  data,{params}).toPromise();
    }
  
    async deleteUserById(id: any): Promise<IUser> {
      let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      return this.http.delete<IUser>(this.getUrl(`/users/user`), {params}).toPromise();
    }
  

}