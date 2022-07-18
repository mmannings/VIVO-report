import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Database } from '../../models/database';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'report-database-form',
  templateUrl: './database-form.component.html',
  styleUrls: ['./database-form.component.css']
})
export class DatabaseFormComponent implements OnInit {

  public displayedColumns = ['name', 'usageDetails'];
  data: Database[] = [{ 
    "name": "Test",
    "usageDetails": "First one"
  }, {
    "name": "Test2",
    "usageDetails": "Second one"
  }, 
]


  public dataSource = new MatTableDataSource<Database>(this.data);

  @ViewChild(MatTable) matTable!: MatTable<Database>;

  public databaseFormGroup!: FormGroup;

  constructor(private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(){

    localStorage.setItem('database-form-key', JSON.stringify(this.data));
    console.log(localStorage.getItem('database-form-key'));
    
    this.databaseFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      usageDetails: ['', Validators.required],
    },
    {updateOn: "blur"})
  }

  onSubmit() {
    console.log("On submit event triggered");
    this.http.post('http://localhost:4200/add', this.databaseFormGroup.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.data = JSON.parse(localStorage.getItem('database-form-key') || '{}');
          this.dataSource.data = this.data;
          console.log(this.data); 
          this.matTable.renderRows();
        }
      })
  }
}
