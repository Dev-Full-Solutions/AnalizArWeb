import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IluminacionComponent } from './iluminacion.component';

describe('IluminacionComponent', () => {
  let component: IluminacionComponent;
  let fixture: ComponentFixture<IluminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IluminacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IluminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
