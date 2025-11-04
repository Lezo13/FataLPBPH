import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavItem } from '../../models';
import { ObjectUtils } from '../../utils';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrl: './nav-tabs.component.scss',
  standalone: false
})
export class NavTabsComponent implements OnInit {
  @Input() isAuthenticated: boolean = false;
  @Input() tabs: NavItem[] = []
  @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();
  filteredTabs: NavItem[] = []

  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filteredTabs = this.tabs.filter(tab => ObjectUtils.isEmpty(tab.allowedRoles) || (this.isAuthenticated && this.authservice.isInRoles(tab.allowedRoles)));
  }

  isTabActive(tab: NavItem): boolean {
    if (ObjectUtils.isEmpty(tab.url))
      return false;

    return this.router.url.includes(tab.url);
  }
}
