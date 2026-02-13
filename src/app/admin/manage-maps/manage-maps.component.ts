import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ConfirmationOptions, Map, MapFormModalOptions } from 'src/app/_shared/models';
import { ComponentModalService, MapHttpService } from 'src/app/_shared/services';

@Component({
  selector: 'app-manage-maps',
  standalone: false,
  templateUrl: './manage-maps.component.html',
  styleUrl: './manage-maps.component.scss'
})
export class ManageMapsComponent implements OnInit {
  maps: Map[] = [];

  isLoading: boolean = true;

  private modalService = inject(ComponentModalService);
  private mapPointHttpService = inject(MapHttpService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMaps();
  }

  addMap(): void {
    const options: MapFormModalOptions = {
      title: 'Add Map',
      mapId: null
    };

    this.modalService.showMapFormModal(options).then(result => {
      this.loadMaps();
    }).catch(() => { });
  }

  editMap(map: Map): void {
    const options: MapFormModalOptions = {
      title: 'Edit Map',
      mapId: map.mapId
    };

    this.modalService.showMapFormModal(options).then(result => {
      this.loadMaps();
    }).catch(() => { });
  }

  promptDeleteMap(map: Map): void {
    const options: ConfirmationOptions = {
      title: 'Delete Map',
      message: `Are you sure you want to delete ${map.mapName}?`,
      warningMessage: 'This action cannot be undone.',
      confirmText: 'Yes',
      declineText: 'No'
    };

    this.modalService.showConfirmationModal(options, false).then(result => {
      if (result) {
        this.deleteMap(map);
      }
    }).catch(() => { });
  }

  private loadMaps(): void {
    this.isLoading = true;

    this.mapPointHttpService.getAllMaps()
      .pipe((take(1)))
      .subscribe((maps: Map[]) => {
        this.maps = maps;
      }).add(() => {
        this.isLoading = false;
      });
  }

  private deleteMap(map: Map): void {
    map.isLoading = true;

    this.mapPointHttpService.deleteMap(map.mapId)
      .pipe((take(1)))
      .subscribe(() => {
        this.maps = this.maps.filter(m => m.mapId !== map.mapId);
        this.toastr.success(`Successfully deleted ${map.mapName}`);
      }).add(() => {
        map.isLoading = false;
      });
  }
}
