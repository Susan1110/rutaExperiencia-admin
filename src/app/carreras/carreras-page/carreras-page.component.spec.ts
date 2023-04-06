import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasPageComponent } from './carreras-page.component';

describe('CarrerasPageComponent', () => {
  let component: CarrerasPageComponent;
  let fixture: ComponentFixture<CarrerasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrerasPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrerasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
