import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Report } from "../models/report";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

const baseUrl = `${environment.apiUrl}/reports`;

@Injectable({ providedIn: 'root' })
export class ReportService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Report[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Report>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params)
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        console.log("Delete from report service\n");
        return this.http.delete(`${baseUrl}/${id}`);
    }
}