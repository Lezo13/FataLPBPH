import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMatchesComponent } from './manage-matches.component';

describe('ManageMatchesComponent', () => {
  let component: ManageMatchesComponent;
  let fixture: ComponentFixture<ManageMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
