export interface IConsultation {
    _id?: string;
    examination: string;
    complaints: string;
    plans: string;
    recommendations: string;
    diagnosis: string;
    date: number; 
    photoes: [{id:string}];
}