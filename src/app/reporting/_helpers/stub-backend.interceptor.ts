import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, of, dematerialize, materialize, mergeMap, Observable, throwError } from "rxjs";
import { v4 as uuidv4 } from "uuid";

const reportsKey = 'report-created';
const reportsJSON = localStorage.getItem(reportsKey);
const UUIDV4_REGEX = /\/reports\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
let reports: any[] = [{ }];


@Injectable()
export class StubBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
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


        function getReports() {
            return ok(reports.map(r => basicDetails(r)));
        }

        function getReportById() {
            var urlSplit = url.split('/')
            var urlId = urlSplit[urlSplit.length - 1]
            const report = reports.find(r => r.id === urlId)
            return ok(basicDetails(report));
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
        
        function basicDetails(report: any) {
            const { id, name, constructQuery, selectQuery, variable } = report;
            console.log("Report: ", report);
            return { id, name, constructQuery, selectQuery, variable };
        }

        function error(message: string) {
            return throwError(() => new Error(message))
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body}))
                .pipe(delay(500));
        }
    }
}

export const stubBackendInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: StubBackendInterceptor,
    multi: true
};