import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AireacComponent } from './aireac.component';

describe('AireacComponent', () => {
  let component: AireacComponent;
  let fixture: ComponentFixture<AireacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AireacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AireacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
