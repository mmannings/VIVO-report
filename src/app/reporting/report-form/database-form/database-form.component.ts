import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'report-database-form',
  templateUrl: './database-form.component.html',
  styleUrls: ['./database-form.component.css']
})
export class DatabaseFormComponent implements OnInit {

  public databaseFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.databaseFormGroup = this.formBuilder.group({
      subset: ['', Validators.required],
      databaseName: ['', Validators.required],
    },
    {updateOn: "blur"})
  }

}
