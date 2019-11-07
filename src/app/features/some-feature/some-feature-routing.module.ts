import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { SomeFeatureComponent } from './some-feature.component';
import { SomeFeatureDataResolver } from '../../resolvers/some-feature-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: SomeFeatureComponent,
    resolve: {
      data: SomeFeatureDataResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SomeFeatureDataResolver
  ]
})
export class SomeFeatureRoutingModule { }
