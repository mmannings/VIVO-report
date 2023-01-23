import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Graph } from '../models/graph';

const baseUrl = `${environment.apiUrl}/graph`;

@Injectable({ providedIn: 'root' })
export class GraphService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Graph[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Graph>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(baseUrl, params);
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    console.log('Delete from report service\n');
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
