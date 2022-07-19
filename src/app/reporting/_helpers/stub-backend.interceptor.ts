import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, of, dematerialize, materialize, mergeMap, Observable, throwError } from "rxjs";
import { environment } from "src//environments/environment"

let tabs = JSON.parse(localStorage.getItem(environment.datasKey) || "[]");

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
                case url.endsWith('/add') && method === 'POST':
                    console.log("Inside /add endpoint");
                    return addData();
                default:
                    return next.handle(request);
            }
        }

        function addData() {
            const tab = body;
            
            if (tabs.find((x: { name: string; }) => x.name === tab.name)) {
                return error('Tab "' + tab.name + '" is already exists');
            }
            tabs.push(tab);
            localStorage.setItem(environment.datasKey, JSON.stringify(tabs));
            return ok();
        }

        function error(message: string) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function ok(body?: undefined) {
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