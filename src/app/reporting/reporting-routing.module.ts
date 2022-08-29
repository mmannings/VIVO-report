import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportFormComponent } from "./report-form/report-form.component";
import { SubsetFormComponent } from "./report-form/subset-form/subset-form.component";
import { AddEditFromComponent } from "./report-form/subset-form/subsets/add-edit-from-content";

const routes: Routes = [
    {
        path: '', component: ReportFormComponent,
        children: [
            { path: '', component: SubsetFormComponent },
            { path: 'add', component: AddEditFromComponent },
            { path: 'add/:id', component: AddEditFromComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubsetsRoutingModule { }