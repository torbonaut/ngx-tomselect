import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  TomSelectChangeEvent,
  TomSelectItemAddedEvent,
  TomSelectItemRemovedEvent
} from 'projects/ngx-tomselect/src/lib/ngx-tomselect.types';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

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

  subscriptions: Subscription = new Subscription();

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
