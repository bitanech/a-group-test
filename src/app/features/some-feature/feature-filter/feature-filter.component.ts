import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { SomeFeatureService } from '../../../services/some-feauture.service';
import { DataBase } from '../../../interfaces/data-base';
import { Data } from '../../../interfaces/data';
import { SomeFeatureFilter } from '../../../interfaces/filter';

@Component({
  selector: 'app-feature-filter',
  templateUrl: './feature-filter.component.html',
  styleUrls: ['./feature-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureFilterComponent implements OnInit {
  @Output() readonly formChange = new EventEmitter<SomeFeatureFilter>();
  @Input() data: Data[];

  private readonly form: FormGroup;

  categories: DataBase[];
  cities: DataBase[];
  sliderValue;
  minPrice: number;
  maxPrice: number;

  constructor(
    private readonly featureService: SomeFeatureService
  ) {

    this.form = new FormGroup({
      city: new FormControl(null),
      categories: new FormArray([]),
      price: new FormControl(null)
    });

    this.featureService.getCategories()
      .subscribe((cat: DataBase[]) => {
        this.categories = cat;
      });
    this.featureService.getCities()
      .subscribe((cities: DataBase[]) => {
        this.cities = cities;
      });

  }

  ngOnInit(): void {
    this.initializeCheckboxes();
    this.initializeRangeSlider();
  }

  checkCategoryNumbers(id: number) {
    return this.data.filter((d: Data) => d.category === id).length;
  }

  submit() {
    this.formChange.emit(this.form.value);
  }

  sliderChange({newValue}) {
    this.form.get('price').setValue(newValue, { emitEvent: false});
  }

  categoryChange(index: number) {
    const checkbox: FormControl = (this.form.get('categories') as FormArray).controls[index] as FormControl;

    checkbox.setValue({...checkbox.value, selected: !checkbox.value.selected});
  }

  private initializeCheckboxes() {
    const categoriesArr: FormArray = this.form.get('categories') as FormArray;

    this.categories.forEach((c: DataBase) => {
      categoriesArr.push(new FormControl({...c, selected: false}));
    });
  }

  private initializeRangeSlider() {
    const dataStorage: Data[] = this.data;
    this.minPrice = dataStorage.slice().sort((a, b) => a.price - b.price)[0].price;
    this.maxPrice = dataStorage.slice().sort((a, b) => b.price - a.price)[0].price;
    this.sliderValue = [this.minPrice, this.maxPrice];
  }
}
