import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Data } from '../interfaces/data';
import { SomeFeatureService } from '../services/some-feauture.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SomeFeatureDataResolver implements Resolve<Data[]> {
  constructor(private readonly featureService: SomeFeatureService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Data[]> {
    return this.featureService.getData();
  }
}
