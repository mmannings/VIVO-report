import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'action'];
  selectedRowIndex = -1;
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.graphService.getAll()
      .pipe(first())
      .subscribe(response => this.dataSource.data = response)
  }

  deleteGraph(id: string) {
    const report = this.dataSource.data.find((r) => r.id === id);
    if (!report) return;
    this.graphService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.dataSource.data = this.dataSource.data.filter((r) => r.id !== id)));
  }

  highlight(row: any) {
    this.selectedRowIndex = row.id;
  }
}
