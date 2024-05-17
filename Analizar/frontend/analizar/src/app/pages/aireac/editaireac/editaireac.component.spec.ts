import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaireacComponent } from './editaireac.component';

describe('EditaireacComponent', () => {
  let component: EditaireacComponent;
  let fixture: ComponentFixture<EditaireacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaireacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaireacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
