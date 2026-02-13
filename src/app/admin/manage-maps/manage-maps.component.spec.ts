import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMapsComponent } from './manage-maps.component';

describe('ManageMapsComponent', () => {
  let component: ManageMapsComponent;
  let fixture: ComponentFixture<ManageMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
