export interface IUser {
    _id?: string;
    email: string;
    password: string;
    name?: string;
    surname?: string;
    dateOfBirth?: string;
    token?: string;
    rmbMe?: boolean;
    role?: 'doctor' | 'patient' | 'admin';
}