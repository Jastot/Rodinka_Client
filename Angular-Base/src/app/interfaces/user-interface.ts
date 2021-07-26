import { IConsultation } from './consultation-interface';
import { IDiagnose } from './diag.inter';
export interface IUser {
    _id?: string;
    email: string;
    password: string;
    name?: string;
    surname?: string;
    dateOfBirth?: string;
    token?: string;
    rmbMe?: boolean;
    userType?: 'doctor' | 'client' | 'admin';
    diagnoses?: [{id:string,date:number, diagnosisTLDR:string}];
    operations?:[];
    consultations?:[{id:string,date:number}];
    analyzes?:[];
}