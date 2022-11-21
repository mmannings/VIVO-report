import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Report } from 'src/app/reporting/models/report';



@Component({
  selector: 'report-subset-form',
  templateUrl: './subset-form.component.html',
  styleUrls: ['./subset-form.component.css'],
})

export class SubsetFormComponent implements OnInit {
  modelForm!: FormGroup;
  displayedColumns: string[] = ['name', 'description','action'];

  clicked: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
  ) {}
  
  ngOnInit() {
    
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.pattern('[A-Za-z \-\_]+')],
      description: ['',Validators.pattern('[A-Za-z \-\_]+')],
      constructQuery: ['',],
    },
    {updateOn: "blur"});
  }

  initializeReport(report: Report) {
    let graphModel: FormGroup = this.modelForm;

    report.name = graphModel.controls['name'].value;
    report.constructQuery = graphModel.controls['constructQuery'].value;
  }

  editModel(id: number) {

  }

  deleteModel() {
    this.clicked = false;
  }

  addModel() {
    this.clicked = true;
  }
}
