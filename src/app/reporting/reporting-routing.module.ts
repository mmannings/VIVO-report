import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportFormComponent } from "./report-form/report-form.component";
import { SubsetFormComponent } from "./report-form/add-report/subset-form/subset-form.component";
import { LayoutComponent } from "./layout/layout.component";
import { ListGraphComponent } from "./list-graph/list-graph.component";
import { GraphComponent } from "./components";

const routes: Routes = [
    {
        path: '', component: ReportFormComponent,
        children: [
            { path: '', component: ListGraphComponent },
            { path: 'add', component: GraphComponent },
            { path: 'add/:id', component: GraphComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubsetsRoutingModule { }
