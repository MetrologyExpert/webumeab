import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UncertaintyBudgetComponent } from './uncertainty-budget/uncertainty-budget.component';
import { MeasurementUnitPipe } from './measurement-unit.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstrumentListComponent } from './instrument-list/instrument-list.component';
import { InstrumentTableComponent } from './instrument-table/instrument-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule
     ],
})
export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    UncertaintyBudgetComponent,
    InstrumentTableComponent,
    InstrumentListComponent,

    MeasurementUnitPipe
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MaterialModule,
    FlexLayoutModule,

  
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [MeasurementUnitPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
