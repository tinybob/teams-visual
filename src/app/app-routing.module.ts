import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component'
const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(_ => _.PagesModule)
  },
  {
    path: 'tutorial',
    component: TutorialComponent
  },
  // {
  //   path: '',
  //   component: AppComponent
  // },
  // {
  //   path: '**',
  //   component: AppComponent
  // }
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
