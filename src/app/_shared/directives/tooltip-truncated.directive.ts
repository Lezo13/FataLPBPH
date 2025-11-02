import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[tooltipIfTruncated]',
  standalone: false
})
export class TooltipIfTruncatedDirective implements AfterViewInit {
  @Input('tooltipIfTruncated') tooltipText: string = '';
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const element = this.el.nativeElement;

    // Trigger after rendering
    requestAnimationFrame(() => {
      const isOverflowed = element.scrollWidth > element.clientWidth;

      if (isOverflowed) 
        element.setAttribute('title', this.tooltipText);
    });
  }
}
