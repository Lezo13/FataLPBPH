import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentWindowModalOptions } from 'src/app/_shared/models';

@Component({
  selector: 'app-content-window',
  standalone: false,
  templateUrl: './content-window.component.html',
  styleUrl: './content-window.component.scss'
})
export class ContentWindowComponent implements OnInit {
  @Input() data!: ContentWindowModalOptions;
  safeContent: SafeHtml;

  constructor(
    public modalInstance: NgbActiveModal,
    private sanitizer: DomSanitizer
  ) { }
  
  ngOnInit(): void {
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.data?.content || '');
  }
}
