import { IConsultation } from './consultation-interface';
import { IDiagnose } from './diag.inter';
import { IOperation } from './oper.inter';
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
    operations?:[any];
    consultations?:[{id:string,date:number}];
    analyzes?:[];
}