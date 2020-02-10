import { Routes } from '@angular/router';

import { TicketsComponent } from '../../tickets/tickets.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AppAuthGuard } from '../../app.authguard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tickets', component: TicketsComponent },
];
