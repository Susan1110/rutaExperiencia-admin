import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroresPageComponent } from './errores-page.component';

describe('ErroresPageComponent', () => {
  let component: ErroresPageComponent;
  let fixture: ComponentFixture<ErroresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroresPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErroresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
