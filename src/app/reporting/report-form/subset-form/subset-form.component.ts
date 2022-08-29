import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { SubsetFromContent } from '../../models/subset-from-content';
import { SubsetFromContentService } from '../../services/subset-from-content.service';

@Component({
  selector: 'report-subset-form',
  templateUrl: './subset-form.component.html',
  styleUrls: ['./subset-form.component.css']
})
export class SubsetFormComponent implements OnInit {
  subsets!: SubsetFromContent[];
  displayedColumns = ['name', 'type', 'action'];
  data = [{ 
    "id": "0",
    "name": "Test",
    "type": "First one",
    "action": "First one",
  },
]

  dataSource = new MatTableDataSource<SubsetFromContent>(this.data);
  @ViewChild(MatTable) matTable!: MatTable<SubsetFormComponent>;

  constructor(private subsetService: SubsetFromContentService) { }

  ngOnInit(){
    localStorage.setItem('angular-11-crud-example-users', JSON.stringify(this.data));
    this.dataSource.data = JSON.parse(localStorage.getItem('angular-11-crud-example-users') || '{}');
    console.log(this.dataSource.data);
    this.subsetService.getAll()
      .pipe(first())
      .subscribe(subsets => this.subsets = subsets)
    console.log("Subsets of subscriber ", this.subsets);
    this.dataSource.data = this.subsets;
  }

  onClick() {
    window.location.href = "http://localhost:8080/vivo112/angular/subsets/add";
  }
}
