import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideojuegoFormPage } from './videojuego-form.page';

describe('VideojuegoFormPage', () => {
  let component: VideojuegoFormPage;
  let fixture: ComponentFixture<VideojuegoFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideojuegoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
