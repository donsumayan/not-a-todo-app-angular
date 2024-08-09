import { Routes } from '@angular/router';
import { CreateSetupComponent } from './_pages/create-setup/create-setup.component';
import { SetupsListComponent } from './_pages/setups-list/setups-list.component';

export const routes: Routes = [
  {
    path: '',
    component: SetupsListComponent,
  },
  {
    path: 'create-setup',
    component: CreateSetupComponent,
  },
];
