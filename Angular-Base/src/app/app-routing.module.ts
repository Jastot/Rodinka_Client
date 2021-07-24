import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegistrationComponent } from './registration/registration.component';
import { DoctorsAccountComponent } from './doctors-account/doctors-account.component';
import { PatientCreationComponent } from './patient-creation/patient-creation.component';
import { PatientsCardComponent } from './patients-card/patients-card.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { ConsultationCreationComponent } from './consultation-creation/consultation-creation.component';
import { DiagnoseComponent } from './diagnose/diagnose.component';
import { DiagnoseCreationComponent } from './diagnose-creation/diagnose-creation.component';

const routes: Routes = [
  {path:"", component: AuthenticationComponent},
  {path:"registration", component: RegistrationComponent},
  {path:"doctor", component: DoctorsAccountComponent},
  {path:"doctor/creationOrInput/:id", component: PatientCreationComponent},
  {path:"doctor/workingWithPatient/:id", component: PatientsCardComponent},
  {path:"doctor/workingWithPatient/:id/lookingAtDiagnose/:diagnosisId", component: DiagnoseComponent},
  {path:"doctor/workingWithPatient/:id/creationDiagnose", component: DiagnoseCreationComponent},
  {path:"doctor/workingWithPatient/:id/lookingAtConsultation", component: ConsultationComponent},
  {path:"doctor/workingWithPatient/:id/creationConsultation", component: ConsultationCreationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
