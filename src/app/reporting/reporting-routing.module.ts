import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportFormComponent } from "./report-form/report-form.component";
import { SubsetFormComponent } from "./report-form/add-report/subset-form/subset-form.component";

const routes: Routes = [
    {
        path: '', component: ReportFormComponent,
        children: [
            { path: '', component: ReportFormComponent },
            { path: 'add', component: SubsetFormComponent },
            { path: 'add/:id', component: SubsetFormComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubsetsRoutingModule { }