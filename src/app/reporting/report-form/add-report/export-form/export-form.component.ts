import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'report-export-form',
  templateUrl: './export-form.component.html',
  styleUrls: ['./export-form.component.css']
})
export class ExportFormComponent implements OnInit {
  modelForm: FormGroup;
  showQuery = {
    construct: false,
    select: false
  };
  constructColumns = ['name', 'description'];
  selectColumns = ['name', 'description'];
  templateColumns = ['name', 'description'];
  constructDataSource: any[];
  selectDataSource: any[];
  templateDataSource: any[];

  constructor(private formBuilder: FormBuilder) {
    this.modelForm = this.formBuilder.group({
      name: '',
      description: '',
      query: '',
      name2: '',
      description2: '',
      query2: '',
      name3: '',
      description3: '',
      query3: ''
    });

    // Initialize data sources with test values
    this.constructDataSource = [
      { name: 'Most distributed third-party organisations', description: 'Describes, which organisation made the most funds', query: 'yours written higher', expanded: false },
      { name: 'Example Construct 2', description: 'Description for Construct 2', query: 'Example query for Construct 2', expanded: false }
    ];

    this.selectDataSource = [
      {
        name: "CO2 Emissions by Sector",
        description: "Analyzes CO2 emissions by different sectors",
        query: "SELECT sector, SUM(emissions) AS total_emissions FROM emissions_table GROUP BY sector",
        expanded: false
      },
    ];

    this.templateDataSource = [
      { name: 'Example Template 1', description: 'Description for Template 1', query: 'Example query for Template 1', expanded: false }
    ];
  }

  toggleQuery(type: string, row: any) {
    if (type === 'construct') {
      row.expanded = !row.expanded;
      this.showQuery.construct = row.expanded;
    } else if (type === 'select') {
      row.expanded = !row.expanded;
      this.showQuery.select = row.expanded;
    }
  }

  ngOnInit(): void {
  }
}
