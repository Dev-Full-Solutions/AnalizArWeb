import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIluminacionComponent } from './edit-iluminacion.component';

describe('EditIluminacionComponent', () => {
  let component: EditIluminacionComponent;
  let fixture: ComponentFixture<EditIluminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIluminacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIluminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
