import { Routes } from '@angular/router';
import { ConnectionsComponent } from './components/connections/connections.component';

export const routes: Routes = [
  { path: '', component: ConnectionsComponent, pathMatch: 'full' },
];
