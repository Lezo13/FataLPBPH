import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, take, tap } from 'rxjs';
import { Map, Strategy, StrategyFormModalOptions } from 'src/app/_shared/models';
import { ERROR_RESPONSES } from 'src/app/_shared/records';
import { MapHttpService, StrategyHttpService } from 'src/app/_shared/services';
import { ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-strategy-form',
  standalone: false,
  templateUrl: './strategy-form.component.html',
  styleUrl: './strategy-form.component.scss'
})
export class StrategyFormComponent implements OnInit {
  @ViewChild('strategyForm') form!: NgForm;
  @Input() data!: StrategyFormModalOptions;
  strategyId: string = null;
  strategy: Strategy;
  maps: Map[] = [];

  isEditing: boolean = false;
  isLoading: boolean = true;
  isSubmitted: boolean = false;
  isSaving: boolean = false;

  constructor(
    public modalInstance: NgbActiveModal,
    private mapHttpService: MapHttpService,
    private strategyHttpService: StrategyHttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.strategyId = this.data.strategyId;
    this.isEditing = ObjectUtils.hasData(this.strategyId);
    this.initializeData();
    this.loadData();
  }

  async save(): Promise<void> {
    this.isSubmitted = true;

    if (!this.form.form?.valid)
      return;

    if (this.isEditing)
      this.updateStrategy();
    else
      this.insertStrategy();
  }

  private initializeData(): void {
    this.strategy = {
      title: null,
      description: null,
      thumbnailUrl: '',
      vodUrl: ''
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

  private insertStrategy(): void {
    this.isSaving = true;

    this.strategyHttpService.insertStrategy(this.strategy)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully added ${this.strategy?.title}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }

  private updateStrategy(): void {
    this.isSaving = true;

    this.strategyHttpService.updateStrategy(this.strategy)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.modalInstance.close();
          this.toastr.success(`Successfully updated ${this.strategy?.title}`);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(ERROR_RESPONSES[error.status]);
        }
      }).add(() => {
        this.isSaving = false;
      });
  }

  private createSpawnPointSubscription(): Observable<Strategy> {
    if (!this.isEditing || ObjectUtils.isEmpty(this.strategyId))
      return null;

    return this.strategyHttpService.getStrategy(this.strategyId)
      .pipe(
        take(1),
        tap(data => {
          this.strategy = data;
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
