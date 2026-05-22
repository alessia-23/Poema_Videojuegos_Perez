import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideojuegosPage } from './videojuegos.page';

describe('VideojuegosPage', () => {
  let component: VideojuegosPage;
  let fixture: ComponentFixture<VideojuegosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideojuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
