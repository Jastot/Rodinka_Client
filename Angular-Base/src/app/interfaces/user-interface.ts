export interface IUser {
    _id?: string;
    email: string;
    password: string;
    name?: string;
    surname?: string;
    dataOfBirth?: string;
    token?: string;
    rmbMe?: boolean;
    role?: 'doctor' | 'patient' | 'admin';
}