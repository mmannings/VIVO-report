import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, of, dematerialize, materialize, mergeMap, Observable, throwError } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { Graph } from "../models/graph";
import { graphArray } from "./arrays/graph-array";

const reportsKey = 'report-created';
const reportsJSON = localStorage.getItem(reportsKey);
const UUIDV4_REGEX = /\/reports\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
let reports: any[] = [{ 
    id: "de27074e-5e23-4884-84e2-338e4ef19e45",
    name: "Third party funds total",
    constructQuery: "qwe",
    selectQuery: "qwe"
}, {
    id: "de27074e-5e23-4884-84e2-338e4ef19e46",
    name: "Publications 5 years total",
    constructQuery: "test",
    selectQuery: "test"
}];


@Injectable()
export class StubBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/graph') && method === 'GET':
                    console.log("Inside get all endpoint (graph)")
                    return getGraph();
                case url.match(UUIDV4_REGEX) && method === 'GET':
                    console.log("Inside get report by ID endpoint (graph)")
                    return getGraphById();
                case url.endsWith('/graph') && method === 'POST':
                    console.log("Inside create report endpoint (graph)")
                    return createGraph();
                case url.match(UUIDV4_REGEX) && method === 'PUT':
                    console.log("Inside update endpoint (graph)")
                    return updateGraph();
                case url.match('/graph/' + UUIDV4_REGEX) && method === 'DELETE':
                    console.log("Inside delete report endpoint (graph)")
                    return deleteGraph();

                case url.endsWith('/reports') && method === 'GET':
                    console.log("Inside get all endpoint")
                    return getReports();
                case url.match(UUIDV4_REGEX) && method === 'GET':
                    console.log("Inside get report by ID endpoint ")
                    return getReportById();
                case url.endsWith('/reports') && method === 'POST':
                    console.log("Inside create report endpoint")
                    return createReport();
                case url.match(UUIDV4_REGEX) && method === 'DELETE':
                    console.log("Inside delete report endpoint")
                    return deleteReport();
                default:
                    return next.handle(request);
            }
        }

        function getGraph() {
            return ok(graphArray.map(elem => populate(elem)));
        }

        function getGraphById() {
            var urlSplit = url.split('/')
            var urlId = urlSplit[urlSplit.length - 1]
            const graph = graphArray.find(r => r.id === urlId)
            return ok(populate(graph));
        }

        function createGraph() {
            localStorage.clear();
            console.log("Local storage before adding new report: ", localStorage);
            const graph = body;
            
            if (graphArray.find(x => x.name === graph.name)) {
                console.log(`Report with such ${graph.name} is already present in local storage`);
            }

            graph.id = uuidv4();
            graphArray.push(graph);
            
            localStorage.setItem(reportsKey, JSON.stringify(graphArray));
            console.log("Inside of local storage: ", localStorage.getItem(reportsKey));
            return ok();
        }

        function updateGraph() {
            let params = body;
            let graph = graphArray.find(e => e.id === idFromUrl() )

            // Object.assign(graph, params);
            localStorage.setItem(reportsKey, JSON.stringify(graphArray));
            return ok();
        }

        function deleteGraph() {
            var urlSplit = url.split('/')
            var urlId = urlSplit[urlSplit.length - 1]
            reports = reports.filter(r => r.id !== urlId);
            localStorage.setItem(reportsKey, JSON.stringify(reports));
            return ok();
        }

        function getReports() {
            return ok(reports.map(r => populate(r)));
        }

        function getReportById() {
            var urlSplit = url.split('/')
            var urlId = urlSplit[urlSplit.length - 1]
            const report = reports.find(r => r.id === urlId)
            return ok(populate(report));
        }

        function createReport() {
            localStorage.clear();
            console.log("Local storage before adding new report: ", localStorage);
            const report = body;
            
            if (reports.find(x => x.name === report.name)) {
                console.log(`Report with such ${report.name} is already present in local storage`);
            }

            report.id = uuidv4();
            reports.push(report);
            
            localStorage.setItem(reportsKey, JSON.stringify(reports));
            console.log("Inside of local storage: ", localStorage.getItem(reportsKey));
            return ok();
        }

        function deleteReport() {
            var urlSplit = url.split('/')
            var urlId = urlSplit[urlSplit.length - 1]
            reports = reports.filter(r => r.id !== urlId);
            localStorage.setItem(reportsKey, JSON.stringify(reports));
            return ok();
        }
        
        function populate(component: any) {
                const { id, name, constructQuery } = component;
                console.log("Component: ", component);
                return { id, name, constructQuery };
        }

        function error(message: string) {
            return throwError(() => new Error(message))
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body}))
                .pipe(delay(500));
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return urlParts[urlParts.length - 1];
        }
    }
}

export const stubBackendInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: StubBackendInterceptor,
    multi: true
};