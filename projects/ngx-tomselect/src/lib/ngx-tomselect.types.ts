import {TomItem, TomOption} from "tom-select/dist/types/types";
import TomSelect from "tom-select";

export type TomSelectOption = { class: string; value: string; label: string } & TomOption;
export type TomSelectOptGroup = { value: string; label: string } & TomOption;
export type TomSelectChangeEvent = { value: string };
export type TomSelectItemAddedEvent = { value: string; item: TomItem };
export type TomSelectItemRemovedEvent = { value: string; $item: TomItem };
export type TomSelectItemSelectedEvent = { item: TomItem };
export type TomSelectOptionAddedEvent = { value: string; data: TomOption };
export type TomSelectOptionRemovedEvent = { value: string };
export type TomSelectOptgroupAddedEvent = { id: any; data: TomOption };
export type TomSelectOptgroupRemovedEvent = { id: any };
export type TomSelectDropdownOpenedEvent = { dropdown: TomSelect['dropdown'] };
export type TomSelectDropdownClosedEvent = { dropdown: TomSelect['dropdown'] };
export type TomSelectTypeEvent = { str: string };
export type TomSelectOptionsLoadedEvent = {
  options: Array<TomOption>;
  optgroups: Array<TomOption>;
};

