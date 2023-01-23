import { Injectable } from '@angular/core';
import { Report } from '../models/report';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StepperDataService {
    private dataChange = new Subject<any>();

    public setData(data: any) {
        this.dataChange.next(data);
    }

    public getData(): Observable<any> {
        return this.dataChange.asObservable();
    }
}