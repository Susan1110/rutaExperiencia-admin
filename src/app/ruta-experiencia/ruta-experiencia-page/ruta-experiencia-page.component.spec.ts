import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaExperienciaPageComponent } from './ruta-experiencia-page.component';

describe('RutaExperienciaPageComponent', () => {
  let component: RutaExperienciaPageComponent;
  let fixture: ComponentFixture<RutaExperienciaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaExperienciaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaExperienciaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
