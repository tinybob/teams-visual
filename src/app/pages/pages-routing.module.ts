import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { GroupCardComponent } from './group-card/group-card.component';
import { TabsetComponent } from './tabset/tabset.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component'

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'team',
            component: GroupCardComponent
        },
        {
            path: 'team/:teamId',
            component: TabsetComponent
        },
        {
            path: 'guild',
            component: GroupCardComponent
        },
        {
            path: 'home',
            component: HomeComponent
        },
        {
            path: 'calendar',
            component: CalendarComponent
        },
    ]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {

}