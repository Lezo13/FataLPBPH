import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: 'button[appButtonSpinner]',
    standalone: false
})
export class ButtonSpinnerDirective implements OnChanges, AfterViewInit {
  @Input() appButtonSpinner = true;
  @Input() success = false;
  @Input() successIconClass = 'fas fa-check';
  @Input() successText = '';
  @Input() loadingText = '';
  @Input() spinnerIconClass = 'spinner-grow spinner-grow-sm';
  @Input() spinnerIconCustomClass = '';
  @Input() buttonText = '';
  originalInnerValue = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.originalInnerValue) {
      this.loadingText = this.loadingText?.trim() || '';
      const marginClass: string = this.loadingText ? 'me-2' : '';
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerHTML',
        (this.appButtonSpinner ?
          `<span class="${this.spinnerIconClass} ${this.spinnerIconCustomClass} ${marginClass}"></span> ${this.loadingText}` :
          (this.buttonText ? this.buttonText : this.originalInnerValue)));
      this.renderer.setProperty(this.el.nativeElement, 'disabled', (this.appButtonSpinner || this.success));

      if (this.success) {
        this.renderer.setProperty(
          this.el.nativeElement,
          'innerHTML',
          (this.successText ? this.successText : `<i class="${this.successIconClass}"></i>`));
      }
    }
  }

  ngAfterViewInit(): void {
    this.originalInnerValue = this.el.nativeElement.innerHMTL || this.el.nativeElement.innerText;
  }
}
