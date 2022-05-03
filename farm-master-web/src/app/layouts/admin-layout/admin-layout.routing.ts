import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from '../../login/login.component';
import { FarmComponent } from 'app/farm/farm.component';
import { PestComponent } from 'app/pest/Pest.component';
import { CropsComponent } from 'app/crops/crops.component';
import { BenificialsComponent } from 'app/benificials/benificials.component';
import { PlantationComponent } from 'app/plantation/plantation.component';
import { FarmLayoutComponent } from 'app/farm-layout/farm-layout.component';
import { ApplicationComponent } from 'app/application/application.component';
import { DeceaseComponent } from 'app/Decease/decease.component';
import { UserComponent } from 'app/user/user.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'farm',           component: FarmComponent },
    { path: 'pest',           component: PestComponent },
    { path: 'crops',          component: CropsComponent },
    { path: 'benificials',    component: BenificialsComponent },
    { path: 'plantation',     component: PlantationComponent },
    { path: 'farm-layout',    component: FarmLayoutComponent },
    { path: 'application',    component: ApplicationComponent },
    { path: 'decease',        component: DeceaseComponent },
    { path: 'users',          component: UserComponent },

    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'login',          component: LoginComponent },
];
