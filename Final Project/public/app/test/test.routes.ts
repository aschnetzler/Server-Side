import { Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
export const TestRoutes: Routes = [{
    path: 'test',
    component: TestComponent,
    children: [
        { path: '', component: ListComponent },
        { path: 'create', component: CreateComponent },
        { path: ':testId', component: ViewComponent },
        { path: ':testId/edit', component: EditComponent }
    ],
}];