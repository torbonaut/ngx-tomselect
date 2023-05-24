import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  Output, SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";

import TomSelect from 'tom-select';
import {RecursivePartial, TomInput, TomItem, TomOption, TomSettings} from "tom-select/dist/types/types";
import {
  TomSelectChangeEvent, TomSelectDropdownClosedEvent, TomSelectDropdownOpenedEvent,
  TomSelectItemAddedEvent,
  TomSelectItemRemovedEvent,
  TomSelectItemSelectedEvent, TomSelectOptGroup,
  TomSelectOptgroupAddedEvent, TomSelectOptgroupRemovedEvent, TomSelectOption,
  TomSelectOptionAddedEvent,
  TomSelectOptionRemovedEvent, TomSelectOptionsLoadedEvent, TomSelectTypeEvent,
} from "./ngx-tomselect.types";

@Component({
  selector: 'tom-select',
  templateUrl: './ngx-tomselect.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTomSelectComponent implements AfterViewInit, OnChanges, OnDestroy {
  private tomSelect: TomSelect | null = null;


  @ViewChild('tomSelect', { static: true})
  tomSelectRef!: ElementRef<TomInput>;

  @Input('settings')
  settings: RecursivePartial<TomSettings> = {};

  @Input('disabled')
  disabled: boolean = false;

  @Input('placeholder')
  placeholder: string = '';

  @Input('autocomplete')
  autocomplete: string = 'off';

  @Input('multiple')
  multiple: boolean = false;

  // Invoked when the value of the control changes.
  @Output() change: EventEmitter<TomSelectChangeEvent> = new EventEmitter<TomSelectChangeEvent>();

  // Invoked when the control gains focus.
  @Output() focus: EventEmitter<void> = new EventEmitter<void>();

  // Invoked when the control loses focus.
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();

  // Invoked when an item is added (i.e., when an option is selected)
  @Output() itemAdd: EventEmitter<TomSelectItemAddedEvent> = new EventEmitter<TomSelectItemAddedEvent>();

  // Invoked when an item is deselected.
  @Output() itemRemove: EventEmitter<TomSelectItemRemovedEvent> = new EventEmitter<TomSelectItemRemovedEvent>();

  // Invoked when an item is selected.
  @Output() itemSelect: EventEmitter<TomSelectItemSelectedEvent> = new EventEmitter<TomSelectItemSelectedEvent>();

  // Invoked when the control is manually cleared via the clear() method.
  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  // Invoked when a new option is added to the available options list.
  @Output() optionAdd: EventEmitter<TomSelectOptionAddedEvent> = new EventEmitter<TomSelectOptionAddedEvent>();

  // Invoked when an option is removed from the available options.
  @Output() optionRemove: EventEmitter<TomSelectOptionRemovedEvent> = new EventEmitter<TomSelectOptionRemovedEvent>();

  // Invoked when all options are removed from the control.
  @Output() optionClear: EventEmitter<void> = new EventEmitter<void>();

  // Invoked when a new option is added to the available options list.
  @Output() optgroupAdd: EventEmitter<TomSelectOptgroupAddedEvent> =
    new EventEmitter<TomSelectOptgroupAddedEvent>();

  // Invoked when an option group is removed.
  @Output() optgroupRemove: EventEmitter<TomSelectOptgroupRemovedEvent> = new EventEmitter<TomSelectOptgroupRemovedEvent>();

  // Invoked when all option groups are removed.
  @Output() optgroupClear: EventEmitter<void> = new EventEmitter<void>();

  // Invoked when the dropdown opens.
  @Output() dropdownOpen: EventEmitter<TomSelectDropdownOpenedEvent> = new EventEmitter<TomSelectDropdownOpenedEvent>();

  // Invoked when the dropdown closes.
  @Output() dropdownClose: EventEmitter<TomSelectDropdownClosedEvent> = new EventEmitter<TomSelectDropdownClosedEvent>();

  // Invoked when the user types while filtering options.
  @Output() type: EventEmitter<TomSelectTypeEvent> = new EventEmitter<TomSelectTypeEvent>();

  // Invoked when new options have been loaded and added to the control (via the load option or load API method).
  @Output() load: EventEmitter<TomSelectOptionsLoadedEvent> = new EventEmitter<TomSelectOptionsLoadedEvent>();

  // Invoked right before the control is destroyed.
  @Output() destroy: EventEmitter<void> = new EventEmitter<void>();


  constructor() {
  }

  private createTomSelect() {
    if (this.tomSelectRef) {
      this.tomSelect = new TomSelect(this.tomSelectRef.nativeElement, this.settings);

      // Invoked when the value of the control changes.
      this.tomSelect["on"]('change', (value: string) => this.change.emit({value}));
      // Invoked when the control gains focus.
      this.tomSelect["on"]('focus', () => this.focus.emit());
      // Invoked when the control loses focus.
      this.tomSelect["on"]('blur', () => this.blur.emit());
      // Invoked when an item is added (i.e., when an option is selected)
      this.tomSelect["on"]('item_add', (value: string, item: TomItem) => this.itemAdd.emit({value, item}));
      // Invoked when an item is deselected.
      this.tomSelect["on"]('item_remove', (value: string, $item: TomItem) => this.itemRemove.emit({value, $item}));
      // Invoked when an item is selected.
      this.tomSelect["on"]('item_select', (item: TomItem) => this.itemSelect.emit({item}));
      // Invoked when the control is manually cleared via the clear() method.
      this.tomSelect["on"]('clear', () => this.itemRemove.emit());
      // Invoked when a new option is added to the available options list.
      this.tomSelect["on"]('option_add', (value: string, data: TomOption) => this.optionAdd.emit({value, data}));
      // 	Invoked when an option is removed from the available options.
      this.tomSelect["on"]('option_remove', (value: string) => this.optionRemove.emit({value}));
      // Invoked when all options are removed from the control.
      this.tomSelect["on"]('option_clear', () => this.optionClear.emit());
      // Invoked when a new option is added to the available options list.
      this.tomSelect["on"]('optgroup_add', (id: string, data: TomOption) => this.optgroupAdd.emit({id, data}));
      // Invoked when an option group is removed.
      this.tomSelect["on"]('optgroup_remove', (id: string) => this.optgroupRemove.emit({id}));
      // Invoked when all option groups are removed.
      this.tomSelect["on"]('optgroup_clear', () => this.optgroupClear.emit());
      // Invoked when the dropdown opens.
      this.tomSelect["on"]('dropdown_open', (dropdown: TomSelect['dropdown']) => this.dropdownOpen.emit({dropdown}));
      // Invoked when the dropdown closes.
      this.tomSelect["on"]('dropdown_close', (dropdown: TomSelect['dropdown']) => this.dropdownClose.emit({dropdown}));
      // Invoked when the user types while filtering options.
      this.tomSelect["on"]('type', (str: string) => this.type.emit({str}));
      // Invoked when new options have been loaded and added to the control (via the load option or load API method).
      this.tomSelect["on"]('load', (data: TomSelectOptionsLoadedEvent) => this.load.emit(data));
      // 	Invoked right before the control is destroyed.
      this.tomSelect["on"]('destroy', () => this.itemRemove.emit());

    }

  }

  ngAfterViewInit(): void {
    this.createTomSelect();
  }

  ngOnChanges(changes: SimpleChanges) {
    /*
    if (this.tomSelect) {
      if (
        changes.values.currentValue &&
        changes.values.currentValue !== changes.values.previousValue
      ) {
        let currentValues = this.tomSelect.getValue();
        if (!(currentValues instanceof Array)) {
          currentValues = [currentValues];
        }
        this.tomSelect.clearOptions();
        this.tomSelect.addOptions(changes.values.currentValue, false);

        currentValues.filter((val) => val);
        this.tomSelect.setValue(currentValues, false);
      }
    }*/
  }

  ngOnDestroy() {
    if (this.tomSelect) {
      this.tomSelect.destroy();
    }
  }
}
