import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, take, tap } from 'rxjs';
import { Map, SpawnPoint, FileExtended, SpawnPointFormModalOptions } from 'src/app/_shared/models';
import { ERROR_RESPONSES } from 'src/app/_shared/records';
import { MapHttpService, SpawnPointHttpService } from 'src/app/_shared/services';
import { MiscUtils, ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-spawn-point-form',
  standalone: false,
  templateUrl: './spawn-point-form.component.html',
  styleUrl: './spawn-point-form.component.scss'
})
export class SpawnPointFormComponent implements OnInit {
  @ViewChild('spawnForm') form!: NgForm;
  @Input() data!: SpawnPointFormModalOptions;
  spawnPointId: string = null;
  spawnPoint: SpawnPoint;
  maps: Map[] = [];
  mapImageFile: FileExtended = null;
  redImageFiles: FileExtended[] = [];
  blueImageFiles: FileExtended[] = [];

  isEditing: boolean = false;
  isLoading: boolean = true;
  isSubmitted: boolean = false;
  isSaving: boolean = false;

  constructor(
    public modalInstance: NgbActiveModal,
    private mapHttpService: MapHttpService,
    private spawnPointHttpService: SpawnPointHttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.spawnPointId = this.data.spawnPointId;
    this.isEditing = ObjectUtils.hasData(this.spawnPointId);
    this.initializeData();
    this.loadData();
  }

  async save(): Promise<void> {
    this.isSubmitted = true;

    if (!this.form.form?.valid)
      return;

    if (ObjectUtils.hasData(this.mapImageFile)) {
      const imageBase64: string = await MiscUtils.fileToBase64(this.mapImageFile) as string;
      this.spawnPoint.mapImageUrl = imageBase64;
    }

    if (ObjectUtils.hasData(this.redImageFiles)) {
      await Promise.all(
        this.redImageFiles.map(async (file: FileExtended, index: number) => {
          if (ObjectUtils.hasData(file)) {
            const imageBase64 = await MiscUtils.fileToBase64(file) as string;
            this.spawnPoint.redImageUrls.splice(index, 1, imageBase64);
          }
        })
      );
    }

    if (ObjectUtils.hasData(this.blueImageFiles)) {
      await Promise.all(
        this.blueImageFiles.map(async (file: FileExtended, index: number) => {
          if (ObjectUtils.hasData(file)) {
            const imageBase64 = await MiscUtils.fileToBase64(file) as string;
            this.spawnPoint.blueImageUrls.splice(index, 1, imageBase64);
          }
        })
      );
    }

    if (this.isEditing)
      this.updateSpawnPoint();
    else
      this.insertSpawnPoint();
  }

  clearMapImageFile(): void {
    this.spawnPoint.mapImageUrl = null;
  }

  addRedImage(): void {
    this.spawnPoint.redImageUrls.push('');
    this.redImageFiles.push(null);
  }

  addBlueImage(): void {
    this.spawnPoint.blueImageUrls.push('');
    this.redImageFiles.push(null);
  }

  deleteRedImage(index: number): void {
    this.spawnPoint.redImageUrls.splice(index, 1);
    this.redImageFiles.splice(index, 1);
  }

  deleteBlueImage(index: number): void {
    this.spawnPoint.blueImageUrls.splice(index, 1);
    this.blueImageFiles.splice(index, 1);
  }

  private initializeData(): void {
    this.spawnPoint = {
      spawnPointId: null,
      mapId: null,
      mapName: '',
      mapImageUrl: '',
      redImageUrls: [],
      blueImageUrls: []
    };
  }

  private loadData(): void {
    this.isLoading = false;

    const subscriptions = [this.createSpawnPointSubscription(), this.createMapsSubscription()];
    const activeSubscriptions = subscriptions.filter(s => s != null);

    if (ObjectUtils.hasData(activeSubscriptions)) {
      this.isLoading = true;

      forkJoin(activeSubscriptions).pipe(take(1))
        .subscribe({
          next: (response) => {
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error(ERROR_RESPONSES[error.status]);
          }
        }).add(() => {
          this.isLoading = false;
        });
    }
  }

  private insertSpawnPoint(): void {
    this.isSaving = true;

    this.spawnPointHttpService.insertSpawnPoint(this.spawnPoint)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully added ${this.spawnPoint?.mapName}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }

  private updateSpawnPoint(): void {
    this.isSaving = true;

    this.spawnPointHttpService.updateSpawnPoint(this.spawnPoint)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully updated ${this.spawnPoint?.mapName}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }

  private createSpawnPointSubscription(): Observable<SpawnPoint> {
    if (!this.isEditing || ObjectUtils.isEmpty(this.spawnPointId))
      return null;

    return this.spawnPointHttpService.getSpawnPoint(this.spawnPointId)
      .pipe(
        take(1),
        tap(data => {
          this.spawnPoint = data;
        })
      );
  }

  private createMapsSubscription(): Observable<Map[]> {
    return this.mapHttpService.getAllMaps()
      .pipe(
        take(1),
        tap(data => {
          this.maps = data;
        })
      );
  }
}
