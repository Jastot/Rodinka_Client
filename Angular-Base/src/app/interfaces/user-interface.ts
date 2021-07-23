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
    diagnoses?: [IDiagnose];
    operations?:[];
    consultations?:[IConsultation];
    analyzes?:[];
}