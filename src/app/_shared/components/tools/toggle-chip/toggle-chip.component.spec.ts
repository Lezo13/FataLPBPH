import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleChipComponent } from './toggle-chip.component';

describe('ToggleChipComponent', () => {
  let component: ToggleChipComponent;
  let fixture: ComponentFixture<ToggleChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
