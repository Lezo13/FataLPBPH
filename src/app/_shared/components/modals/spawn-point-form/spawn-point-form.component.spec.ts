import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpawnPointFormComponent } from './spawn-point-form.component';

describe('SpawnPointFormComponent', () => {
  let component: SpawnPointFormComponent;
  let fixture: ComponentFixture<SpawnPointFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpawnPointFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpawnPointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
