export interface IUser {
    _id?: string;
    email: string;
    password: string;
    name?: string;
    surname?: string;
    dataOfBirth?: string;
    token?: string;
    rmbMe?: boolean;
    userType?: 'doctor' | 'client' | 'admin';
}