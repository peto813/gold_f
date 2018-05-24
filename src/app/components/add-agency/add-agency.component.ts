import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddAgencyModel }    from '../model-classes/add-agency-model';


@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {

  constructor() { }

  submitted = false;

  model = new AddAgencyModel('','','','','');

  onSubmit() {
  	this.submitted = true;
  	console.log(this.model);
  	alert('must make a post service')
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
