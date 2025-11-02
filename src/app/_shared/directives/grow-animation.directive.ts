/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Directive, OnChanges, Input, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[appGrowAnimation]',
    standalone: false
})
export class GrowAnimationDirective implements OnChanges {
  @Input() growAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.overflow') overflow = 'hidden';

  pulse = false;
  initialHeight = 0;

  constructor(private el: ElementRef) { }

  @HostBinding('@grow')
  get grow(): unknown {
    return { value: this.pulse, params: { startHeight: this.initialHeight } };
  }

  setStartHeight(): void {
    this.initialHeight = this.el.nativeElement.clientHeight;
  }

  ngOnChanges(): void {
    this.setStartHeight();
    this.pulse = !this.pulse;
  }
}
