import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Report } from '../models/report';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

const baseUrl = `${environment.apiUrl}/reports`;

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Report[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Report>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    let body = {
      name: params.name,
      constructQuery: params.constructQuery,
      selectQuery: params.selectQuery
    };
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    };
    console.log('Body with vivoweb ontology: ' + JSON.stringify(body));
    return this.http.post(
      'http://localhost:8080/vitro/api/rpc/test_action',
      body,
      options
    );
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    console.log('Delete from report service\n');
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
