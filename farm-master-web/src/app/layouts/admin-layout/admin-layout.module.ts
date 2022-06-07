import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatRippleModule} from '@angular/material/core';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule} from '@angular/material/select';
import { LoginComponent } from 'app/login/login.component';
import { FarmComponent } from 'app/farm/farm.component';
import { PestComponent } from 'app/pest/Pest.component';
import { CropsComponent } from 'app/crops/crops.component';
import { BenificialsComponent } from 'app/benificials/benificials.component';
import { PlantationComponent } from 'app/plantation/plantation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FarmLayoutComponent } from 'app/farm-layout/farm-layout.component';
import { DatePipe } from '@angular/common';
import { ApplicationComponent } from 'app/application/application.component';
import { DeceaseComponent } from 'app/Decease/decease.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { UserComponent } from 'app/user/user.component';
import { StickeyCardComponent } from 'app/stickey-card/stickey-card.component';
import { PestIntensityComponent } from 'app/pest-intensity/pest-intensity.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSliderModule,
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    FarmComponent,
    PestComponent,
    CropsComponent,
    BenificialsComponent,
    PlantationComponent,
    FarmLayoutComponent,
    ApplicationComponent,
    DeceaseComponent,
    UserComponent,
    StickeyCardComponent,
    PestIntensityComponent
  ],
  providers: [
    DatePipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})

export class AdminLayoutModule {}
