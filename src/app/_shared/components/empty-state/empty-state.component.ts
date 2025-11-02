import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    templateUrl: './empty-state.component.html',
    styleUrls: ['./empty-state.component.scss'],
    standalone: false
})
export class EmptyStateComponent implements OnInit {
  @Input() height: string = '100%';
  @Input() icon?: string = 'fa fa-circle-exclamation';
  @Input() message!: string;
  @Input() subMessage: string;
  @Input() subMessageClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
