import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { FileExtended, Map, MapFormModalOptions } from 'src/app/_shared/models';
import { ERROR_RESPONSES } from 'src/app/_shared/records';
import { MapHttpService } from 'src/app/_shared/services';
import { MiscUtils, ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-map-form',
  standalone: false,
  templateUrl: './map-form.component.html',
  styleUrl: './map-form.component.scss'
})
export class MapFormComponent implements OnInit {
  @ViewChild('mapForm') form!: NgForm;
  @Input() data!: MapFormModalOptions;
  mapId: string = null;
  map: Map;
  imageFile: FileExtended = null;

  isEditing: boolean = false;
  isLoading: boolean = true;
  isSubmitted: boolean = false;
  isSaving: boolean = false;

  constructor(
    public modalInstance: NgbActiveModal,
    private mapHttpService: MapHttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.mapId = this.data.mapId;
    this.isEditing = ObjectUtils.hasData(this.mapId);
    this.initializeData();

    if (this.isEditing)
      this.loadData();
    else
      this.isLoading = false;
  }

  clearImageFile(): void {
    this.map.mapImageUrl = null;
  }

  async save(): Promise<void> {
    this.isSubmitted = true;

    if (!this.form.form?.valid)
      return;

    if (ObjectUtils.hasData(this.imageFile)) {
      const imageBase64: string = await MiscUtils.fileToBase64(this.imageFile) as string;
      this.map.mapImageUrl = imageBase64;
    }

    if (this.isEditing)
      this.updateMap();
    else
      this.insertMap();
  }

  private initializeData(): void {
    this.map = {
      mapId: null,
      mapName: '',
      mapImageUrl: ''
    };
  }

  private loadData(): void {
    this.isLoading = true;

    this.mapHttpService.getMap(this.mapId)
      .pipe(take(1))
      .subscribe({
        next: (map) => {
          this.map = map;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isLoading = false;
      });
  }

  private insertMap(): void {
    this.isSaving = true;

    this.mapHttpService.insertMap(this.map)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully added ${this.map?.mapName}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }

  private updateMap(): void {
    this.isSaving = true;

    this.mapHttpService.updateMap(this.map)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully updated ${this.map?.mapName}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }
}
