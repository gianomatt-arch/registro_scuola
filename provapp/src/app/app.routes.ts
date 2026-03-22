import { Routes } from '@angular/router';

import { AccessoNegatoComponent } from './features/accesso-negato/accesso-negato.component';
import { DocenteComponent } from './features/docente/docente.component';
import { StudenteComponent } from './features/studente/studente.component';
import { docenteGuard } from './core/guards/docente.guard';
import { studenteGuard } from './core/guards/studente.guard';
import { roleRedirectGuard } from './core/guards/role-redirect.guard';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [roleRedirectGuard],
    children: [],
  },
  {
    path: 'docente',
    component: DocenteComponent,
    canActivate: [docenteGuard],
  },
  {
    path: 'studente',
    component: StudenteComponent,
    canActivate: [studenteGuard],
  },
  {
    path: 'accesso-negato',
    component: AccessoNegatoComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
