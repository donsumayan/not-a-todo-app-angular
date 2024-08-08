import { Routes } from '@angular/router';
import { CreateSetupComponent } from './create-setup/create-setup.component';
import { SetupsListComponent } from './_components/setups-list/setups-list.component';

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
