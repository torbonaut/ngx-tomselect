import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  TomSelectChangeEvent,
  TomSelectItemAddedEvent,
  TomSelectItemRemovedEvent
} from 'projects/ngx-tomselect/src/lib/ngx-tomselect.types';
import {NgForm} from "@angular/forms";
import {BehaviorSubject, Subscription} from "rxjs";
import {RecursivePartial, TomSettings} from "tom-select/dist/types/types";

class Settings {
  disabled = false;
  create = false;
  createMinLength = 3;
  dropdownInput = true;
  noBackspaceDelete = true;
  allowEmptyOption = true;
  persist = true;
  createOnBlur = false;
  createDelimiter = ',';
  highlight = true;
  maxItems = 1;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'ngx-tomselect-demo';

  protected ngxTomSelectSettings = new Settings();

  @ViewChild('form') form!: NgForm;

  private subscriptions: Subscription = new Subscription();

  protected settingsOne: RecursivePartial<TomSettings> = { create: false, controlInput: undefined, allowEmptyOption: false }
  protected selectOneValue: string ='2';

  protected settingsTwo: RecursivePartial<TomSettings> = { create: false, controlInput: undefined, allowEmptyOption: true }
  protected selectTwoValue: string ='';

  protected settingsThree: RecursivePartial<TomSettings> = { create: false, allowEmptyOption: true }
  protected selectThreeValue: string ='';


  protected settingsFive: RecursivePartial<TomSettings> = { create: false, maxItems: 3 }
  protected selectFiveValue: string ='';

  protected settingsSix: RecursivePartial<TomSettings> = { create: false, plugins: ['remove_button'] }
  protected selectSixValue: string ='';

  protected settingsSeven: RecursivePartial<TomSettings> = { create: false, controlInput: undefined, allowEmptyOption: true }
  protected selectSevenValue: string ='';
  protected sevenOptions$ = new BehaviorSubject<number[]>([1, 2, 3, 4, 5]);

  ngAfterViewInit(): void {
    if (this.form && this.form.valueChanges) {
      this.subscriptions.add(this.form.valueChanges.subscribe((value) => {
        console.log('form valueChanges', value);
      }));
    }
  }

  constructor() {
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  change(event: TomSelectChangeEvent) {
    console.log('change', event.value);
  }

  focus() {
    console.log('focus');
  }

  blur() {
    console.log('blur');
  }

  itemAdded(event: TomSelectItemAddedEvent) {
    console.log('item selected', event);
  }

  itemRemoved(event: TomSelectItemRemovedEvent) {
    console.log('item deselected', event);
  }
}
