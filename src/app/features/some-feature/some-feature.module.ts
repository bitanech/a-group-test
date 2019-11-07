import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';

import { SomeFeatureComponent } from './some-feature.component';
import { SomeFeatureRoutingModule } from './some-feature-routing.module';
import { FeatureFilterComponent } from './feature-filter/feature-filter.component';
import { SomeFeatureService } from '../../services/some-feauture.service';

@NgModule({
  declarations: [
    SomeFeatureComponent,
    FeatureFilterComponent
  ],
  imports: [
    CommonModule,
    SomeFeatureRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgxBootstrapSliderModule,
  ],
  providers: [SomeFeatureService]
})
export class SomeFeatureModule {
}
