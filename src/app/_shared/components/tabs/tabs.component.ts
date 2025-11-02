import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabItem } from '../../models';

@Component({
  selector: 'app-tabs',
  standalone: false,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent implements OnInit {
  @Input() tabs: TabItem[] = []
  @Output() tabSelected: EventEmitter<number> = new EventEmitter<number>();
  selectedTab: number;

  ngOnInit(): void {
    this.selectedTab = this.tabs[0].value;
  }

  isTabActive(tab: TabItem): boolean {
    return tab.value === this.selectedTab;
  }

  selectTab(tab: TabItem): void {
    this.selectedTab = tab.value;
    this.tabSelected.emit(this.selectedTab);
  }
}
