import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
@Component({
  selector: 'app-empresa-info',
  templateUrl: './empresa-info.component.html',
  styleUrls: ['./empresa-info.component.css']
})
export class EmpresaInfoComponent implements OnInit {

  constructor(private userService: UserService) { }
  companyData;
  ngOnInit() {
  	this.companyData= this.userService.getCompanyData();
  }

}
