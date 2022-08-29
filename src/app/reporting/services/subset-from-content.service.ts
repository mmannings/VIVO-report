import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { SubsetFromContent } from "../models/subset-from-content";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { map } from 'rxjs';
import { FormBuilder, FormGroup } from "@angular/forms";

const baseUrl = `${environment.apiUrl}/subsets`;

@Injectable({ providedIn: 'root' })
export class SubsetFromContentService {
    form!: FormGroup;

    constructor(private http: HttpClient,
                private formBuilder: FormBuilder) { }

    getAll() {
        return this.http.get<SubsetFromContent[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<SubsetFromContent>(`${baseUrl}/${id}`);
    }

    create(actionName: any, uriBinding: any, literalBinding: any, query: any, submitted: any) {
        console.log("Params after cascading to form: ", actionName)
        let body = new URLSearchParams();
        body.set('http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#actionName', actionName);
        body.set('http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#uriBinding', uriBinding);
        body.set('http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#literalBinding', literalBinding);
        body.set('http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#query', query);
        body.set('submitted', submitted);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }
        return this.http.post('http://localhost:8080/vivo112/admin/datadistributor?addType=edu.cornell.library.scholars.webapp.controller.api.distribute.rdf.SelectFromContentDistributor', 
        body.toString(), options)
    }

    login() {
        const credentials = new HttpParams()
        .set('loginName', 'vivo_root@mydomain.edu')
        .set('loginPassword', 'q123123145')
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        })
        let options = { headers: headers}
        return this.http.post('http://localhost:8080/vivo112/login', credentials, options)
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}