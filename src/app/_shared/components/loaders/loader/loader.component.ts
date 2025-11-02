import { Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: false
})
export class LoaderComponent implements OnInit {
  @Input() height: number = 0;
  @Input() isVisible: boolean;
  @Input() message: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
