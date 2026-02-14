import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ConfirmationOptions, Strategy, StrategyFormModalOptions } from 'src/app/_shared/models';
import { ComponentModalService, StrategyHttpService } from 'src/app/_shared/services';

@Component({
  selector: 'app-manage-strategies',
  standalone: false,
  templateUrl: './manage-strategies.component.html',
  styleUrl: './manage-strategies.component.scss'
})
export class ManageStrategiesComponent implements OnInit {
  strategies: Strategy[] = [];

  isLoading: boolean = true;

  private modalService = inject(ComponentModalService);
  private strategyHttpService = inject(StrategyHttpService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadStrategies();
  }

  addStrategy(): void {
    const options: StrategyFormModalOptions = {
      title: 'Add Strategy',
      strategyId: null
    };

    this.modalService.showStrategyFormModal(options).then(result => {
      this.loadStrategies();
    }).catch(() => { });
  }

  editStrategy(strategy: Strategy): void {
    const options: StrategyFormModalOptions = {
      title: 'Edit Strategy',
      strategyId: strategy.strategyId
    };

    this.modalService.showStrategyFormModal(options).then(result => {
      this.loadStrategies();
    }).catch(() => { });
  }

  promptDeleteStrategy(strategy: Strategy): void {
    const options: ConfirmationOptions = {
      title: 'Delete Strategy',
      message: `Are you sure you want to delete ${strategy.title}?`,
      warningMessage: 'This action cannot be undone.',
      confirmText: 'Yes',
      declineText: 'No'
    };

    this.modalService.showConfirmationModal(options, false).then(result => {
      if (result) {
        this.deleteStrategy(strategy);
      }
    }).catch(() => { });
  }

  private loadStrategies(): void {
    this.isLoading = true;

    this.strategyHttpService.getAllStrategies()
      .pipe((take(1)))
      .subscribe((strategies: Strategy[]) => {
        this.strategies = strategies;
      }).add(() => {
        this.isLoading = false;
      });
  }

  private deleteStrategy(strategy: Strategy): void {
    strategy.isLoading = true;

    this.strategyHttpService.deleteStrategy(strategy.strategyId)
      .pipe((take(1)))
      .subscribe(() => {
        this.strategies = this.strategies.filter(m => m.strategyId !== strategy.strategyId);
        this.toastr.success(`Successfully deleted ${strategy.title}`);
      }).add(() => {
        strategy.isLoading = false;
      });
  }
}
