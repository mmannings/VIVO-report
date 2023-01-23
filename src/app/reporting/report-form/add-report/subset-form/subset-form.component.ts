import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Report } from 'src/app/reporting/models/report';
import { StepperDataService } from 'src/app/reporting/services/stepper-data.service';



@Component({
  selector: 'report-subset-form',
  templateUrl: './subset-form.component.html',
  styleUrls: ['./subset-form.component.css'],
})
export class SubsetFormComponent implements OnInit {
  modelForm!: FormGroup;
  displayedColumns: string[] = ['name', 'description','action'];
  toggleOn!: boolean;
  dataSource = new MatTableDataSource<any>([]);
  selectedRowIndex = -1;
  edited!: boolean;

  @Output() public toggleControler = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private stepperDataService: StepperDataService,
  ) {}
  
  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.pattern('[A-Za-z \-\_]+')],
      constructQuery: ['',],
    })
  }

  initializeReport(report: Report) {
    let graphModel: FormGroup = this.modelForm;

    report.name = graphModel.controls['name'].value;
    report.constructQuery = graphModel.controls['constructQuery'].value;
  }


  highlight(row: any) {
    this.selectedRowIndex = row.id;
  }

  deleteGraph(name: string) {
    console.log('id number: ', name);
    this.dataSource.data = this.dataSource.data.filter((r) => r.name !== name);
  }

  editGraph(name: string) {
    this.toggleInstructions(this.toggleOn);
    var object = this.dataSource.data.filter((r) => r.name === name);
    this.dataSource.data.splice(this.dataSource.data.indexOf(object[0]), 1)
    console.log('filtered data source: ', object[0]);
    this.modelForm.reset();
    this.modelForm.setValue(object[0]);
    this.edited = true;
  }

  onSubmit() {
    console.log('subset-form form value: ', this.modelForm.value);
    console.log('graph-model name value:', this.modelForm.controls['name'].value);
    if (!this.modelForm.valid)
      return;

    if (!this.dataSource.data.find((row) => row.name === this.modelForm.controls['name'].value)) {
      this.dataSource.data.push(this.modelForm.value);
      this.stepperDataService.setData(this.dataSource.data);
      this.toggleInstructions(this.toggleOn);
    } else {
      alert("Name should be unique (already exists in table)");
    }

    // this.stepperDataService.setData(this.modelForm.value);
  }

  checkDatasource() {
    console.log("From datasource ", this.dataSource.data);
    const data: any = this.dataSource.data;
    this.stepperDataService.setData(data);
  }

  toggleInstructions(event: any) {
    this.toggleOn = !this.toggleOn;
    this.toggleControler.emit(!this.toggleOn);
  }

  getErrorMessage() {
    return this.modelForm.controls['name'].hasError('required') ? 'Name is required' :
        '';
  }
}
