import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStrategiesComponent } from './manage-strategies.component';

describe('ManageStrategiesComponent', () => {
  let component: ManageStrategiesComponent;
  let fixture: ComponentFixture<ManageStrategiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStrategiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStrategiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
