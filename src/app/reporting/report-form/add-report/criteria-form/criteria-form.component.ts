import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'report-criteria-form',
  templateUrl: './criteria-form.component.html',
  styleUrls: ['./criteria-form.component.css']
})
export class CriteriaFormComponent implements OnInit {

  criteriaFormGroup!: FormGroup;
  
  constructor(private http: HttpClient,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criteriaFormGroup = this.formBuilder.group({
      criteria: [''],
    },
    {updateOn: "blur"})
  }
  
  selected = 'edu.cornell.library.scholars.webapp.controller.api.distribute.examples.HelloDistributor';

  onSubmit() {

  }
}
