import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, of, dematerialize, materialize, mergeMap, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

const subsetsKey = 'angular-11-crud-example-users';
const subsetsJSON = localStorage.getItem(subsetsKey);
let subsets: any[] = subsetsJSON ? JSON.parse(subsetsJSON) : [{
    id: 1,
    name: 'Name for numbero eins',
    type: 'Type for nummero 1',
    action: 'Test'
}];


@Injectable()
export class StubBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize())

        function handleRoute() {
            switch (true) {
                case url.endsWith('/subsets') && method === 'GET':
                    console.log("Inside get all endpoint")
                    return getSubsets();
                case url.endsWith('/datadistributor') && method === 'POST':
                    console.log("Inside /add endpoint ")
                    return createSubsets();
                default:
                    return next.handle(request);
            }
        }


        function getSubsets() {
            return ok(subsets.map(s => basicDetails(s)));
        }

        function createSubsets() {
            const subset = body;
            
            if (subsets.find(x => x.id === subset.id)) {
                console.log(`User with such ${subset.id} is already present in local storage`);
            }

            subset.id = 2;
            subsets.push(subset);
            localStorage.setItem(subsetsKey, JSON.stringify(subsets));

            return ok();
        }

        function basicDetails(subset: any) {
            const { id, name, type, action } = subset;
            console.log("Subset: ", subset);
            return { id, name, type, action };
        }

        function error(message: string) {
            return throwError({ error: { message } })
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