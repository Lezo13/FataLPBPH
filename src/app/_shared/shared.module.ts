/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbAlertModule, NgbDropdownModule,
  NgbModalModule, NgbPaginationModule,
  NgbProgressbarModule, NgbPopoverModule,
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'primeng/chart';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { TextareaModule } from 'primeng/textarea';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { EditorModule } from 'primeng/editor';
import { TabsModule } from 'primeng/tabs';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MeterGroupModule } from 'primeng/metergroup';
import { ChipModule } from 'primeng/chip';
import { StepperModule } from 'primeng/stepper';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgxGaugeModule } from 'ngx-gauge';
import {
  LoaderComponent,
  ConfirmationModalComponent,
  TabsComponent,
  NavTabsComponent,
  UserMenuComponent,
  PlayerFormComponent,
  ImageSelectorComponent,
  FileSelectorComponent,
  FileUploadComponent,
  ToggleChipComponent,
  MatchFormComponent,
  SpawnPointFormComponent,
  InvitationFormComponent,
} from './components';
import { FilterPipe, HoursDurationPipe, HumanizeDatePipe, PaginatePipe, TruncatePipe } from './pipes';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { IconsModule } from './icons/icons.module';
import { FullCalendarModule } from '@fullcalendar/angular';

export const modalComponents: any[] = [
  ConfirmationModalComponent,
  InvitationFormComponent,
  MatchFormComponent,
  PlayerFormComponent,
  SpawnPointFormComponent
];

export const components: any[] = [
  EmptyStateComponent,
  FileSelectorComponent,
  FileUploadComponent,
  ImageSelectorComponent,
  LoaderComponent,
  NavTabsComponent,
  TabsComponent,
  ToggleChipComponent,
  UserMenuComponent,
  modalComponents
];

export const pipes: any[] = [
  FilterPipe,
  HumanizeDatePipe,
  HoursDurationPipe,
  TruncatePipe,
  PaginatePipe
];

export const importModules: any[] = [
  CommonModule,
  FormsModule,
  RouterModule
];

export const exportModules: any[] = [
  CommonModule,
  FormsModule,
  RouterModule
];

export const thirdPartyModules: any[] = [
  IconsModule,
  NgbModule,
  NgbAlertModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbProgressbarModule,
  NgbPaginationModule,
  NgbPopoverModule,
  ChartModule,
  TableModule,
  TagModule,
  InputTextModule,
  DatePickerModule,
  ButtonModule,
  IftaLabelModule,
  FloatLabelModule,
  MultiSelectModule,
  CheckboxModule,
  Select,
  TreeSelectModule,
  SplitButtonModule,
  PaginatorModule,
  IconFieldModule,
  InputIconModule,
  InputNumberModule,
  TextareaModule,
  RadioButtonModule,
  ToggleSwitchModule,
  ProgressBarModule,
  TooltipModule,
  BreadcrumbModule,
  BadgeModule,
  OverlayBadgeModule,
  MessageModule,
  AvatarModule,
  AvatarGroupModule,
  ChipModule,
  StepperModule,
  MeterGroupModule,
  AutoCompleteModule,
  FileUploadModule,
  FieldsetModule,
  NgxGaugeModule,
  EditorModule,
  FullCalendarModule,
  TabsModule
];

@NgModule({
  declarations: [
    ...components,
    ...pipes
  ],
  imports: [
    ...importModules,
    ...thirdPartyModules
  ],
  providers: [],
  bootstrap: [],
  exports: [
    ...exportModules,
    ...components,
    ...thirdPartyModules,
    ...pipes
  ]
})
export class SharedModule { }
