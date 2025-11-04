import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpawnPointsComponent } from './spawn-points.component';

describe('SpawnPointsComponent', () => {
  let component: SpawnPointsComponent;
  let fixture: ComponentFixture<SpawnPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpawnPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpawnPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
