import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Report } from '../models/report';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  reports!: Report[]
  selectedRowIndex = -1;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getAll()
        .pipe(first())
        .subscribe(reports => this.reports = reports)
  }

  deleteReport(id: string) {
    const report = this.reports.find(r => r.id === id);
    if (!report) return;
    this.reportService.delete(id)
        .pipe(first())
        .subscribe(() => this.reports = this.reports.filter(r => r.id !== id));
  }

  editReport(id: string) {
    const report = this.reports.find(r => r.id === id);
    if (!report) return;
    this.reportService.delete(id)
        .pipe(first())
        .subscribe(() => this.reports = this.reports.filter(r => r.id !== id));
  }

  downloadReport(id: string) {
    const report = this.reports.find(r => r.id === id);
    if (!report) return;
    this.reportService.delete(id)
        .pipe(first())
        .subscribe(() => this.reports = this.reports.filter(r => r.id !== id));
  }

  highlight(row: any) {
    this.selectedRowIndex = row.id;
  }
}
