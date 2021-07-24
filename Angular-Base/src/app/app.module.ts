import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DoctorsAccountComponent } from './doctors-account/doctors-account.component';
import { PatientsCardComponent } from './patients-card/patients-card.component';
import { PatientCreationComponent } from './patient-creation/patient-creation.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interseptor/jwt.interceptor';
import { ConsultationCreationComponent } from './consultation-creation/consultation-creation.component';
import { DiagnoseCreationComponent } from './diagnose-creation/diagnose-creation.component';
import { DiagnoseComponent } from './diagnose/diagnose.component';
import { DisplayDatePipe } from './display-date.pipe';
import { OperationComponent } from './operation/operation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    AuthenticationComponent,
    DoctorsAccountComponent,
    PatientsCardComponent,
    PatientCreationComponent,
    ConsultationComponent,
    ConsultationCreationComponent,
    DiagnoseCreationComponent,
    DiagnoseComponent,
    DisplayDatePipe,
    OperationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
