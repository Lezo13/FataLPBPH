/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[appCustomHtmlMessage]',
    standalone: false
})
export class CustomHtmlMessageDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}
