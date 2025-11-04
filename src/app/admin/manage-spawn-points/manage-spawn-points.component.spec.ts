import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpawnPointsComponent } from './manage-spawn-points.component';

describe('ManageSpawnPointsComponent', () => {
  let component: ManageSpawnPointsComponent;
  let fixture: ComponentFixture<ManageSpawnPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSpawnPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSpawnPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
