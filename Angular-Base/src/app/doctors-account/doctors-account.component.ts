import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service/auth.service';

@Component({
  selector: 'app-doctors-account',
  templateUrl: './doctors-account.component.html',
  styleUrls: ['./doctors-account.component.css']
})
export class DoctorsAccountComponent implements OnInit {

  patients: IUser[] = [];

  constructor(private userService: UserService,
    private router: Router, private authService: AuthService) { }

  async ngOnInit() {
    let a =await this.userService.getUsers();
    console.log(a);
      this.patients =  a.data;
  }

  async exit()
  {
    this.authService.logout();
    this.router.navigate([`/`]);
  }

  async addNewPatient()
  {
    this.router.navigate([`/doctor/creationOrInput/-1`]);
  }

}
