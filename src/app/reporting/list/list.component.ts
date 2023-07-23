import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { Report } from '../models/report';
import { ReportService } from '../services/report.service';

let selets: any[] = [
  {
    id: 'de27074e-5e23-4884-84e2-338e4ef19e45',
    name: 'Funds total in 2019',
    constructQuery: 'qwe',
    selectQuery: 'qwe',
  },
  {
    id: 'de27074e-5e23-4884-84e2-338e4ef19e46',
    name: 'Publications in 2021',
    constructQuery: 'test',
    selectQuery: 'test',
  },
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'action'];
  report!: Report[];
  selects!: Report[];
  selectedRowIndex = -1;

  dataSource = new MatTableDataSource<Report>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.reportService.getAll().subscribe(response => {
      this.dataSource.data = response;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deleteReport(id: string) {
    const report = this.report.find((r) => r.id === id);
    if (!report) return;
    this.reportService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.report = this.report.filter((r) => r.id !== id)));
  }

  editReport(id: string) {
    console.log(id);
    fetch('http://localhost:8080/vitro//api/rest/1/report_generator', {
      method: 'GET',
    }).then(r => console.log(r));
  }

  downloadReport(id: string) {
    const report = this.report.find((r) => r.id === id);
    if (!report) return;
    this.reportService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.report = this.report.filter((r) => r.id !== id)));
  }

  highlight(row: any) {
    this.selectedRowIndex = row.id;
  }
}
