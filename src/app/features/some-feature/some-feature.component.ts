import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Data } from '../../interfaces/data';
import { SomeFeatureService } from '../../services/some-feauture.service';
import { ActivatedRoute } from '@angular/router';
import { SomeFeatureFilter } from '../../interfaces/filter';
import { DataBase } from '../../interfaces/data-base';

@Component({
  selector: 'app-some-feature',
  templateUrl: './some-feature.component.html',
  styleUrls: ['./some-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SomeFeatureComponent {
  readonly data: BehaviorSubject<Data[]> = new BehaviorSubject([]);
  readonly filteredData: BehaviorSubject<Data[]> = new BehaviorSubject([]);

  categories: DataBase[];

  constructor(
    private readonly featureService: SomeFeatureService,
    private readonly activatedRoute: ActivatedRoute) {
    this.data.next(this.activatedRoute.snapshot.data.data);
    this.filteredData.next(this.activatedRoute.snapshot.data.data);

    this.featureService.getCategories()
      .subscribe((c) => {
        this.categories = c;
      });
  }

  filterChange(f: SomeFeatureFilter) {
    const filteredData = this.data.getValue()
      .filter((item: Data) => !!f.city ? item.city === f.city : true)
      .filter((item: Data) => {
        const selected = f.categories.filter(c => c.selected).map(c => c.id);

        return !!selected.length ? selected.includes(item.category) : true;
      })
      .filter((item: Data) => !!f.price ? item.price >= f.price[0] && item.price <= f.price[1] : true);

    this.filteredData.next(filteredData);
  }

  getCategoryName(id: number) {
    return this.categories.find(c => c.id === id).name;
  }
}
